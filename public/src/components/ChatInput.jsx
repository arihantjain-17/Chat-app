import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #1a1a2e;
  padding: 0 2rem;
  border-top: 1px solid #e94560;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;

      svg {
        font-size: 1.8rem;
        color: #e94560;
        cursor: pointer;
        transition: transform 0.2s;

        &:hover {
          transform: scale(1.2);
        }
      }

      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #0f3460;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        border-color: #e94560;
        border-radius: 0.5rem;

        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #0f3460;
          width: 5px;

          &-thumb {
            background-color: #e94560;
            border-radius: 0.5rem;
          }
        }

        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #e94560;
        }

        .emoji-group:before {
          background-color: #0f3460;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #0f3460;
    border: 1px solid #e94560;

    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: #f5f5f5;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #e94560;
        color: #fff;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e94560;
      border: none;
      transition: background-color 0.2s, transform 0.2s;

      &:hover {
        background-color: #c13535;
        transform: scale(1.05);
      }

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1.2rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
