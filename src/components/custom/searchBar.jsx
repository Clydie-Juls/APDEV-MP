import { Search } from 'lucide-react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

const SearchBar = () => {
    return (
        <div className='flex gap-4'>
            <Input type="text" placeholder="Search Posts" />
            <Button><Search /></Button>
        </div>
    );
};

export default SearchBar;