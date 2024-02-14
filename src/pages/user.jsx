import { useState, useRef, useEffect } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import AnimBackground from '@/components/custom/animBackground';
import CardList from '@/components/custom/cardList';
import Header from '@/components/custom/header';
import PostCard from '@/components/custom/postCard';
import CommentCard from '@/components/custom/commentCard';
import { Pencil } from 'lucide-react';

// TODO: Replace with actual retrieval mechanism.
const SAMPLE_POSTS = [
  {
    id: 0,
    title: 'Post 1',
    author: 'user1',
    body: 'body1',
    uploadDate: '1/1/2024',
    views: 12345,
    likes: 123,
    dislikes: 58,
    userRating: 'dislike',
    tags: ['tag1', 'tag2']
  },
  {
    id: 1,
    title: 'Post 2',
    author: 'user2',
    body: 'body2',
    uploadDate: '1/1/2024',
    views: 1245,
    likes: 23,
    dislikes: 8,
    userRating: null,
    tags: ['tag1', 'tag2']
  },
  {
    id: 2,
    title: 'Post 3',
    author: 'user3',
    body: 'body3',
    uploadDate: '1/1/2024',
    views: 1245,
    likes: 23,
    dislikes: 8,
    userRating: 'like',
    tags: ['tag1', 'tag2']
  },
];

// TODO: Replace with actual retrieval mechanism.
const SAMPLE_COMMENTS = [
  {
    id: 23,
    postId: 1,
    postTitle: 'Post 2',
    postTags: ['tag3', 'tag5'],
    body: 'Never gonna give you up. Never gonna let you down.',
    uploadDate: '1/2/2024',
    likes: 0,
    dislikes: 123,
    userRating: 'dislike'
  },
  {
    id: 3,
    postId: 0,
    postTitle: 'Post 1',
    postTags: ['tag3', 'tag5'],
    body: 'We\'ve known each other, for so long',
    uploadDate: '1/2/2024',
    likes: 2,
    dislikes: 0,
    userRating: null
  },
];

const User = () => {
  return (
    <AnimBackground>
      <div className="w-full h-full grid grid-rows-[auto_1fr]">
        <Header />

        <main className='px-16 py-5 grid grid-cols-[auto_1fr] gap-5'>
          <ProfileSide />

          <Tabs defaultValue='posts'>
            <TabsList>
              <TabsTrigger value='posts'>Posts</TabsTrigger>
              <TabsTrigger value='comments'>Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="posts">
              <CardList>
                {/* TODO: Generate PostCard components based on retrived recent 
                    posts. */}
                {SAMPLE_POSTS.map(p => 
                  <PostCard
                    key={p.id}
                    title={p.title}
                    author={p.author}
                    body={p.body}
                    uploadDate={p.uploadDate}
                    views={p.views}
                    likes={p.likes}
                    dislikes={p.dislikes}
                    userRating={p.userRating}
                    tags={p.tags}
                  />
                )}
              </CardList>
            </TabsContent>

            <TabsContent value="comments">
            <CardList>
                {/* TODO: Generate CommentCard components based on retrived recent 
                    comments. */}
                {SAMPLE_COMMENTS.map(c => 
                  <CommentCard
                    key={c.id}
                    postTitle={c.postTitle}
                    postTags={c.postTags}
                    body={c.body}
                    uploadDate={c.uploadDate}
                    likes={c.likes}
                    dislikes={c.dislikes}
                    userRating={c.userRating}
                  />
                )}
              </CardList>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AnimBackground>
  );
};

const ProfileSide = () => {
  const [descEditable, setDescEditable] = useState(false);
  const descElemRef = useRef();

  const handleAvatarClick = () => {
    // TODO
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
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
    <div className='min-h-100 p-5 flex flex-col items-stretch gap-5 border-2 border-zinc-500 rounded-xl bg-zinc-950'>
      <div className='flex flex-col gap-2 items-center'>
        <Avatar className='relative cursor-pointer min-h-32 w-auto' onClick={handleAvatarClick}>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
            <button className='absolute inset-0 flex justify-center items-center opacity-0 hover:bg-zinc-700 hover:opacity-80'>
              <Pencil size={30} />
            </button>
        </Avatar>

        <p className="text-2xl font-bold">user1234</p>
      </div>

      <p ref={descElemRef} className='max-w-[40ch]' contentEditable={descEditable} onBlur={handleDescElemBlur}> 
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum iusto eligendi provident repellendus itaque totam amet dolor molestiae maxime dolores quo odio quam voluptate, laudantium placeat quia accusantium aliquam.
      </p>

      <div className='mt-1 flex flex-col justify-center gap-3'>
        <Button onClick={handleEditDesc}>Edit Description</Button>
        <Button>
          <a href="/editlogininfo">Edit Login Info</a>
        </Button>
        <Button>Delete Profile</Button>
      </div>
    </div>
  );
};

export default User;
