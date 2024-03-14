import React from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router";
import { TempComments } from "@/lib/placeholder/mockReq";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const CommentsPage = ({ isWriteComment, isReply }) => {
  const { id } = useParams();
  const [comment, setComment] = useState(null);
  const [formData, setFormData] = useState({
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      console.log("Form Data:", updatedData);
      return updatedData;
    });
  };

  console.log(id);
  useEffect(() => {
    const fetchCommentData = async () => {
      try {
        const response = await fetch(`/api/comments/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const commentData = await response.json();
        setComment(commentData);
        setFormData({
          body: commentData.body,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (!isWriteComment) {
      fetchCommentData();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isWriteComment) {
        const response = await fetch("/api/comments/write", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Might make id to be the id of the poster or idk
          body: JSON.stringify({
            body: e.target.body.innerHTML,
            postId: id,
          }),
        });

        console.log("Response:", response);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Login failed");
        }
      } else {
        console.log("Youp");
        const response = await fetch(`/api/comments/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ body: e.target.body.innerHTML }),
        });

        console.log("Response:", response);

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Login failed");
        }
      }
      console.warn("Yes");
      window.location.replace("/");
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message || "Error logging in. Please try again.");
    }
  };

  return (
    <div className="w-screen h-screen px-6 py-10 flex flex-col gap-6 items-center overflow-x-hidden">
      <img
        className=" w-full h-full object-cover fixed -z-10 brightness-[0.15]"
        src="/images/star-bg.png"
        alt="cube background image"
      />
      <div className="flex flex-col gap-4 w-full sticky top-0 bg-black">
        <h1 className=" text-4xl font-bold">
          {isReply
            ? "Reply"
            : isWriteComment
            ? "Add a Comment"
            : "Edit Comment"}
        </h1>
        <p className="text-muted-foreground">
          Share your insightful comment that peaks the community`s interest
        </p>
        <Separator />
      </div>
      <form
        className="w-full"
        method={isWriteComment ? "POST" : "PUT"}
        onSubmit={handleSubmit}
        ac
      >
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
                required
              />
            ) : (
              <Textarea
                className="bg-black min-h-[500px]"
                id="description"
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
              />
            )}

            <p className="text-sm text-muted-foreground">
              Share your insights or feedback by writing a comment on the topic.
            </p>
          </div>

          <Button className="px-9">{isWriteComment ? "Submit" : "Edit"}</Button>
        </div>
      </form>
    </div>
  );
};

export default CommentsPage;
