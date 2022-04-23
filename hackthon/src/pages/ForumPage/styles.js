import styled from "styled-components";

export const ForumPageContainer = styled.div`
  width: 100%;
  height: 92vh;
  display:flex;
  justify-content: end;

  .BottomImage {
    float: left;
    position: relative;
    top: -30vh;
    left: 5vw;
  }
`;

export const ForumContainer = styled.div`
  width:60%;
  margin-right:12px;
`
export const InfosContainer = styled.div`
  width:20%
`

export const TopContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainTextContainer = styled.div`
  width:100%;
  text-align: center;
  font-family: 'Calibri';
  font-style: normal;
  font-weight: 700;

  line-height: 44px;

  letter-spacing: -0.011em;

  color: #464646;
`;

export const QuestionButton = styled.div`
  font-family: 'Montserrat';
  cursor:pointer;
  width: 25%;
  padding:5px;
  display: flex;
  justify-content: center;
  background-color: #e8505b;
  color:#fff;
  border-radius: 30px;

p{
  margin:0px;
}
`

export const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin-top:40px
`;

export const PostContainer = styled.div`
  width:100%;
  background-color: rgba(232, 240, 240, 1);
  margin:3px 0px;
  border-radius: 11px;
  padding:10px;
  display:flex;
`

export const AvatarPostContainer = styled.div`
img{

  height: 70px;
  width: 70px;
  border-radius:50%;
  border: 1.5px solid #035757;
}
`

export const InfosPostContainer = styled.div`
  width:70%;
  margin-left:12px;
`
export const NamePostContainer = styled.div`
  display:flex; 
  font-family: 'Calibri';

  p{
    font-size:1rem;
    color: #000000;
    margin-bottom:0px;
    margin-right: 5px
  }
  span{
    color: rgba(0, 0, 0, 0.5)
  }
`

export const QuestionPostContainer = styled.div`
  font-family: 'Calibri';
  font-style: normal;
  font-size:0.9rem;
  color: #000000;
  p{
    margin;0
  }
`

export const AnswerPostContainer = styled.div`
  cursor:pointer;
  border: 1px solid rgba(3, 87, 87, 0.34);
  width:30%;
  text-align: center;
  border-radius:8px;

  p{
    font-size:0.7rem;
    color: rgba(154, 188, 188, 1);
    margin:0px;
  }
`
export const MentoriaTitle = styled.div`
text-align: center;
color: #035757;
`
export const MentoriaDate = styled.div`
display:flex;
width:100%;
justify-content:space-between;
color: rgba(3, 87, 87, 0.54);
img{
  margin-left:4px;
}
`
export const MentoriaPlus = styled.div`
text-align: end;
color: rgba(3, 87, 87, 0.54);
img{
  margin-left:4px;
}
`

