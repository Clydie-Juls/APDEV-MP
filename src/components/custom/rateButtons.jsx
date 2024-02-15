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
            <Button className='flex gap-3 items-center border-none' variant="ghost">
                {likes}
                
                <ThumbsUp 
                    fill={userRating === 'like' ? '#99C28A' : ''}
                    stroke={userRating === 'like' ? '#99C28A' : '#bbb'}
                />
            </Button>
            <Button className='flex gap-3 items-center border-none' variant="ghost">
                {dislikes}
                <ThumbsDown 
                    fill={userRating === 'dislike' ? '#f87171' : ''} 
                    stroke={userRating === 'dislike' ? '#f87171' : '#bbb'}
                />
            </Button>
        </div>
    );
};

export default RateButtons;