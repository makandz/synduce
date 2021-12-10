## Email Title ##

 U of T CSC301 Partner Project - Software Engineering Labs at U of T and 6 Devs 1 App (Team 16) - handoff details

## Email Text ##

 Dear Danya and Victor, 

First off, we would like to thank you for giving us the opportunity to work with you, and for trusting us to build an application that you found to be a useful addition to your set of research tools. We really appreciate all the time and help you have given us throughout the term.
 
 --- What we did ---

We were able to complete most of the features and user stories you asked of us. The primary objective was to allow users to run Synduce over the internet without the need to download, build, and run Synduce in a command line interface, and this has been accomplished. We provide a clean and intuitive web interface which a user can employ to write scripts and run Synduce on them. Once the job is finished, the results will be automatically displayed to let the user know what Synduce did.

We also added a few extra features that we think would be useful to a research team. A user has the ability to create an account: this allows them to save their past jobs and results in the cloud. In addition to the requested command-line parameters, we have created an extensible interface to add new ones if you so desire.

 --- What is yet to be done ---

The logs from Synduce are not displayed in a particularly fancy manner: we only display the result, solver used, and time taken. Adding more features to this display is definitely possible, however. Additionally, we have not extensively stress-tested the various peices of the application due to time constraints. Our preliminary testing is positive, but there may be some rough edges in need of smoothening.

 --- Handoff instructions ---

All the information you will need to deploy the application and continue development are available in [README.md](https://github.com/csc301-fall-2021/team-project-16-software-engineering-lab-uoft/blob/main/deliverable-4/README.md) in the project repository under the "deliverable-4" directory.

The current version of the app is already hosted on the `synduce-prod` account. A separate `synduce-dev` account has also been set up in case you wish to continue development. The credentials for these are already with you. Ownership of our Heroku app and Firebase has also been transferred. We will shortly decommission our app so that you can take over the Synduce domain name.

You can fork/clone this repository (https://github.com/csc301-fall-2021/team-project-16-software-engineering-lab-uoft) and transfer it to any VCS of your choosing that is compatible with Heroku. 

If you are using GitHub and wish to set up CI/CD for continued development, please set up the Secrets as outlined in the README.

Finally, our past progress reports, documentation, etc. for past deliverables can be found in the deliverables folders. There are just for reference/archival purposes and are not necessary for deploying or developing the app.

If you have any further questions, comments, or concerns, please do not hesitate to email any of the team members or send us a message on Discord. 

We thank you again for this opportunity, and we hope you enjoy using our application!

Sincerely,

6 Devs 1 App
