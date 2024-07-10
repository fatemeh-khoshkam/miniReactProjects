import Search from "./Search";
import Logo from "./Logo";

export default function Nav({query , onSetQuery}: {query: string , onSetQuery: (query: string) => void }) {

    return (
        <nav className="nav-bar">
            <Logo></Logo>
            <Search query={query} onSetQuery={onSetQuery}></Search>
        </nav>
    );
}