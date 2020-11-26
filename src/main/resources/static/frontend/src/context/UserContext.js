import React, { createContext, useState, useEffect  } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [user, setUser] = useState(null);

  

    const fetchUser = async () => {
        let res = await fetch("/api/v1/users/whoami");
        try {
          res = await res.json();
          console.log(res);
          setUser(res);
        } catch {
           console.log('Not logged in');
        }
      };

      useEffect(() => {
        fetchUser()
       },[])

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
