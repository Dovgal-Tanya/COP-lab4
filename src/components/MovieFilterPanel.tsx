import React from 'react';
import { type SortField, useFilters } from '../context/FilterContext';
import { useTheme } from '../context/ThemeContext';

export const MovieFilterPanel: React.FC = () => {
    const { filters, setFilterField, toggleSortOrder, resetFilters } = useFilters();
    const { isLightTheme } = useTheme();

    const panelStyle: React.CSSProperties = {
        background: isLightTheme
            ? 'rgba(250, 240, 255, 0.88)'
            : 'rgba(30, 20, 56, 0.78)',
        border: isLightTheme
            ? '1px solid rgba(192, 132, 252, 0.45)'
            : '1px solid rgba(168, 85, 247, 0.28)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: isLightTheme
            ? '0 8px 24px rgba(168, 85, 247, 0.1)'
            : '0 8px 32px rgba(15, 10, 26, 0.3)',
    };

    const labelStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        color: isLightTheme ? '#6b21a8' : '#d8b4fe',
        fontSize: '13px',
        fontWeight: 600,
    };

    const inputStyle: React.CSSProperties = {
        padding: '10px 12px',
        borderRadius: '10px',
        border: isLightTheme
            ? '1px solid rgba(216, 180, 254, 0.9)'
            : '1px solid rgba(168, 85, 247, 0.35)',
        background: isLightTheme ? '#fdf2f8' : 'rgba(15, 10, 26, 0.85)',
        color: isLightTheme ? '#3b0764' : '#f3e8ff',
        fontSize: '14px',
        outline: 'none',
    };

    const directionBtnStyle: React.CSSProperties = {
        padding: '10px 12px',
        borderRadius: '10px',
        border: isLightTheme
            ? '1px solid rgba(236, 72, 153, 0.45)'
            : '1px solid rgba(244, 114, 182, 0.45)',
        background: isLightTheme ? '#fce7f3' : 'rgba(147, 51, 234, 0.28)',
        color: isLightTheme ? '#9d174d' : '#f5d0fe',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
    };

    const resetBtnStyle: React.CSSProperties = {
        padding: '8px 16px',
        borderRadius: '10px',
        border: isLightTheme
            ? '1px solid rgba(219, 39, 119, 0.45)'
            : '1px solid rgba(244, 114, 182, 0.5)',
        background: isLightTheme ? '#fbcfe8' : 'rgba(219, 39, 119, 0.2)',
        color: isLightTheme ? '#831843' : '#fbcfe8',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
    };

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={panelStyle}
            aria-label="Панель фільтрів фільмів"
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '14px',
                }}
            >
                <label style={labelStyle}>
                    <span>Пошук за назвою</span>
                    <input
                        type="text"
                        value={filters.query}
                        onChange={(e) => setFilterField('query', e.target.value)}
                        placeholder="Наприклад: Дюна, Аватар..."
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    <span>Мін. рейтинг</span>
                    <select
                        value={filters.minRating}
                        onChange={(e) => setFilterField('minRating', e.target.value)}
                        style={inputStyle}
                    >
                        <option value="0">Будь-який (0+)</option>
                        <option value="6">Від 6.0 ★</option>
                        <option value="7">Від 7.0 ★</option>
                        <option value="8">Від 8.0 ★</option>
                    </select>
                </label>

                <label style={labelStyle}>
                    <span>Мова оригіналу</span>
                    <select
                        value={filters.language}
                        onChange={(e) => setFilterField('language', e.target.value)}
                        style={inputStyle}
                    >
                        <option value="all">Усі мови</option>
                        <option value="en">Англійська (EN)</option>
                        <option value="uk">Українська (UK)</option>
                        <option value="ja">Японська (JA)</option>
                        <option value="fr">Французька (FR)</option>
                    </select>
                </label>

                <label style={labelStyle}>
                    <span>Сторінка API</span>
                    <select
                        value={String(filters.page)}
                        onChange={(e) => setFilterField('page', Number(e.target.value))}
                        style={inputStyle}
                    >
                        {Array.from({ length: 10 }, (_, idx) => idx + 1).map((pageNum) => (
                            <option key={pageNum} value={String(pageNum)}>
                                Сторінка {pageNum}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={labelStyle}>
                    <span>Сортування та напрямок</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                            value={filters.sortField}
                            onChange={(e) => setFilterField('sortField', e.target.value as SortField)}
                            style={{ ...inputStyle, flex: 1 }}
                        >
                            <option value="vote_average">Рейтинг</option>
                            <option value="popularity">Популярність</option>
                            <option value="title">Назва</option>
                        </select>
                        <button
                            type="button"
                            onClick={toggleSortOrder}
                            style={directionBtnStyle}
                            title="Змінити напрямок сортування"
                        >
                            {filters.sortOrder === 'asc' ? '↑ Зрост.' : '↓ Спад.'}
                        </button>
                    </div>
                </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
                <button type="button" onClick={resetFilters} style={resetBtnStyle}>
                    Скинути фільтри
                </button>
            </div>
        </form>
    );
};