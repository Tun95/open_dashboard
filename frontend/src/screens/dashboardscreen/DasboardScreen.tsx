import { Helmet } from "react-helmet-async";
import NavBar from "../../common/navbar/NavBar";
import SideBar from "../../common/sidebar/SideBar";
import "./styles.scss";
import FilterBox from "../../components/dashboard/FilterBox";
import TableComponent from "../../components/dashboard/Table";

function DasboardScreen() {
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="dashboard_screen f_flex">
        <div className="right_container">
          <SideBar />
        </div>
        <div className="left_container">
          <NavBar />
          <div className="container">
            <div className="dashboard_content">
              <FilterBox />
              <TableComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DasboardScreen;
