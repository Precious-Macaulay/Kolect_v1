'use client'
import React from 'react';
import {
    onAuthStateChanged,
    getAuth,
} from 'firebase/auth';
import firebase_app from '@/src/firebase/config';
import { Spinner } from '@nextui-org/react'


const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({
    user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
    children,
}) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div className="h-screen w-screen p-special-m flex justify-center items-center">
            <Spinner size="lg" label={`Loading...`}/> 
            </div> : children}
        </AuthContext.Provider>
    );
};