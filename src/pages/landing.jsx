import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimBackground from "@/components/custom/animBackground";
import CardList from "@/components/custom/cardList";
import Header from "@/components/custom/header";
import PostCard from "@/components/custom/postCard";
import PostCardSkeleton from '@/components/custom/postCardSkeleton';

const Landing = () => {
  const [recentPosts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);

  const fetchRecentPosts = async () => {
    try {
      const response = await fetch('/api/posts/recent');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const fetchPopularPosts = async () => {
    try {
      const response = await fetch('/api/posts/popular');
      if (!response.ok) {
        throw new Error('Failed to fetch popular posts');
      }
      const data = await response.json();
      setPopularPosts(data);
      setLoadingPopular(false);
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      setLoadingPopular(false);
    }
  };

  useEffect(() => {
    fetchRecentPosts();
    fetchPopularPosts();
  }, []);

  return (
    <AnimBackground>
      <div className="w-full h-full bg-background">
        <Header />
        <main>
          <Tabs defaultValue="recent" className="px-16 py-5 mt-2">
            <div className="mb-4 flex justify-between">
              <div className="flex items-center gap-3">
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                </TabsList>
                <h2 className="text-3xl font-bold">Posts</h2>
              </div>
              <Button asChild>
                <a href="/writePost">Create a Post</a>
              </Button>
            </div>
            <TabsContent value="recent">
              <CardList displayCount={6}>
                {loading ? (
                  recentPosts.map(post => (
                    <PostCardSkeleton key={post._id} />
                  ))
                ) : (
                  recentPosts.map(post => (
                    <PostCard
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      author={post.author}
                      body={post.body}
                      uploadDate={post.uploadDate}
                      views={post.views}
                      likes={post.likes}
                      dislikes={post.dislikes}
                      userRating={post.userRating}
                      tags={post.tags}
                    />
                  ))
                )}
              </CardList>
            </TabsContent>
            <TabsContent value="popular">
              <CardList displayCount={6}>
                {loadingPopular ? (
                  popularPosts.map(post => (
                    <PostCardSkeleton key={post._id} />
                  ))
                ) : (
                  popularPosts.map(post => (
                    <PostCard
                      key={post._id}
                      id={post._id}
                      title={post.title}
                      author={post.author}
                      body={post.body}
                      uploadDate={post.uploadDate}
                      views={post.views}
                      likes={post.likes}
                      dislikes={post.dislikes}
                      userRating={post.userRating}
                      tags={post.tags}
                    />
                  ))
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
