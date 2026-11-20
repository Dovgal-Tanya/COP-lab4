import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import { DashboardPage } from './pages/DashboardPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';

const AppShell: React.FC = () => {
    const { isLightTheme, toggleTheme } = useTheme();

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: '36px 20px',
                background: isLightTheme
                    ? 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 55%, #ede9fe 100%)'
                    : '#0f0a1a',
                color: isLightTheme ? '#3b0764' : '#e2d9f3',
                transition: 'background 0.25s ease, color 0.25s ease',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <header
                    style={{
                        marginBottom: '28px',
                        borderBottom: isLightTheme
                            ? '1px solid rgba(192, 132, 252, 0.45)'
                            : '1px solid rgba(168, 85, 247, 0.25)',
                        paddingBottom: '16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '12px',
                    }}
                >
                    <div>
                        <h1
                            style={{
                                margin: '0 0 6px 0',
                                color: isLightTheme ? '#4c1d95' : '#f3e8ff',
                                fontSize: '26px',
                                fontWeight: 700,
                            }}
                        >
                            <Link
                                to="/"
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                Кіно-Аналітика{' '}
                                <span style={{ color: isLightTheme ? '#be185d' : '#f472b6' }}>
                  Dashboard
                </span>
                            </Link>
                        </h1>

                    </div>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        style={{
                            padding: '8px 14px',
                            borderRadius: '10px',
                            border: isLightTheme
                                ? '1px solid rgba(219, 39, 119, 0.45)'
                                : '1px solid rgba(219, 39, 119, 0.6)',
                            background: isLightTheme ? '#fbcfe8' : 'rgba(147, 51, 234, 0.25)',
                            color: isLightTheme ? '#831843' : '#f5d0fe',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        {isLightTheme ? 'Темна тема' : 'Світла тема'}
                    </button>
                </header>

                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/movie/:id" element={<MovieDetailsPage />} />
                    <Route path="*" element={<MovieDetailsPage />} />
                </Routes>
            </div>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <FilterProvider>
                    <AppShell />
                </FilterProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;