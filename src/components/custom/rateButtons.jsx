import { ThumbsDown, ThumbsUp } from 'lucide-react';

// TODO: Like and dislike props
const RateButtons = () => {
    return (
        <div className='flex flex-col gap-5 justify-center items-end'>
            <button className='flex gap-3 items-center'>
                0
                <ThumbsUp />
            </button>
            <button className='flex gap-3 items-center'>
                0
                <ThumbsDown />
            </button>
        </div>
    );
};

export default RateButtons;