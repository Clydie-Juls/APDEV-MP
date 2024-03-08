import React from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { TempComments } from "@/lib/placeholder/mockReq";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const CommentsPage = ({ isWriteComment, isReply }) => {
  const { id } = useParams();

  const commentToEdit = TempComments.getFromId(Number(id));

  return (
    <div className="w-screen h-screen px-6 py-10 flex flex-col gap-6 items-center overflow-x-hidden">
      <img
        className=" w-full h-full object-cover fixed -z-10 brightness-[0.15]"
        src="/images/star-bg.png"
        alt="cube background image"
      />
      <div className="flex flex-col gap-4 w-full sticky top-0 bg-black">
        <h1 className=" text-4xl font-bold">
          {isReply ? "Reply" : (isWriteComment ? "Add a Comment" : "Edit Comment")}
        </h1>
        <p className="text-muted-foreground">
          Share your insightful comment that peaks the community`s interest
        </p>
        <Separator />
      </div>
      <form className="w-full">
        <div className="flex flex-col gap-8 items-center px-[10%] w-full ">
          <div className="flex flex-col gap-3 w-full py-8">
            <Label htmlFor="description" className=" text-2xl">
              Comment
            </Label>
            {isWriteComment ? (
              <Textarea
                className="bg-black"
                placeholder="Type your message here."
                id="description"
              />
            ) : (
              <Textarea
                className="bg-black min-h-[500px]"
                id="description"
                value={commentToEdit.body}
              />
            )}

            <p className="text-sm text-muted-foreground">
              Share your insights or feedback by writing a comment on the topic.
            </p>
          </div>

          <Button className="px-9">
            <a href="/post">Submit</a>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentsPage;