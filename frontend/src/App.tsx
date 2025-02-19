import "./App.css";
import 'react-data-grid/lib/styles.css';

import { Route, Routes } from "react-router-dom";
import DasboardScreen from "./screens/dashboardscreen/DasboardScreen";
import useScrollToTop from "./utilities/scroll to/ScrollToTop";
import NotFoundScreen from "./utilities/404 error/PageNotFound";

function App() {

  useScrollToTop();
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="*" element={<NotFoundScreen />} />
          <Route path="/" element={<DasboardScreen />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
