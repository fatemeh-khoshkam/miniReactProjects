import Search from "./Search";

export default function Nav() {
    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
            <Search></Search>
            <p className="num-results">
                Found <strong>3</strong> results
            </p>
        </nav>
    );
}