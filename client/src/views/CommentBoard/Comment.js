import React from "react";
import styled from "styled-components";
import "./Comment.css"
const emoji = require("emoji-dictionary");

const Outline = styled.div`
  height: 100px;
  width: 500px;

  background: #f9f9f9;
  padding: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px black;
  position: relative;
  transition: transform 0.2s; /* Animation */
  font-size: 12px;
`;
// const thumbsUp = 2;
// const thumbsDown = 10;
const Comment = ({body, c, prof, likes,dislikes}) => {
  return (
    <Outline>
      <div>{body}</div>
      <div>
        {likes}
        <button class="reaction">{emoji.getUnicode("+1")}</button>
        {dislikes}
        <button class="reaction">{emoji.getUnicode("-1")}</button>
        <button class="reaction">{emoji.getUnicode("triangular_flag_on_post")}</button>
      </div>
    </Outline>
  );
};
export default Comment;