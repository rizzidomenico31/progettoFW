import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/auth/user`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.loggedIn) setUser(data.user);
                else setUser(null);
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser , loading}}>
            {children}
        </UserContext.Provider>
    );
}
