import React from "react";
import { useState } from "react";
import { Input } from "../ui/input";
import ButtonTag from "./buttonTag";

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  function addTag(e) {
    if (e.keyCode === 13 && input.length > 0) {
      setTags([...tags, input]);
      setInput("");
    }
  }

  function removeTag(i) {
    const newTag = tags.filter((tag, index) => i !== index);
    setTags(newTag);
  }

  return (
    <div>
      <div className=" flex gap-2 py-4">
        {tags.map((tag, i) => (
          <ButtonTag clickFunction={() => removeTag(i)} key={`Tag-button-${i}`}>
            {tag}
          </ButtonTag>
        ))}
      </div>
      <Input
        className="bg-black"
        id="title"
        placeholder="Bro Richie Finally Created GPT 5.0"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
      />
    </div>
  );
};

export default TagInput;
