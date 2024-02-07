import Logo from './logo';
import Profile from './profile';
import SearchBar from './searchBar';

const Header = () => {
    return (
        <header className="px-14 py-6 grid grid-cols-[auto_1fr_auto] gap-8 bg-zinc-900 rounded-b-lg border-b-2 border-zinc-500">
            <h1><a href="/landing"><Logo /></a></h1>
            <SearchBar />
            <Profile />
        </header>
    );
};

export default Header;