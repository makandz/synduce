import TopLeftBlob from "../../svgs/topleftblob.svg";
import BottomRightBlob from "../../svgs/bottomrightblob.svg";

const HomePageBody = () => {
  return (
    <div className="homepage-body">
      <div className="top-left-blob-container">
        <img src={TopLeftBlob} alt="" className="top-left-blob" />
      </div>
      <div className="bottom-right-blob-cotainer">
        <img src={BottomRightBlob} alt="" className="bottom-right-blob" />
      </div>
      <div className="synduce-typography">
        <h1 className="synduce-branding">Synduce</h1>
        <p className="synduce-description">
          An open source automatic recursive function transformer
        </p>
      </div>
      <div className="synduce-tryout">
        <button className="synduce-button synduce-tryout-btn">
          <p>Try it Online</p>
        </button>
        <p>
          or view the source
          <span>
            <a
              href="https://github.com/victornicolet/Synduce"
              style={{
                textDecoration: "none",
                color: "#00BFFF",
                paddingLeft: "0.25em",
              }}
            >
              on Github
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default HomePageBody;
