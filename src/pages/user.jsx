import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AnimBackground from '@/components/custom/animBackground';
import Header from '@/components/custom/header';
import PostList from '@/components/custom/postList';

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
              <PostList by="recent"/>
            </TabsContent>

            <TabsContent value="comments">
              <PostList by="popular" />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AnimBackground>
  );
};

const ProfileSide = () => {
  return (
    <div className='min-h-100 p-5 flex flex-col items-stretch gap-5 bg-zinc-950'>
      <div className='flex flex-col gap-2 items-center'>
        <Avatar className='min-h-32 w-auto'>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <p className="text-2xl font-bold">user1234</p>
      </div>

      <p className='max-w-[40ch]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum iusto eligendi provident repellendus itaque totam amet dolor molestiae maxime dolores quo odio quam voluptate, laudantium placeat quia accusantium aliquam.</p>

      <div className='flex justify-center gap-3'>
        <Button>Edit Login Info</Button>
        <Button>Delete Profile</Button>
      </div>
    </div>
  );
};

export default User;
