import styled from "styled-components";
import { Modal } from "antd";

export const HomePageContainer = styled.div`
  width: 100%;
  height: 92vh;

  .BottomImage {
    float: left;
    position: relative;
    top: -30vh;
    left: 5vw;
  }

  h1,
  h2 {
    color: #fff;
  }
`;

export const GreenContentContainer = styled.div`
  width: 100%;
  min-height: 60%;
  display: flex;
  flex-flow: row nowrap;
  background-color: #035757;
`;

export const LeftStatementsContainer = styled.div`
  width: 50%;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-end;
  background-color: #035757;
  justify-content: center;
`;

export const MainTextContainer = styled.div`
  width: 50%;
  height: 40%;
  display: flex;
  background-color: #035757;
`;

export const SecondaryTextConytainer = styled.div`
  width: 50%;
  height: 40%;
  background-color: #035757;
`;

export const ImgContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-around;

  img {
    width: 40%;
  }
`;

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  align-content: flex-end;
`;

export const MenthorButton = styled.div`
  width: 25%;
  height: 8vh;
  display: flex;
  background-color: #e8505b;
  border-radius: 30px;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    color: #fff;
  }
`;

export const DoughtButton = styled.div`
  width: 25%;
  height: 8vh;
  display: flex;
  background-color: #e8505b;
  border-radius: 30px;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
    color: #fff;
  }
`;
