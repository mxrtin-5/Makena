import { createContext, useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(false)


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <div>
                {children}
            </div>
        </UserContext.Provider>
    )

}