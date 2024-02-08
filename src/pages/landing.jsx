import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AnimBackground from '@/components/custom/animBackground';
import CardList from '@/components/custom/cardList';
import Header from '@/components/custom/header';
import PostCard from '@/components/custom/postCard';

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

            <TabsContent value="popular">
            <CardList>
                {/* TODO: Generate PostCard components based on retrived popular 
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
          </Tabs>
        </main>
      </div>
    </AnimBackground>
  );
};

export default Landing;
