import React, {createContext, useState} from 'react'

export const UserContext = createContext();

const UserProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const updateUser = (userData) => {
        setUser(userData);
    }

    const updateUserStats = (key, value) => {
      setUser((prev) => ({...prev, [key]: value,}));
    }

    const onPollCreateOrDelete = (type = "create") => {
      const totalPollsCreated = user.totalPollsCreated || 0;
      updateUserStats("totalPollsCreated", type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1);
    }

    const clearUser = () => {
        setUser(null);
    }

  return <UserContext.Provider value={{user, updateUser, clearUser, onPollCreateOrDelete}}>
    {children}
  </UserContext.Provider>
}

export default UserProvider;