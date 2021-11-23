import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <button>
        <Link to="/rss-reader/queue">Queue</Link>
      </button>
      <button>
        <Link to="/rss-reader/todo">Todo</Link>
      </button>
    </div>
  );
}
