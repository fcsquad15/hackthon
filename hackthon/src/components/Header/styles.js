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

export const BellContainer = styled.div`
cursor:pointer;
position: relative;
`

export const NotificationContainer = styled.div`
width:30vw;
position: absolute;
    top: 50px;
    right:50px;
    z-index: 1;
`
export const Notification = styled.div`
  background-color: rgba(232, 240, 240, .8);
  border-radius: 8px;
  border-bottom: 1px solid rgba(232, 240, 240, 1);
  padding:5px;
`
