import { useEffect, useState } from "react";
import { ProviderContext } from "./ProviderContext";

const setToken = (accessToken) => {
  sessionStorage.setItem("accessToken", JSON.stringify(accessToken));
};

const getToken = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  return JSON.parse(accessToken);
};

const params = new URLSearchParams(window.location.hash.slice(1));

export const Provider = ({ children }) => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const token = params.get("access_token");

    if (!token) setAuthed(false);
    else {
      if (token !== getToken()) {
        setToken(token);
        setAuthed(true);
      }
    }
  }, []);

  return (
    <ProviderContext.Provider
      value={{
        setToken,
        getToken,
        authed,
      }}
    >
      {children}
    </ProviderContext.Provider>
  );
};
