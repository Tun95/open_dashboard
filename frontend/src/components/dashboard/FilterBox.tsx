import {
  AkarIconsShareBox,
  BxSortUp,
  IcOutlineMoreHoriz,
  LucideLabTextSquare,
  MajesticonsSearchCircleLine,
  MaterialSymbolsLightAddCircleOutlineRounded,
  MaterialSymbolsMailOutlineRounded,
  StashFilterLight,
  UilEyeSlash,
} from "../../assets/icons/Icons";
import "./styles.scss";

function FilterBox() {
  return (
    <div className="filter_box">
      <div className="content c_flex">
        <div className="left">
          <div className="filter_list_items a_flex">
            <div className="list_item a_flex">
              <div className="_icon l_flex">
                <LucideLabTextSquare className="icon" />
              </div>
              <div className="select_filter">
                <select name="data" id="data">
                  <option value="all">All Companies</option>
                  <option value="random2">Random Option 2</option>
                  <option value="random3">Random Option 3</option>
                  <option value="random4">Random Option 4</option>
                </select>
              </div>
            </div>{" "}
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <MaterialSymbolsLightAddCircleOutlineRounded className="icon" />
              </div>
              <div className="txet">
                <p>New View</p>
              </div>
            </button>{" "}
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <AkarIconsShareBox className="icon" />
              </div>
              <div className="txet">
                <p>Share View</p>
              </div>
            </button>
          </div>
        </div>
        <div className="right">
          <div className="filter_list_items a_flex">
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <MaterialSymbolsLightAddCircleOutlineRounded className="icon" />
              </div>
              <div className="txet">
                <p>Add</p>
              </div>
            </button>{" "}
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <MaterialSymbolsMailOutlineRounded className="icon" />
              </div>
              <div className="txet">
                <p>Email all</p>
              </div>
            </button>{" "}
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <StashFilterLight className="icon" />
              </div>
              <div className="txet">
                <p>Filter</p>
              </div>
            </button>{" "}
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <BxSortUp className="icon" />
              </div>
              <div className="txet">
                <p>Sort</p>
              </div>
            </button>{" "}
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <MajesticonsSearchCircleLine className="icon" />
              </div>
              <div className="txet">
                <p>Search</p>
              </div>
            </button>
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <UilEyeSlash className="icon" />
              </div>
              <div className="txet">
                <p>Hide Fields</p>
              </div>
            </button>
            <button className="main_btn list_item a_flex">
              <div className="_icon l_flex">
                <IcOutlineMoreHoriz className="icon" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterBox;
