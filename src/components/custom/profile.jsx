import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

// TODO: Replace with actual auth mechanism.
const IS_LOGGED_IN = true;

const profile = () => {
    return (
        <div className='flex gap-4'>
            {IS_LOGGED_IN ? (
                <>
                    <a href="" className="flex items-center gap-4">
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
                    <Button>Log In</Button>
                    <Button>Sign up</Button>
                </>
            )}

        </div>
    );
};

export default profile;