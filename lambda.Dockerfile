# Synduce image
FROM ocaml/opam:debian-11-ocaml-4.12
ENV DEBIAN_FRONTEND=noninteractive

# Install system packages
USER root
ENV HOME=/root
RUN apt-get update && apt-get install -y git z3 wget python3 python3-pip g++ make cmake unzip libcurl4-openssl-dev

# Install awslambdaric
ARG FUNCTION_DIR="/function"
RUN mkdir -p ${FUNCTION_DIR}
RUN pip install --target ${FUNCTION_DIR} awslambdaric

# Install cvc4
RUN wget -q https://github.com/CVC4/CVC4/releases/download/1.8/cvc4-1.8-x86_64-linux-opt && \
    sudo chmod a+x cvc4-1.8-x86_64-linux-opt && \
    mv cvc4-1.8-x86_64-linux-opt /bin/cvc4
    
# Install opam components; need to be opam user.
USER opam
ENV HOME=/home/opam
RUN opam install core -y
COPY --chown=opam:opam ./Synduce /home/opam/synduce
RUN ls /home/opam/synduce
RUN cd /home/opam/synduce && \
    opam install . --deps-only -y && \
    eval $(opam env) && \
    dune build bin/Synduce.exe && \
    ./_build/default/bin/Synduce.exe benchmarks/list/sum.ml -i

# Final entrypoint
USER root
WORKDIR ${FUNCTION_DIR}
ENTRYPOINT [ "/usr/bin/python3", "-m", "awslambdaric" ]
CMD [ "app.handler" ]

# Put copies at the end cause otherwise rebuilding takes a long time
COPY ./lambda/* ${FUNCTION_DIR}