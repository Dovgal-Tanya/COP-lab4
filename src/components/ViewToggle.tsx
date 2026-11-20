import React from 'react';

interface ViewToggleProps {
    isLightTheme?: boolean;
    onToggleTheme?: () => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
                                                          isLightTheme = false,
                                                          onToggleTheme,
                                                      }) => {
    return (
        <div
            style={{
                background: isLightTheme
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(30, 20, 56, 0.75)',
                border: isLightTheme
                    ? '1px solid rgba(147, 51, 234, 0.25)'
                    : '1px solid rgba(168, 85, 247, 0.25)',
                borderRadius: '16px',
                padding: '20px',
                flex: '1',
                minWidth: '240px',
                textAlign: 'center',
            }}
        >
            <h4
                style={{
                    margin: '0 0 8px 0',
                    color: isLightTheme ? '#4c1d95' : '#c4b5fd',
                    fontSize: '15px',
                    fontWeight: 600,
                }}
            >
                Режим секції
            </h4>
            <p
                style={{
                    margin: '0 0 14px 0',
                    color: isLightTheme ? '#1e1b4b' : '#f3e8ff',
                    fontSize: '14px',
                }}
            >
                Тема:{' '}
                <strong style={{ color: isLightTheme ? '#be185d' : '#f472b6' }}>
                    {isLightTheme ? 'Світла' : 'Темна (Неон-фіолет)'}
                </strong>
            </p>
            <button
                type="button"
                onClick={onToggleTheme}
                style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    border: '1px solid rgba(219, 39, 119, 0.6)',
                    background: isLightTheme ? '#fdf2f8' : 'rgba(147, 51, 234, 0.25)',
                    color: isLightTheme ? '#be185d' : '#f5d0fe',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                Змінити стиль
            </button>
        </div>
    );
};