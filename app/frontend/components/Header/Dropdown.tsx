import { useState, useRef } from "react";
import { Link, redirect } from "react-router-dom";
import styled from "styled-components";

import useAuth from "~/auth/useAuth";
import useOnClickOutside from "~/hooks/useOnClickOutside";

export default function Dropdown() {
  const {
    userData: { displayName, profilePicture },
    signOut,
  } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownButton = useRef<HTMLButtonElement>(null);
  const dropdownMenu = useRef<HTMLDivElement>(null);

  const signOutRedirect = () => {
    signOut();
    redirect("/");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useOnClickOutside(dropdownButton, () => setIsOpen(false), {
    exceptions: [dropdownMenu],
  });

  return (
    <Wrapper>
      <button onClick={toggleDropdown} ref={dropdownButton}>
        <ProfileImage src={profilePicture} alt="Profile Image" />
      </button>
      {isOpen && (
        <DropdownMenu ref={dropdownMenu}>
          <h4>{displayName}</h4>
          <Seperator />
          <Link to="/profile">View Profile</Link>
          <button onClick={signOutRedirect}>Sign Out</button>
        </DropdownMenu>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  button,
  a {
    cursor: pointer;
  }
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  color: black;
  margin-top: 5px;
  background-color: white;
  width: 230px;
  box-shadow: 0px 8px 16px 0px var(--dark-shadow);
  padding: 15px 16px;
  z-index: 1;

  h4 {
    font-weight: bold;
  }

  button {
    align-self: flex-end;
    color: var(--light-blue);
    margin-top: 40px;
  }
`;

const Seperator = styled.div`
  width: 100%;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
  align-self: center;
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 50px;
  width: 50px;
`;
