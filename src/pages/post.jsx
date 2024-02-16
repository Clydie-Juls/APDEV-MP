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
          userName={name}
        />
        <PostBody tags={post.tags} paragraph={post.body} />

        {/* Normal Comment */}
        <CommentBody
          posterId={poster.id}
          profile={"https://github.com/shadcn.png"}
          userName={poster.name}
          paragraph={"Test"}
          isReply={false}
          isOwner={false}
        />

        {/* Nested Comment */}
        <CommentBody
          profile={"https://github.com/shadcn.png"}
          nestedProfile={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxdV8cuxP4Q5cg_x2ofSk6thIgUUlxMnuqIM6z4OPSvl-k4GA6UUS6GM5JXP_cTU2FvQI&usqp=CAU"
          }
          userName={poster.name}
          nestedUserName={"Rick"}
          paragraph={"Nice"}
          nestedParagraph={"Nice"}
          isReply={true}
          isOwner={true}
        />

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
      </div>
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
    </AnimBackground>
  );
};

export default Post;
