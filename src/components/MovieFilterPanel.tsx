import React from 'react';

export type SortField = 'vote_average' | 'popularity' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface MovieFiltersState {
    query: string;
    minRating: string;
    language: string;
    page: number;
    sortField: SortField;
    sortOrder: SortOrder;
}

export const INITIAL_FILTERS: MovieFiltersState = {
    query: '',
    minRating: '0',
    language: 'all',
    page: 1,
    sortField: 'vote_average',
    sortOrder: 'desc',
};

interface MovieFilterPanelProps {
    filters: MovieFiltersState;
    onChange: (nextFilters: MovieFiltersState) => void;
    onReset: () => void;
}

export const MovieFilterPanel: React.FC<MovieFilterPanelProps> = ({
                                                                      filters,
                                                                      onChange,
                                                                      onReset,
                                                                  }) => {
    const updateField = <K extends keyof MovieFiltersState>(
        field: K,
        value: MovieFiltersState[K]
    ) => {
       if (field === 'query') {
            onChange({
                ...filters,
                query: value as string,
                page: 1,
            });
            return;
        }

        onChange({
            ...filters,
            [field]: value,
        });
    };

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            style={panelStyle}
            aria-label="Панель фільтрів фільмів"
        >
            <div style={gridStyle}>
                <label style={labelStyle}>
                    <span>Пошук за назвою</span>
                    <input
                        type="text"
                        value={filters.query}
                        onChange={(e) => updateField('query', e.target.value)}
                        placeholder="Наприклад: Дюна, Аватар..."
                        style={inputStyle}
                    />
                </label>

                <label style={labelStyle}>
                    <span>Мін. рейтинг</span>
                    <select
                        value={filters.minRating}
                        onChange={(e) => updateField('minRating', e.target.value)}
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
                        onChange={(e) => updateField('language', e.target.value)}
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
                        onChange={(e) => updateField('page', Number(e.target.value))}
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
                            onChange={(e) => updateField('sortField', e.target.value as SortField)}
                            style={{ ...inputStyle, flex: 1 }}
                        >
                            <option value="vote_average">Рейтинг</option>
                            <option value="popularity">Популярність</option>
                            <option value="title">Назва</option>
                        </select>
                        <button
                            type="button"
                            onClick={() =>
                                updateField('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')
                            }
                            style={directionBtnStyle}
                            title="Змінити напрямок сортування"
                        >
                            {filters.sortOrder === 'asc' ? '↑ Зрост.' : '↓ Спад.'}
                        </button>
                    </div>
                </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px' }}>
                <button type="button" onClick={onReset} style={resetBtnStyle}>
                    Скинути фільтри
                </button>
            </div>
        </form>
    );
};

const panelStyle: React.CSSProperties = {
    background: 'rgba(30, 20, 56, 0.78)',
    border: '1px solid rgba(168, 85, 247, 0.28)',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '20px',
};

const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '14px',
};

const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    color: '#d8b4fe',
    fontSize: '13px',
    fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid rgba(168, 85, 247, 0.35)',
    background: 'rgba(15, 10, 26, 0.85)',
    color: '#f3e8ff',
    fontSize: '14px',
    outline: 'none',
};

const directionBtnStyle: React.CSSProperties = {
    padding: '10px 12px',
    borderRadius: '10px',
    border: '1px solid rgba(244, 114, 182, 0.45)',
    background: 'rgba(147, 51, 234, 0.28)',
    color: '#f5d0fe',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
};

const resetBtnStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '10px',
    border: '1px solid rgba(244, 114, 182, 0.5)',
    background: 'rgba(219, 39, 119, 0.2)',
    color: '#fbcfe8',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
};