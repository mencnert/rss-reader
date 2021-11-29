import React from "react";
import Cookies from "js-cookie";
import base64 from "base-64";

import "./Login.css";
import { useService } from "./WithService";
import { createService } from "../services/service";

export default function WithLogin({ children }) {
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const { service, setService } = useService();

  React.useEffect(() => {
    const checkAuth = async () => {
      const isLoggedIn = await service.checkAuth();
      if (isLoggedIn) {
        setLogged(true);
      } else {
        setLogged(false);
        Cookies.remove("auth_token");
      }
    };
    checkAuth();
  }, [service]);

  function handleSubmit(event) {
    const token = base64.encode(`${user}:${pass}`);
    Cookies.set("auth_token", token);
    setService(createService(token));
    event.preventDefault();
  }

  if (logged) {
    return children;
  } else {
    return (
      <div className="CenterPage">
        <form onSubmit={handleSubmit}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="username">Username: </label>
                </td>
                <td>
                  <input
                    type="text"
                    value={user}
                    onChange={(e) => {
                      setUser(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="password">Password: </label>
                </td>
                <td>
                  <input
                    type="password"
                    value={pass}
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td></td>
                <td className="Submit">
                  <input type="submit" value="Submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
