import React, { useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import CircularProgress from "@mui/material/CircularProgress";

import { useService } from "../components/WithService";
import "./RssListPage.css";
import { FilterService } from "../services/filterService";

export default function RssListPage() {
  const { service } = useService();
  const [rssList, setRssList] = React.useState([]);
  const [filteredRssList, setFilteredRssList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [filter, setFilter] = React.useState(FilterService.getFilter());

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await service.fetchRssList();
      data.sort(function (a, b) {
        return b.id - a.id;
      });
      setRssList(data);
      setLoading(false);
    };
    fetch();
  }, [service]);

  useEffect(() => {
    FilterService.setFilter(filter);
  }, [filter]);

  useEffect(() => {
    setFilteredRssList(FilterService.filter(rssList));
  }, [rssList, filter]);

  if (loading) {
    return (
      <div className="CenterPage">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <div className="filters">
        <div
          className={`filter clickable ${
            filter === "ALL" ? "active-filter" : ""
          }`}
          onClick={() => {
            setFilter("ALL");
          }}
        >
          ALL
        </div>
        <div
          className={`filter clickable ${
            filter === "UNSEEN" ? "active-filter" : ""
          }`}
          onClick={() => {
            setFilter("UNSEEN");
          }}
        >
          UNSEEN
        </div>
        <div
          className={`filter clickable ${
            filter === "SAVED" ? "active-filter" : ""
          }`}
          onClick={() => {
            setFilter("SAVED");
          }}
        >
          SAVED
        </div>
      </div>
      <div className="rss-list">
        {filteredRssList.map((rss, i) => (
          <RssRow
            rss={rss}
            updateRss={(newState) => {
              const newRssList = rssList.map((v) => {
                if (v.id === newState.id) {
                  return newState;
                } else {
                  return v;
                }
              });
              setRssList(newRssList);
            }}
            key={rss.id}
          />
        ))}
      </div>
    </>
  );
}

function RssRow({ rss, updateRss }) {
  const { service } = useService();

  return (
    <div
      className={
        rss.viewed && !rss.saved ? "rss-row viewed disabled" : "rss-row"
      }
    >
      <div
        className="rss-title clickable"
        onClick={() => {
          window.open(rss.url, "_blank").focus();
        }}
      >
        {rss.title}
      </div>

      <div className="icons">
        <div
          onClick={() => {
            const update = async () => {
              const ok = await service.updateById(
                rss.id,
                rss.viewed,
                !rss.saved
              );
              if (ok) {
                updateRss({ ...rss, saved: !rss.saved });
              } else {
                alert("Update failed");
              }
            };
            update();
          }}
        >
          <BookmarkIcon
            className={rss.saved ? "clickable" : "clickable disabled"}
          />
        </div>
        <div
          onClick={() => {
            const update = async () => {
              const ok = await service.updateById(
                rss.id,
                !rss.viewed,
                rss.saved
              );
              if (ok) {
                updateRss({ ...rss, viewed: !rss.viewed });
              } else {
                alert("Update failed");
              }
            };
            update();
          }}
        >
          <SeenToggleIcon viewed={rss.viewed} />
        </div>
      </div>
    </div>
  );
}

function SeenToggleIcon({ viewed }) {
  if (viewed) {
    return (
      <div className="clickable">
        <VisibilityOffIcon />
      </div>
    );
  } else {
    return (
      <div className="clickable">
        <VisibilityIcon />
      </div>
    );
  }
}
