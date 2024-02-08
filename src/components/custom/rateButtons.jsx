import { ThumbsDown, ThumbsUp } from 'lucide-react';

// TODO: Like and dislike props
const RateButtons = ({
    likes,
    dislikes,
    userRating
}) => {
    return (
        <div className='flex flex-col gap-5 justify-center items-end'>
            <button className='flex gap-3 items-center'>
                {likes}
                <ThumbsUp fill={userRating === 'like' ? '#fff' : ''} />
            </button>
            <button className='flex gap-3 items-center'>
                {dislikes}
                <ThumbsDown fill={userRating === 'dislike' ? '#fff' : ''} />
            </button>
        </div>
    );
};

export default RateButtons;