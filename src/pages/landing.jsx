import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AnimBackground from "@/components/custom/animBackground";
import CardList from "@/components/custom/cardList";
import Header from "@/components/custom/header";
import PostCard from "@/components/custom/postCard";

import { TempUsers } from "@/lib/placeholder/mockReq";
import { Posts } from "@/lib/placeholder/posts";

const Landing = () => {
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
              <CardList>
                {Posts.toSorted(
                  (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
                ).map((p) => (
                  <PostCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    author={TempUsers.getInfoFromId(p.posterId).name}
                    body={p.body}
                    uploadDate={p.uploadDate}
                    views={p.views}
                    likes={p.likerIds.length}
                    dislikes={p.dislikerIds.length}
                    userRating={p.likerIds.includes(0) ? "like" : "dislike"}
                    tags={p.tags}
                  />
                ))}
              </CardList>
            </TabsContent>

            <TabsContent value="popular">
              <CardList>
                {Posts.toSorted(
                  (a, b) => b.likerIds.length - a.likerIds.length
                ).map((p) => (
                  <PostCard
                    key={p.id}
                    title={p.title}
                    author={TempUsers.getInfoFromId(p.posterId).name}
                    body={p.body}
                    uploadDate={p.uploadDate}
                    views={p.views}
                    likes={p.likerIds.length}
                    dislikes={p.dislikerIds.length}
                    userRating={p.likerIds.includes(0) ? "like" : "dislike"}
                    tags={p.tags}
                  />
                ))}
              </CardList>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </AnimBackground>
  );
};

export default Landing;
