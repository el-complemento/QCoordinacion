//useAuth.jsx
import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  URL: "http://127.0.0.1:8080/",
  realm: "myrealm",
  clientId: "myclient",
});

const useAuth = () => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
      });
  }, []);

  return isLogin;
};

export default useAuth;