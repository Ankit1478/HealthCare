import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AppbarContainer = styled.div`
  border-bottom: 1px solid #e0f2f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #e0f7fa;
  @media (min-width: 768px) {
    padding: 16px 64px;
  }
`;

const LogoLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: bold;
  color: #00796b;
  text-decoration: none;
  &:hover {
    color: #388e3c;
  }
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  @media (min-width: 768px) {
    gap: 32px;
  }
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  padding: 8px 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #00796b;
  border-radius: 8px;
  text-decoration: none;
  &:hover {
    background-color: #004d40;
  }
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  color: #00796b;
  cursor: pointer;
  &:hover {
    color: #388e3c;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #e0f7fa;
  border: 1px solid #e0f2f1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 50;
  width: 160px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AvatarContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #b2dfdb;
  color: #00796b;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: medium;
  &:hover {
    background-color: #ffffff;
  }
`;

export const Appbar = () => {
    const userToken = localStorage.getItem("token");

    return (
        <AppbarContainer>
            <LogoLink to="/">HealthCare</LogoLink>
            <NavLinksContainer>
                {userToken ? (
                    <>
                        <div className="hidden md:flex gap-4">
                            <Link to="/profile">
                                <ProfileButton>Profile</ProfileButton>
                            </Link>
                            <Link to="/history">
                                <ProfileButton>Chat</ProfileButton>
                            </Link>
                        </div>
                        <ProfileBox />
                    </>
                ) : (
                    <ButtonLink to="/signin">Sign In</ButtonLink>
                )}
            </NavLinksContainer>
        </AppbarContainer>
    );
};

function ProfileBox() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const logout = () => {
        localStorage.clear();
        navigate("/");
        window.location.reload();
    };


    return (
        <AvatarContainer onClick={() => setShow(!show)}>
            <Avatar />
            {show && (
                <ProfileMenu>
                    <div
                        className="block md:hidden cursor-pointer"
                        onClick={() => navigate("/profile")}
                    >
                        Profile
                    </div>
                    <div
                        className="block md:hidden cursor-pointer"
                        onClick={() => navigate("/history")}
                    >
                        Chat Summary
                    </div>
                    <div onClick={logout} className="cursor-pointer">
                        Logout
                    </div>
                </ProfileMenu>
            )}
        </AvatarContainer>
    );
}

function Avatar({ }) {
    return (
        <AvatarCircle>
            U
        </AvatarCircle>
    );
}

