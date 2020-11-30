import React, { createContext, useEffect, useState  } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        let res = await fetch("/api/v1/users/whoami");
        try {
          res = await res.json();
          if(res.status === 200){
            setUser(res);
          }
        } catch {
  
        }
      };

      useEffect(() =>{
        console.log("user changed");
        console.log(user);
      }, [user])

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
