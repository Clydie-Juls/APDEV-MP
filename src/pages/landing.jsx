import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import AnimBackground from '@/components/custom/animBackground';
import CardList from '@/components/custom/cardList';
import Header from '@/components/custom/header';
import PostCard from '@/components/custom/postCard';

// TODO: Replace with actual retrieval mechanism.
const SAMPLE_POSTS_1 = [
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
  {
    id: 3,
    title: 'Post 4',
    author: 'user4',
    body: 'body4',
    uploadDate: '1/2/2024',
    views: 3456,
    likes: 87,
    dislikes: 15,
    userRating: 'like',
    tags: ['tag3', 'tag4']
  },
  {
    id: 4,
    title: 'Post 5',
    author: 'user5',
    body: 'body5',
    uploadDate: '1/3/2024',
    views: 6789,
    likes: 234,
    dislikes: 29,
    userRating: 'dislike',
    tags: ['tag3', 'tag5']
  },
  {
    id: 5,
    title: 'Post 6',
    author: 'user6',
    body: 'body6',
    uploadDate: '1/4/2024',
    views: 9876,
    likes: 345,
    dislikes: 76,
    userRating: 'like',
    tags: ['tag6', 'tag7']
  },
];

const SAMPLE_POSTS_2 = [
  {
    id: 6,
    title: 'Post 7',
    author: 'user7',
    body: 'body7',
    uploadDate: '1/5/2024',
    views: 5432,
    likes: 156,
    dislikes: 42,
    userRating: 'dislike',
    tags: ['tag8', 'tag9']
  },
  {
    id: 7,
    title: 'Post 8',
    author: 'user8',
    body: 'body8',
    uploadDate: '1/6/2024',
    views: 4321,
    likes: 67,
    dislikes: 10,
    userRating: 'like',
    tags: ['tag10', 'tag11']
  },
  {
    id: 8,
    title: 'Post 9',
    author: 'user9',
    body: 'body9',
    uploadDate: '1/7/2024',
    views: 7890,
    likes: 321,
    dislikes: 63,
    userRating: 'dislike',
    tags: ['tag12', 'tag13']
  },
  {
    id: 9,
    title: 'Post 10',
    author: 'user10',
    body: 'body10',
    uploadDate: '1/8/2024',
    views: 8765,
    likes: 432,
    dislikes: 87,
    userRating: 'like',
    tags: ['tag14', 'tag15']
  }
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
                {SAMPLE_POSTS_1.toSorted((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).map(p => 
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
                {SAMPLE_POSTS_2.toSorted((a, b) => b.likes - a.likes).map(p => 
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
