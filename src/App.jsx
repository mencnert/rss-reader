import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import RssListPage from "./pages/RssListPage";

export default function App() {
  return (
    <Routes>
      <Route path="/rss-reader" element={<HomePage />} />
      <Route path="/rss-reader/list" element={<RssListPage />} />
    </Routes>
  );
}
