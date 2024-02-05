import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';

const profile = () => {
    return (
        <div className='flex gap-4'>
            <a href="" className="flex items-center gap-4">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p className="font-bold">user1234</p>
            </a>            

            <Button>Log Out</Button>
        </div>
    );
};

export default profile;