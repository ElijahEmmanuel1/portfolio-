"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
    userName: string;
    userPhoto: string | null;
    setUserPhoto: (photo: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userName] = useState("Commander");
    const [userPhoto, setUserPhotoState] = useState<string | null>(null);

    useEffect(() => {
        const savedPhoto = localStorage.getItem('axiom_user_photo');
        if (savedPhoto) {
            setUserPhotoState(savedPhoto);
        }
    }, []);

    const setUserPhoto = (photo: string) => {
        setUserPhotoState(photo);
        localStorage.setItem('axiom_user_photo', photo);
    };

    return (
        <UserContext.Provider value={{ userName, userPhoto, setUserPhoto }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
