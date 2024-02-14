import React from "react";
import { Badge } from "../ui/badge";

const ButtonTag = ({ children }) => {
  return (
    <div>
      <Badge>
        <button className=" bg-transparent border-transparent m-0 p-2">
          x
        </button>
        #{children}
      </Badge>
    </div>
  );
};

export default ButtonTag;
