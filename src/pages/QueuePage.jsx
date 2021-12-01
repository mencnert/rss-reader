import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useService } from "../components/WithService";
import "./QueuePage.css";

export default function QueuePage() {
  const { service } = useService();
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const [rss, setRss] = React.useState(null);
  const fetchFromQueue = async () => {
    setLoading(true);
    setRss(null);
    const data = await service.getNextFromQueue();
    setLoading(false);
    setCount(data.count);
    setRss(data.rss);
  };

  useEffect(() => {
    fetchFromQueue();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="CenterPage">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="content">
      <div className="count">In queue: {count}</div>
      {rss ? (
        <RssDetail rss={rss} fetchNextRss={fetchFromQueue} />
      ) : (
        <div className="button clickable footer" onClick={fetchFromQueue}>
          <RefreshIcon />
        </div>
      )}
      {rss ? <RssButtons rss={rss} fetchNextRss={fetchFromQueue} /> : null}
    </div>
  );
}

function RssDetail({ rss }) {
  return (
    <div
      className="details clickable"
      onClick={() => {
        window.open(rss.url, "_blank").focus();
      }}
    >
      <div>Rank: {rss.rank}</div>
      <div>Title: </div>
      <hr />
      <div className="title">{rss.title}</div>
    </div>
  );
}

function RssButtons({ rss, fetchNextRss }) {
  const { service } = useService();
  return (
    <div className="buttons footer">
      <div
        className="button clickable"
        onClick={() => {
          const bookmark = async () => {
            const ok = await service.updateById(rss.id, true, true);
            if (ok) {
              fetchNextRss();
            } else {
              alert("Problem to bookmark rss");
            }
          };

          bookmark();
        }}
      >
        <BookmarkIcon />
      </div>
      <div
        className="button clickable"
        onClick={() => {
          const markViewed = async () => {
            const ok = await service.updateById(rss.id, true, false);
            if (ok) {
              fetchNextRss();
            } else {
              alert("Problem to update rss");
            }
          };

          markViewed();
        }}
      >
        <VisibilityIcon />
      </div>
    </div>
  );
}
