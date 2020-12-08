import React, { createContext, useEffect, useState, useContext } from "react";
import {ChatContext} from "./ChatContext"


export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const {fetchMessage} = useContext(ChatContext)


  const fetchUser = async () => {
    let res = await fetch("/api/v1/users/whoami");
    try {
      if (res.ok) {
        res = await res.json();
        setUser(res);
        await fetchMessage()
      } else {
        console.log("else: ", res);
        setUser(null);
      }
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const values = {
    user,
    fetchUser,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
