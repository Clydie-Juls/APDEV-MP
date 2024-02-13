import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { TempState } from '@/lib/tempState';

const profile = () => {
    const handleLogOutClick = () => {
        TempState.set('loggedIn', false);
        window.location.replace("/landing");
    };
    
    return (
        <div className='flex gap-4'>
            {TempState.get('loggedIn') ? (
                <>
                    <a href="/user" className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <p className="font-bold">user1234</p>
                    </a>            

                    <Button onClick={handleLogOutClick}>Log Out</Button>
                </>
            ) : (
                <>
                    <Button asChild>
                        <a href="/login">Log In</a>
                    </Button>

                    <Button asChild>
                        <a href="/signUp">Sign Up</a>
                    </Button>
                </>
            )}

        </div>
    );
};

export default profile;