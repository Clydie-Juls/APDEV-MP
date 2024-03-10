import { useEffect, useState } from 'react';
import { useParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AnimBackground from "@/components/custom/animBackground";
import CardList from "@/components/custom/cardList";
import Header from "@/components/custom/header";
import PostCard from "@/components/custom/postCard";
import CommentCard from "@/components/custom/commentCard";
import ProfileSide from "@/components/custom/profileSide";

const User = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({
    user: {
      name: '',
      description: '',
      picture: null,
    },
    posts: [],
    comments: []
  });

  useEffect(() => {
    if (!id) {
      location.replace('/');
      return;
    }

    const fetchData = async () => {
      const response = await fetch(`/api/users/${id}`);

      if (response.status === 404) {
        setUserInfo(null);
        return;
      }

      setUserInfo(await response.json());
    };

    fetchData();
  }, [id]);

  async function handleDeleteButtonClick() {
    await fetch(`/api/users/${id}`, {
      method: 'delete'
    });
    
    location.replace('/');
  }

  function handleDescriptionInput(newDescription) {
    setUserInfo(ui => ({
      ...ui,
      user: {
        ...ui.user,
        description: newDescription
      }
    }));
  }

  async function handleDescriptionSet(newDescription) {
    await fetch('/api/account/edit', {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: newDescription
      })
    })
  }

  return (
    <AnimBackground>
      <div className="w-full h-full grid grid-rows-[auto_1fr] min-h-screen">
        <Header />

        {userInfo === null ? 
          <main className="px-16 py-5 flex justify-center items-center">
            <p className="text-3xl">The user does not exist.</p>
          </main>
        :
          <main className="px-16 py-5 grid grid-cols-[auto_1fr] gap-5">
            <ProfileSide
              name={userInfo.user.username}
              description={userInfo.user.description}
              picture={userInfo.user.picture}
              onDeleteButtonClick={handleDeleteButtonClick}
              onDescriptionInput={handleDescriptionInput}
              onDescriptionSet={handleDescriptionSet}
            />

            <Tabs defaultValue="posts">
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-3">
                <CardList>
                  {userInfo.posts.map((p) => (
                    <PostCard key={p._id} {...p} />
                  ))}
                </CardList>
              </TabsContent>

              <TabsContent value="comments">
                <CardList>
                  {userInfo.comments.map((c) => (
                    <CommentCard key={c._id} {...c} />
                  ))}
                </CardList>
              </TabsContent>
            </Tabs>
          </main>
        }        
      </div>
    </AnimBackground>
  );
};

export default User;
