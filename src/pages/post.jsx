import Header from "@/components/custom/header";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AnimBackground from "@/components/custom/animBackground";
import PostBody from "@/components/custom/postBody";
import CommentBody from "@/components/custom/commentBody";
import PostHeader from "@/components/custom/postHeader";
import { Account } from "@/lib/Account";
import { useParams } from "react-router";

const Post = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [whatToDelete, setWhatToDelete] = useState();
  const [account, setAccount] = useState(null);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [poster, setPoster] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`/api/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const postData = await response.json();
        setPost(postData);

        const posterInfo = await fetchUserById(postData.post.posterId);
        setPoster(posterInfo);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchCommentsData = async () => {
      try {
        const response = await fetch(`/api/posts/${id}/comments`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const commentsData = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const checkLoginStatus = async () => {
      const isLoggedIn = await Account.isLoggedIn();
      if (!isLoggedIn) {
        setAccount(null);
        return;
      }

      const accountDetails = await Account.getDetails();
      setAccount(accountDetails);
    };

    fetchPostData();
    fetchCommentsData();
    checkLoginStatus();
  }, [id]);

  const fetchUserById = async (userId) => {
    try {
      console.log('Fetching user with ID:', userId);
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const userData = await response.json();
      console.log('User fetched successfully:', userData); 
      return userData;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };  

  const handleDelete = async () => {
    await fetch(`/api/posts/${id}`, {
      method: "delete",
    });
    setConfirmDelete(false);
    location.replace("/");
  };


  return (
    <AnimBackground className="h-screen bg-background flex flex-col">
      <Header />

      <div className="px-16 py-5">
        {post && poster && (
          <>
            <PostHeader
              title={post.post.title}
              profile={poster.user.picture}
              userName={poster.user.username}
            />
            <PostBody 
              id={post.post._id} 
              tags={post.post.tags} 
              paragraph={post.post.body} 
              likes={post.post.reactions.likerIds.length}
              dislikes={post.post.reactions.dislikerIds.length}
              onDeleteButtonClick={() => {
                setConfirmDelete(true);
                setWhatToDelete("post");
              }}
            />

            {comments.map((comment) => {
              const isReply = comment.commentRepliedToId;
              if (isReply) {
                return (
                  <CommentBody
                    id={comment._id}
                    key={comment._id}
                    postId={comment.postId}
                    posterId={comment.commenterId._id}
                    profile={comment.commenterId.picture}
                    userName={comment.commenterId.username}
                    paragraph={comment.body}
                    isOwner={comment.commenterId === account?._id}
                    isReply={isReply}
                    onDeleteBtnClick={() => {
                      setConfirmDelete(true);
                      setWhatToDelete("comment");
                    }}
                    nestedUserName={
                      comment.commentRepliedToId.commenterId.username
                    }
                    nestedProfile={
                      comment.commentRepliedToId.commenterId.picture
                    }
                    nestedParagraph={comment.commentRepliedToId.body}
                  />
                );
              } else {
                return (
                  <CommentBody
                    id={comment._id}
                    key={comment._id}
                    postId={comment.postId}
                    posterId={comment.commenterId._id}
                    profile={comment.commenterId.picture}
                    userName={comment.commenterId.username}
                    paragraph={comment.body}
                    isOwner={comment.commenterId._id === account?._id}
                    isReply={isReply}
                    onDeleteBtnClick={() => {
                      setConfirmDelete(true);
                      setWhatToDelete("comment");
                    }}
                  />
                );
              }
            })}
          </>
        )}

        {/* Confirmation prompt */}
        {confirmDelete && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-black text-white border border-border p-8 rounded-lg">
              <p className="text-lg font-bold mb-4">Confirm Deletion</p>
              <p className="mb-4">
                Are you sure you want to delete this {whatToDelete}?
              </p>
              <div className="flex justify-between">
                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                <Button onClick={handleDelete} variant="destructive">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              {/* Make shown posts link based (item no. as param). */}
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AnimBackground>
  );
};

export default Post;
