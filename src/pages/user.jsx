import { useParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AnimBackground from "@/components/custom/animBackground";
import CardList from "@/components/custom/cardList";
import Header from "@/components/custom/header";
import PostCard from "@/components/custom/postCard";
import CommentCard from "@/components/custom/commentCard";
import ProfileSide from "@/components/custom/profileSide";

import { TempPosts, TempUsers } from "@/lib/placeholder/mockReq";

const User = () => {
  const { id } = useParams();

  // TODO: Replace with server requests
  const { name, description, picture } = TempUsers.getInfoFromId(Number(id));

  const posts = TempUsers.getPostsFromId(Number(id));
  const comments = TempUsers.getCommentsFromId(Number(id));

  return (
    <AnimBackground>
      <div className="w-full h-full grid grid-rows-[auto_1fr] min-h-screen">
        <Header />

        <main className="px-16 py-5 grid grid-cols-[auto_1fr] gap-5">
          <ProfileSide
            name={name}
            description={description}
            picture={picture}
          />

          <Tabs defaultValue="posts">
            <TabsList>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-3">
              <CardList>
                {posts.map((p) => (
                  <PostCard
                    id={p.id}
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

            <TabsContent value="comments">
              <CardList>
                {comments.map((c) => (
                  <CommentCard
                    key={c.id}
                    postTitle={TempPosts.getFromId(c.postId).title}
                    postTags={TempPosts.getFromId(c.postId).tags}
                    body={c.body}
                    uploadDate={c.uploadDate}
                    likes={c.likerIds.length}
                    dislikes={c.dislikerIds.length}
                    userRating={c.likerIds.includes(0) ? "like" : "dislike"}
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

export default User;
