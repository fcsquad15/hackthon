import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;

export const LogoContainer = styled.div`
  display: flex;

  p {
    display: flex;
    font-weight: 600;
    color: #000;
    font-size: 2rem;
    margin-bottom: 0;
  }
`;
export const InputContainer = styled.div`
  width: 45%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;

  p {
    margin-bottom: 0;
    font-weight: 1000;
    font-size: 1.3rem;
  }
`;

export const ProfileContainer = styled.div`
img{
  height: 50px;
  width: 50px;
  border-radius:50%;
  border: 1.5px solid #035757;
}
`;
