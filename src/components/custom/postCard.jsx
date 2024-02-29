import RateButtons from './rateButtons';
import Tag from './tag';

// TODO: Make the props the same as the DB schema
const PostCard = ({ 
    id,
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
        <div 
            className='px-7 py-5 overflow-hidden grid grid-cols-[1fr_auto] border-2 border-border rounded-xl bg-zinc-950 hover:bg-zinc-900'
        >
            <a 
                className='overflow-hidden flex flex-col gap-2' 
                href={`/post/${id}`}
            >
                <h3 className='text-xl font-bold'>{title}</h3>

                <div className='flex gap-2'>
                    {tags.map((name, i) => <Tag key={i} name={name} />)}
                </div>

                <p className='overflow-hidden text-ellipsis text-nowrap text-zinc-400'>{body}</p>

                <div className='flex gap-2'>
                    <p className='text-sm'>By {author}</p>
                    <p className='text-sm'>Uploaded {uploadDate}</p>
                    <p className='text-sm'>{views} Views</p>
                </div>
            </a>

            <RateButtons likes={likes} dislikes={dislikes} userRating={userRating} />
        </div>
    );
};

export default PostCard;
