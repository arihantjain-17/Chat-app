import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Talky</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #1a1a2e;
  border-right: 1px solid #e94560;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;

    img {
      height: 2rem;
    }

    h3 {
      color: #e94560;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 0.1rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;
    padding: 1rem 0;

    &::-webkit-scrollbar {
      width: 0.4rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #e94560;
      border-radius: 0.2rem;
    }

    .contact {
      background-color: #16213e;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.5rem;
      padding: 0.6rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: background-color 0.3s ease, transform 0.3s ease;

      &:hover {
        background-color: #e94560;
        transform: scale(1.05);
      }

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
          border: 2px solid #e94560;
        }
      }

      .username {
        h3 {
          color: #f5f5f5;
        }
      }
    }

    .selected {
      background-color: #e94560;
      transform: scale(1.05);

      .username h3 {
        color: #1a1a2e;
      }
    }
  }

  .current-user {
    background-color: #0f3460;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid #e94560;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
        border: 2px solid #e94560;
      }
    }

    .username {
      h2 {
        color: #f5f5f5;
        font-size: 1.2rem;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username h2 {
        font-size: 1rem;
      }
    }
  }
`;

