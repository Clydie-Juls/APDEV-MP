import RateButtons from './rateButtons';
import Tag from './tag';

// TODO: Complete all props.
const PostCard = ({ 
    title, 
    author,
    body,
    uploadDate,
    views,
    likes,
    dislikes,
    userRating,
    tags
}) => {
    // TODO: Shorten very long bodies with ellipses
    // TODO: Find a way to link to an author's profile via profile anchor
    // TODO: Work with actual, not string dates
    return (
        <div className='px-7 py-5 grid grid-cols-[1fr_auto] border-2 border-zinc-500 rounded-xl bg-zinc-950'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-3'>
                    <h3 className='text-2xl font-bold'>{title}</h3>
                    {tags.map((name, i) => <Tag key={i} name={name} />)}
                </div>
                <p>{body}</p>

                <div className='flex gap-2'>
                    <p className='text-sm'>By <a href="">{author}</a></p>
                    <p className='text-sm'>Uploaded {uploadDate}</p>
                    <p className='text-sm'>{views} Views</p>
                </div>
            </div>

            <RateButtons likes={likes} dislikes={dislikes} userRating={userRating} />
        </div>
    );
};

export default PostCard;
