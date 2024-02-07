import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AnimBackground from '@/components/custom/animBackground';
import CardList from '@/components/custom/cardList';
import Header from '@/components/custom/header';
import PostCard from '@/components/custom/postCard';

const Landing = () => {
  return (
    <AnimBackground>
      <div className="w-full h-full bg-background">
        <Header />

        <main>
          <Tabs defaultValue="recent" className="px-16 py-5">
            <div className="mb-4 flex justify-between">
              <div className="flex items-center gap-3">
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                <h2 className='text-3xl font-bold'>Posts</h2>
              </div>

              <Button asChild>
                <a href="/writePost">Create a Post</a>
              </Button>
            </div>
        
            <TabsContent value="recent">
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

            <TabsContent value="popular">
            <CardList>
                {/* TODO: Generate PostCard components based on retrived popular 
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
          </Tabs>
        </main>
      </div>
    </AnimBackground>
  );
};

export default Landing;
