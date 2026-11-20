import React, { createContext, useContext, useState } from 'react';

interface ThemeContextValue {
    isLightTheme: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLightTheme, setIsLightTheme] = useState<boolean>(false);

    const toggleTheme = () => {
        setIsLightTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme має використовуватися всередині ThemeProvider');
    }
    return ctx;
}