import { useSelector } from "~/redux/hooks";
import styled from "styled-components";

function Profile() {
  const { displayName, profilePicture, email } = useSelector(
    ({ user }) => user
  );
  return (
    <Wrapper>
      <h1>Profile</h1>
      <ProfileImage src={profilePicture} alt="Profile Image" />
      <p>{displayName}</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: rgba(0, 0, 0, 0.5);
  height: 400px;
  width: 400px;
  line-height: 2;
  font-size: 1.6em;
  font-weight: bold;

  h1 {
    text-decoration: underline;
    font-size: 1.6em;
    margin-bottom: 20px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 100%;
  height: 50px;
  width: 50px;
`;

export default Profile;
