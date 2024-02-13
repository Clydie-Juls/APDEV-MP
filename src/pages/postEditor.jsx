import React from "react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PostEditor = ({ isWritePost }) => {
  return (
    <div className="w-screen h-screen px-9 py-16 flex flex-col gap-6 items-center overflow-x-hidden">
      <img
        className=" w-full h-full object-cover fixed -z-10 brightness-[0.15]"
        src="/images/star-bg.png"
        alt="cube background image"
      />
      <div className="flex flex-col gap-4 w-full">
        <h1 className=" text-5xl font-semibold">
          {isWritePost ? "Write A Post" : "Edit your Post"}
        </h1>
        <p className="text-muted-foreground">
          Share your tech-tacular post that peaks the community`s interest
        </p>
        <Separator />
      </div>
      <form className="w-full">
        <div className="flex flex-col gap-8 items-center px-[20%] w-full ">
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              className="bg-black"
              id="title"
              placeholder="Bro Richie Finally Created GPT 5.0"
            />
            <p className="text-sm text-muted-foreground">
              Write an eye-catching title that turns eyeballs into clickbait
              magnets.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="tags">Tags</Label>
            <Input className="bg-black" id="tags" placeholder="shadcn" />
            <p className="text-sm text-muted-foreground">
              Add some tags to let people know what your post is about.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="bg-black"
              placeholder="Type your message here."
              id="description"
            />
            <p className="text-sm text-muted-foreground">
              Introduce your thoughts by writing your description about the
              topic.
            </p>
          </div>
          <Button className="px-9">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
