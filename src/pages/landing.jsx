import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Header from '@/components/custom/header';
import PostList from '@/components/custom/postList';

const Landing = () => {
  return (
    <div className="h-screen bg-background">
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

            <Button>Create a Post</Button>
          </div>
      
          <TabsContent value="recent">
            <PostList by="recent"/>
          </TabsContent>

          <TabsContent value="popular">
            <PostList by="popular" />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Landing;
