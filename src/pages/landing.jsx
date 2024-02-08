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
