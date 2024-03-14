import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';

// TODO: Like and dislike props
const RateButtons = ({
    likes,
    dislikes,
    horizontal,
    userRating,
    disableReactions,
    onLikeClick,
    onDislikeClick
}) => {
    return (
        <div className={'flex justify-center items-end ' + (horizontal ? 'gap-1 flex-row' : 'gap-5 flex-col')}>
            {disableReactions ? 
                <>
                    <div className='p-3 flex gap-3 items-center text-zinc-400'>
                        {likes}
                        
                        <ThumbsUp 
                            fill={userRating === 'like' ? '#fff' : ''}
                            stroke="#fff"
                        />
                    </div>
                    <div className='p-3 flex gap-3 items-center text-zinc-400'>
                        {dislikes}

                        <ThumbsDown 
                            fill={userRating === 'dislike' ? '#fff' : ''} 
                            stroke="#fff"
                        />
                    </div>
                </>

            :
                <>
                    <Button 
                        className='flex gap-3 items-center border-none text-zinc-400' 
                        variant="ghost"
                        onLikeClick={onLikeClick}
                    >
                        {likes}
                        
                        <ThumbsUp 
                            fill={userRating === 'like' ? '#fff' : ''}
                            stroke="#fff"
                        />
                    </Button>

                    <Button 
                        className='flex gap-3 items-center border-none text-zinc-400' 
                        variant="ghost"
                        onDislikeClick={onDislikeClick}
                    >
                        {dislikes}

                        <ThumbsDown 
                            fill={userRating === 'dislike' ? '#fff' : ''} 
                            stroke="#fff"
                        />
                    </Button>
                </>
            }
        </div>
    );
};

export default RateButtons;