

export default function Search({query , onSetQuery}: {query: string , onSetQuery: (query: string) => void }) {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies ..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
        />
    )
}