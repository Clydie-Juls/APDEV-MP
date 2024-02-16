import Header from "@/components/custom/header";
import { useState } from "react";
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
import { TempUsers, TempPosts, TempComments } from "@/lib/placeholder/mockReq";
import { useParams } from "react-router";

const Post = () => {
  // State to manage deletion confirmation
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { id } = useParams();
  const handleDelete = () => {
    console.log("Delete logic goes here");
    // Reset confirmDelete state
    setConfirmDelete(false);
  };

  const post = TempPosts.getFromId(Number(id));
  const poster = TempUsers.getInfoFromId(Number(post.posterId));
  const comments = TempComments.getCommentsFromPost(Number(post.id));

  return (
    <AnimBackground className="h-screen bg-background flex flex-col">
      <Header />

      <div className="px-16 py-5">
        <PostHeader
          title={post.title}
          profile={poster.picture}
          userName={poster.name}
        />
        <PostBody id={post.id} tags={post.tags} paragraph={post.body} />

        {comments.map((c) => {
          const commenter = TempUsers.getInfoFromId(c.commenterId);
          const isReply = c.commentRepliedToId !== null;

          if (isReply) {
            const commentRepliedTo = TempComments.getFromId(
              c.commentRepliedToId
            );
            const commentRepliedToCommenter = TempUsers.getInfoFromId(
              commentRepliedTo.commenterId
            );

            return (
              <CommentBody
                key={c.id}
                posterId={c.commenterId}
                profile={commenter.picture}
                userName={commenter.name}
                paragraph={c.body}
                isOwner={c.commenterId === 0}
                isReply={isReply}
                nestedUserName={commentRepliedToCommenter.name}
                nestedProfile={commentRepliedToCommenter.picture}
                nestedParagraph={commentRepliedTo.body}
              />
            );
          } else {
            return (
              <CommentBody
                key={c.id}
                posterId={c.commenterId}
                profile={commenter.picture}
                userName={commenter.name}
                paragraph={c.body}
                isOwner={c.commenterId === 0}
                isReply={isReply}
              />
            );
          }
        })}

        {/* Confirmation prompt */}
        {confirmDelete && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
            <div className="bg-black text-white border border-white p-8 rounded-lg">
              <p className="text-lg font-bold mb-4">Confirm Deletion</p>
              <p className="mb-4">
                Are you sure you want to delete this post/comment?
              </p>
              <div className="flex justify-between">
                <Button
                  onClick={() => setConfirmDelete(false)}
                  variant="danger"
                >
                  Cancel
                </Button>
                <Button onClick={handleDelete} variant="danger">
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
