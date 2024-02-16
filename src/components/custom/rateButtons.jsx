import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';

// TODO: Like and dislike props
const RateButtons = ({
    likes,
    dislikes,
    horizontal,
    userRating
}) => {
    return (
        <div className={'flex justify-center items-end ' + (horizontal ? 'gap-1 flex-row' : 'gap-5 flex-col')}>
            <Button className='flex gap-3 items-center border-none text-zinc-400' variant="ghost">
                {likes}
                
                <ThumbsUp 
                    fill={userRating === 'like' ? '#fff' : ''}
                    stroke="#fff"
                />
            </Button>
            <Button className='flex gap-3 items-center border-none text-zinc-400' variant="ghost">
                {dislikes}
                <ThumbsDown 
                    fill={userRating === 'dislike' ? '#fff' : ''} 
                    stroke="#fff"
                />
            </Button>
        </div>
    );
};

export default RateButtons;