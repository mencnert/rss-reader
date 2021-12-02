import React from "react";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";

import { useService } from "../components/WithService";

export default function CleanPage() {
  const { service } = useService();
  const [loading, setLoading] = React.useState(false);
  const [cleaned, setCleaned] = React.useState(false);

  if (loading) {
    return (
      <div className="CenterPage">
        <CircularProgress />
      </div>
    );
  }

  if (cleaned) {
    return <div className="CenterPage">Cleaned</div>;
  }

  return (
    <div
      className="menu-item"
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        marginTop: "45vh",
      }}
      onClick={() => {
        const cleanQueue = async () => {
          setLoading(true);
          const ok = await service.cleanRssQueue()
          if (!ok) {
            alert("sth go wrong")
          }
          setCleaned(ok);
          setLoading(false);
        };

        cleanQueue();
      }}
    >
      <WarningIcon />
      Clean Queue
      <WarningIcon />
    </div>
  );
}
