import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { PlusSquare } from "lucide-react";
import { useParams } from "react-router";
import { TempComments } from "@/lib/placeholder/mockReq";

const CommentsPage = ({ isWriteComment, isReply }) => {
  const { id } = useParams();

  const commentToEdit = TempComments.getFromId(Number(id));

  // Previous message as a draft
  const previousMessage =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <Card className="w-full h-full" style={{ border: "none" }}>
      <CardHeader className="flex  flex-row justify-between">
        <div style={{ flex: "0.5" }}>
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft />
          </Button>
        </div>
        <div style={{ flex: "2.5" }}>
          <CardTitle className="text-4xl">
            {isReply
              ? "Reply"
              : isWriteComment
              ? "Add a Comment"
              : "Edit Comment"}
          </CardTitle>
        </div>
        <div style={{ flex: "7", justifyContent: "flex-end", display: "flex" }}>
          <Button
            variant="ghost"
            style={{ border: "none", color: "#5E51FF", fontSize: "1.5rem" }}
          >
            Post
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4 mb-4">
            <div className="flex flex-col gap-3">
              <hr
                style={{
                  width: "100%",
                  height: "2px",
                  backgroundColor: "white",
                  border: "none",
                }}
              />
              <textarea
                id="comment"
                placeholder="Write your comment here"
                rows={29}
                defaultValue={
                  isReply ? "" : isWriteComment ? "" : previousMessage
                }
                value={isWriteComment ? "" : commentToEdit.body}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "10px",
                  padding: "15px",
                  marginTop: "40px",
                  marginLeft: "40px",
                  marginRight: "40px",
                }}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <hr
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "gray",
          border: "none",
        }}
      />
      <Button variant="ghost" style={{ border: "none", padding: "3rem" }}>
        <PlusSquare style={{ width: "3rem", height: "3rem" }} />
      </Button>
    </Card>
  );
};

export default CommentsPage;
