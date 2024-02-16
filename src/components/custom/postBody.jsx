import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Tag from "@/components/custom/tag";
import { MessageCircle, Send, MoreVertical } from "lucide-react";
import RateButtons from "@/components/custom/rateButtons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const PostBody = ({ id, numComments, tags, paragraph, onDeleteButtonClick }) => {
  return (
    <Card className="mb-14">
      <CardHeader className="space-y-0 flex flex-row gap-6">
        <div className="flex gap-2">
          {tags && tags.map((tag, i) => <Tag key={`${tag}-${i}`} name={tag} />)}
        </div>

        <div className="flex gap-2">
          <MessageCircle style={{ width: "1.5rem", height: "1.5rem" }} />
          <span>{numComments}</span>
        </div>
      </CardHeader>

      <CardContent>
        <form>
          <div className="grid w-full items-center">
            <div className="flex flex-col">{paragraph}</div>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-start gap-5">
        <RateButtons likes={50} dislikes={10} horizontal />
        <div>
          <Button
            variant="ghost"
            style={{ width: "180px" }}
            onClick={() => window.location.replace("/writecomment")}
          >
            <Send style={{ width: "1.5rem", height: "1.5rem" }} />
            <a href="/writecomment">Add a comment</a>
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger variant="ghost">
              <MoreVertical style={{ width: "1.5rem", height: "1.5rem" }} />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => window.location.replace(`/editpost/${id}`)}
              >
                Edit post
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDeleteButtonClick}>
                Delete post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostBody;
