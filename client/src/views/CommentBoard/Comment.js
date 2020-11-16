import React from "react";
import styled from "styled-components";
import "./Comment.css"
const emoji = require("emoji-dictionary");

const Outline = styled.div`
  
`;
// const thumbsUp = 2;
// const thumbsDown = 10;
const Comment = ({body, c, prof, likes,dislikes}) => {
  return (
    <Outline>
      <div>{body}</div>
      <div>
        {likes}
        <button>{emoji.getUnicode("+1")}</button>
        {dislikes}
        <button>{emoji.getUnicode("-1")}</button>
        <button>{emoji.getUnicode("triangular_flag_on_post")}</button>
      </div>
    </Outline>
  );
};
export default Comment;
