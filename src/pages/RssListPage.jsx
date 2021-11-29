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
          className={`filter ${filter === "ALL" ? "active" : ""}`}
          onClick={() => {
            setFilter("ALL");
          }}
        >
          ALL
        </div>
        <div
          className={`filter ${filter === "UNSEEN" ? "active" : ""}`}
          onClick={() => {
            setFilter("UNSEEN");
          }}
        >
          UNSEEN
        </div>
        <div
          className={`filter ${filter === "SAVED" ? "active" : ""}`}
          onClick={() => {
            setFilter("SAVED");
          }}
        >
          SAVED
        </div>
      </div>
      <table className="rss-list">
        <thead></thead>
        <tbody>
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
        </tbody>
      </table>
    </>
  );
}

function RssRow({ rss, updateRss }) {
  const { service } = useService();
  return (
    <tr className={rss.viewed && !rss.saved ? "viewed disabled" : ""}>
      <td
        className="rss-col"
        onClick={() => {
          const update = async () => {
            const ok = await service.updateById(rss.id, rss.viewed, !rss.saved);
            if (ok) {
              updateRss({ ...rss, saved: !rss.saved });
            } else {
              alert("Update failed");
            }
          };
          update();
        }}
      >
        <BookmarkIcon className={rss.saved ? "" : "disabled"} />
      </td>
      <td
        className="rss-col"
        onClick={() => {
          window.open(rss.url, "_blank").focus();
        }}
      >
        {rss.title}
      </td>
      <td
        className="rss-col"
        onClick={() => {
          const update = async () => {
            const ok = await service.updateById(rss.id, !rss.viewed, rss.saved);
            if (ok) {
              updateRss({ ...rss, viewed: !rss.viewed });
            } else {
              alert("Update failed");
            }
          };
          update();
        }}
      >
        {rss.viewed ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </td>
    </tr>
  );
}
