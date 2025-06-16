import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/auth/user`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setUser(data.user);
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
