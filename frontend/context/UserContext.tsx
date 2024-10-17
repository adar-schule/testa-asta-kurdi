// /frontend/context/UserContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the user data
interface UserData {
    name: string;
    surname: string;
    email: string;
    phone: string;
}

// Define the shape of the context
interface UserContextType {
    user: UserData;
    setUser: (userData: UserData) => void;
}

// Create the UserContext with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

// Provider component to wrap around the app
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData>({
        name: '',
        surname: '',
        email: '',
        phone: ''
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};