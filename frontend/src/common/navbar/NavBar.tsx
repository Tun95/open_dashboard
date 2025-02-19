import "./styles.scss";
import logo from "../../assets/others/logo1.jpeg";
import { IcOutlineMoreHoriz } from "../../assets/icons/Icons";

function NavBar() {
  return (
    <div className="nav_bar">
      <div className="content c_flex">
        <div className="left">
          <div className="img_text a_flex">
            <div className="img">
              <img src={logo} alt="logo_img" />
            </div>
            <div className="text">
              <h4>Companies</h4>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="share_more a_flex">
            <button className="main_btn">
              <p>Share</p>
            </button>
            <div className="_icon">
              <IcOutlineMoreHoriz className="icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
