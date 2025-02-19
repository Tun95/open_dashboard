import { Link } from "react-router-dom";
import {
  FlowbiteShapesOutline,
  IcOutlineSettings,
  MaterialSymbolsMailOutlineRounded,
  RiMenu2Fill,
  SolarBellLinear,
  SolarMedalRibbonStarLinear,
} from "../../assets/icons/Icons";
import "./styles.scss";

function SideBar() {
  return (
    <div className="side_bar">
      <div className="side_bar_content">
        <div className="top c_flex">
          <div className="icon_text a_flex">
            <div className="_icon_left l_flex">
              <div className="circle"></div>
            </div>
            <div className="text">
              <p>Opendasboard - Real Experience</p>
            </div>
          </div>
          <div className="icon_right l_flex">
            <RiMenu2Fill className="icon" />
          </div>
        </div>
        <div className="middle">
          <Link to="/" className="menu_item a_flex">
            <div className="menu_icon l_flex">
              <SolarMedalRibbonStarLinear className="icon" />
            </div>
            <div className="menu_text">
              <p>Welcome</p>
            </div>
          </Link>
          <Link to="/" className="menu_item a_flex">
            <div className="menu_icon l_flex">
              <SolarBellLinear className="icon" />
            </div>
            <div className="menu_text a_flex">
              <p>Notifications</p>
              <div className="count l_flex">2</div>
            </div>
          </Link>
          <Link to="/" className="menu_item a_flex">
            <div className="menu_icon l_flex">
              <MaterialSymbolsMailOutlineRounded className="icon" />
            </div>
            <div className="menu_text">
              <p>Emails</p>
            </div>
          </Link>
          <Link to="/" className="menu_item a_flex">
            <div className="menu_icon l_flex">
              <FlowbiteShapesOutline className="icon" />
            </div>
            <div className="menu_text">
              <p>Templates</p>
            </div>
          </Link>
          <Link to="/" className="menu_item a_flex">
            <div className="menu_icon l_flex">
              <IcOutlineSettings className="icon" />
            </div>
            <div className="menu_text">
              <p>Settings</p>
            </div>
          </Link>
        </div>
        <div className="bottom">
          <div className="list_items">
            <Link to="/" className="list_item">
              <p>Shared Databases</p>
            </Link>
            <Link to="/" className="list_item">
              <p>Restricted Databases</p>
            </Link>
            <Link to="/" className="list_item">
              <p>Shared Pages</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
