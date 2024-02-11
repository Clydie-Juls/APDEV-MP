import RateButtons from './rateButtons';
import Tag from './tag';

// TODO: Complete all props.
const CommentCard = ({ 
    postTitle, 
    postTags,
    body,
    uploadDate,
    likes,
    dislikes,
    userRating
}) => {
    return (
        <div className='px-7 py-5 grid grid-cols-[1fr_auto] border-2 border-zinc-500 rounded-xl bg-zinc-950'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-3'>
                    <h3 className='text-2xl font-bold'>In {postTitle}</h3>
                    <p className='text-sm'>Uploaded {uploadDate}</p>
                    {postTags.map((name, i) => <Tag key={i} name={name} />)}
                </div>

                <p>{body}</p>
            </div>

            <RateButtons likes={likes} dislikes={dislikes} userRating={userRating} />
        </div>
    );
};

export default CommentCard;