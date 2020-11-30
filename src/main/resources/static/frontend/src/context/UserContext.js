import React, { createContext, useEffect, useState  } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    //Not in use, remove this comment and the fetchUser function if its still not in use in sprint 2.
    const fetchUser = async () => {
        let res = await fetch("/api/v1/users/whoami");
        try {
          res = await res.json();
          if(res.status === 200){
            console.log(res)
            setUser(res);
          }
          else{
            console.log("else: ",res)
            setUser(null);
          }
        } catch {
         console.log("no user logged in")
        }
        return res
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
