import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5001/auth/user', {
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
