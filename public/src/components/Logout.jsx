import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
padding: 0.6rem;
border-radius: 0.5rem;
background-color: #e94560;
border: none;
cursor: pointer;
transition: background-color 0.3s ease, transform 0.3s ease;

svg {
  font-size: 1.5rem;
  color: #ffffff;
}

&:hover {
  background-color: #d6305f;
  transform: scale(1.1);
}

&:active {
  transform: scale(0.95);
}
`;

