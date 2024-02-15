import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import ButtonTag from "./buttonTag";

const TagInput = () => {
  let [tags, setTags] = useState([]);
  let [input, setInput] = useState("");

  function addTag(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (input.length > 0) {
        const newTags = [...tags, input];
        setTags(newTags);
        setInput("");
      }
    }
  }

  function removeTag(e, i) {
    e.preventDefault();
    const newTag = tags.filter((tag, index) => i !== index);
    setTags(newTag);
  }

  return (
    <div>
      <div className=" flex gap-2">
        {tags.map((tag, i) => (
          <ButtonTag
            clickFunction={(e) => removeTag(e, i)}
            key={`Tag-button-${i}`}
          >
            {tag}
          </ButtonTag>
        ))}
      </div>
      <Input
        className="bg-black"
        id="tags"
        placeholder="Enter tag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
      />
    </div>
  );
};

export default TagInput;
