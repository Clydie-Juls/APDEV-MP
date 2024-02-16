import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const PostHeader = ({title, profile, userName}) => {
  return (
    <div className="my-4 max-w-[100vw] flex flex-col gap-3">
    <div className='mb-4 flex items-end gap-6'>
      <h2 className="text-4xl font-bold">{title}</h2>
      <p className='flex items-center gap-4'>
        By 
        <a href="/user/0" className='flex items-center gap-2'>
          <Avatar>
            <AvatarImage src={profile} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {userName}
        </a>
      </p>
    </div>
    </div>
  )
}

export default PostHeader