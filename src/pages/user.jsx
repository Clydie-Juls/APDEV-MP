import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AnimBackground from '@/components/custom/animBackground';
import CardList from '@/components/custom/cardList';
import Header from '@/components/custom/header';
import PostCard from '@/components/custom/postCard';
import CommentCard from '@/components/custom/commentCard';

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
                <PostCard 
                    title="Post Title"
                    author="user1432"
                    body="A very epic description."
                    uploadDate="1/1/2024"
                    views={12345}
                    tags={['tag1', 'tag2']}
                />
              </CardList>
            </TabsContent>

            <TabsContent value="comments">
            <CardList>
                {/* TODO: Generate CommentCard components based on retrived recent 
                    comments. */}
                <CommentCard
                  postTitle="Epic post"
                  body="Never gonna give you up. Never gonna let you down."
                  uploadDate="1/1/2024"
                  tags={['tag3', 'tag5']}
                />
              </CardList>
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
