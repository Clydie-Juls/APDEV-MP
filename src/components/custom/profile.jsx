import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

// TODO: Replace with actual auth mechanism.
const IS_LOGGED_IN = true;

const profile = () => {
    return (
        <div className='flex gap-4'>
            {IS_LOGGED_IN ? (
                <>
                    <a href="/user" className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <p className="font-bold">user1234</p>
                    </a>            

                    <Button>Log Out</Button>
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