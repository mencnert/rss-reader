import * as React from "react";
import RssListPage from "./pages/RssListPage";
import QueuePage from "./pages/QueuePage";

export default function App() {
  const [router, setRouter] = React.useState("/");
  if (router === "/") {
    return (
      <div className="menu">
        <div
          className="menu-item"
          onClick={() => {
            setRouter("/list");
          }}
        >
          Rss List
        </div>
        <div
          className="menu-item"
          onClick={() => {
            setRouter("/queue");
          }}
        >
          Rss Queue
        </div>
      </div>
    );
  }
  if (router === "/list") {
    return <RssListPage />;
  }

  if (router === "/queue") {
    return <QueuePage />;
  }

  return <div>Page '{router}' not fount</div>;
}
