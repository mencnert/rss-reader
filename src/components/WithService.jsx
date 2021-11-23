import React from "react";
import Cookies from "js-cookie";
import { createService } from "../services/service";

export const ServiceContext = React.createContext({
  service: createService(""),
  setService: () => {},
});

export const useService = () => React.useContext(ServiceContext);

export default function WithService({ children }) {
  const token = Cookies.get("auth_token");
  const [service, setService] = React.useState(createService(token? token : ""));
  const value = React.useMemo(() => ({ service, setService }), [service]);
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
}
