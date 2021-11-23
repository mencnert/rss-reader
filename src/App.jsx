import * as React from "react";
import {
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import QueuePage from "./pages/QueuePage";
import TodoPage from "./pages/TodoPage";

export default function App() {
  return (
    <Routes>
      <Route path="/rss-reader" element={<HomePage />} />
      <Route path="/rss-reader/queue" element={<QueuePage />} />
      <Route path="/rss-reader/todo" element={<TodoPage />} />
    </Routes>
  );
}
