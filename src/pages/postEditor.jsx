import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TagInput from "@/components/custom/tagInput";
import { useParams } from "react-router";
import { TempPosts } from "@/lib/placeholder/mockReq";
import { useRef, useState } from 'react';

const PostEditor = ({ isWritePost }) => {
  const params = useParams();

  const id = isWritePost ? params : null;
  const postToEdit = TempPosts.getFromId(Number(id));

  const formRef = useRef();
  const [tags, setTags] = useState(isWritePost ? ["Technology", "Programming"] : postToEdit.tags);

  function handleTagsChange(newTags) {
    setTags(newTags);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formElem = formRef.current;
    
    const formBody = new FormData(formElem);
    tags.forEach(t => formBody.append('tags[]', t));

    // TODO: For editing posts
    const postUrl = await fetch('/api/writepost', {
      method: 'post',
      body: formBody
    });

    location.replace(await postUrl.text());
  }

  return (
    <div className="w-screen h-screen px-6 py-10 flex flex-col gap-6 items-center overflow-x-hidden">
      <img
        className=" w-full h-full object-cover fixed -z-10 brightness-[0.15]"
        src="/images/star-bg.png"
        alt="cube background image"
      />
      <div className="flex flex-col gap-4 w-full sticky top-0 bg-black">
        <h1 className=" text-4xl font-bold">
          {isWritePost ? "Write A Post" : "Edit your Post"}
        </h1>
        <p className="text-muted-foreground">
          Share your tech-tacular post that peaks the community`s interest
        </p>
        <Separator />
      </div>
      <form ref={formRef} className="w-full">
        <div className="flex flex-col gap-8 items-center px-[20%] w-full ">
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="title">Title</Label>
            {isWritePost ? (
              <Input
                className="bg-black"
                id="title"
                name="title"
                placeholder="Bro Richie Finally Created GPT 5.0"
              />
            ) : (
              <Input className="bg-black" id="title" name="title" value={postToEdit.title} />
            )}

            <p className="text-sm text-muted-foreground">
              Write an eye-catching title that turns eyeballs into clickbait
              magnets.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Label htmlFor="tags">Tags</Label>
            <TagInput tags={tags} onChange={handleTagsChange} />
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
                name="body"
              />
            ) : (
              <Textarea
                className="bg-black"
                id="description"
                name="body"
                value={postToEdit.body}
              />
            )}

            <p className="text-sm text-muted-foreground">
              Introduce your thoughts by writing your description about the
              topic.
            </p>
          </div>

          <Button className="px-9" onClick={handleFormSubmit}>Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default PostEditor;
