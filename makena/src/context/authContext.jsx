import { createContext, useEffect, useState } from "react";


export const authContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log({ currentUser });
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubuscribe();
    }, []);



    return (
        <authContext.Provider value={{
            user,
            loading,
            }}>
            {children}
        </authContext.Provider>
    )
}