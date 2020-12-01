import React, { createContext, useEffect, useState  } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    //Not in use, remove this comment and the fetchUser function if its still not in use in sprint 2.
    const fetchUser = async () => {
      let res = await fetch("/api/v1/users/whoami");
      try {
        if(res.ok){
          res = await res.json();
          setUser(res);
        }
        else{
          console.log("else: ",res)
          setUser(null);
        }
      } catch {

      }
    };


  const values = {
    user,
    fetchUser,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider
