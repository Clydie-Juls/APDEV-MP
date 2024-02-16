import { useRef, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';

const ProfileSide = ({
  name,
  description,
  picture
}) => {
  const descElemRef = useRef();

  const [descEditable, setDescEditable] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAvatarClick = () => {
    // TODO: Actually reflect the avatar change.
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
  };

  const handleDelete = () => {
    // TODO
    setShowDeleteModal(false);
  };

  const handleEditDesc = () => {
    setDescEditable(true);

    setTimeout(() => {
      descElemRef.current.focus();
    }, 0);
  };

  const handleDescElemBlur = () => {
    setDescEditable(false);
  };

  return (
    <div 
      className='w-[35ch] min-h-100 p-5 flex flex-col items-stretch gap-5 border-2 border-border rounded-xl bg-zinc-950'
    >
      <div className='flex flex-col gap-2 items-center'>
        <Avatar className='relative cursor-pointer min-h-40 w-auto' onClick={handleAvatarClick}>
            <AvatarImage src={picture} />
            <AvatarFallback>CN</AvatarFallback>
            <button className='absolute inset-0 flex justify-center items-center opacity-0 hover:bg-zinc-700 hover:opacity-80'>
              <Pencil size={30} />
            </button>
        </Avatar>

        <p className="text-2xl font-bold">{name}</p>
      </div>

      <p 
        ref={descElemRef} 
        className='max-w-[40ch]' 
        contentEditable={descEditable} onBlur={handleDescElemBlur}
      > 
        {description}
      </p>

      <div className='mt-1 flex flex-col justify-center gap-3'>
        <Button onClick={handleEditDesc}>Edit Description</Button>
        <Button>
          <a href="/editlogininfo">Edit Login Info</a>
        </Button>

        <Button variant="destructive" onClick={setShowDeleteModal}>Delete Profile</Button>
      </div>

      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-black text-white border border-white p-8 rounded-lg">
            <p className="text-lg font-bold mb-4">Confirm Deletion</p>
            <p className="mb-4">Are you sure you want to delete your profile?</p>
            <div className="flex justify-between">
              <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button onClick={handleDelete} variant="destructive">Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSide;
