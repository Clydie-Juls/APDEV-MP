import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TagInput from "@/components/custom/tagInput";
import { useParams } from 'react-router';
import { TempPosts } from '@/lib/placeholder/mockReq';

const PostEditor = ({ isWritePost }) => {
  const { id } = useParams();

  const postToEdit = TempPosts.getFromId(Number(id));
  
  return (
    <div className="w-screen h-screen px-6 py-10 flex flex-col gap-6 items-center overflow-x-hidden">
      <img
        className=" w-full h-full object-cover fixed -z-10 brightness-[0.15]"
        src="/images/star-bg.png"
        alt="cube background image"
      />
      <div className="flex flex-col gap-4 w-full">
        <h1 className=" text-4xl font-bold">
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
            {isWritePost ? (
              <Input
                className="bg-black"
                id="title"
                placeholder="Bro Richie Finally Created GPT 5.0"
              />
            ) : (
              <Input
                className="bg-black"
                id="title"
                value={postToEdit.title}
              />
            )}

            <p className="text-sm text-muted-foreground">
              Write an eye-catching title that turns eyeballs into clickbait
              magnets.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="tags">Tags</Label>
            <TagInput
              initTags={isWritePost ? postToEdit.tags : ["Technology", "Programming"]}
            />
            <p className="text-sm text-muted-foreground">
              Add some tags to let people know what your post is about.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="description">Description</Label>
            {isWritePost ? (
              <Textarea
                className="bg-black"
                placeholder="Type your message here."
                id="description"
              />
            ) : (
              <Textarea
                className="bg-black"
                id="description"
                value={postToEdit.body}
              />
            )}

            <p className="text-sm text-muted-foreground">
              Introduce your thoughts by writing your description about the
              topic.
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

export default PostEditor;
