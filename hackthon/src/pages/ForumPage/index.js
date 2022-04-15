import React from "react";
import { Get } from "../../services/Conection";
import Profile from "../../images/profile-icon-png-898.png";
import Plus from "../../images/plus.svg";
import Lixo from "../../images/lixo.svg";

import {
  ForumPageContainer,
  ForumContainer,
  InfosContainer,
  TopContentContainer,
  MainTextContainer,
  QuestionButton,
  BottomContainer,
  PostContainer,
  AvatarPostContainer,
  InfosPostContainer,
  NamePostContainer,
  QuestionPostContainer,
  AnswerPostContainer,
  MentoriaDate,
  MentoriaTitle,
  MentoriaPlus
} from "./styles";

export default function HomePage() {
  const [posts, setPosts] = React.useState([]);
  const [mentorias, setMentorias] = React.useState([]);

  async function loadPost() {
    try {
      const response = await Get('/forum');
      console.log(response.data)
      setPosts(response.data)
    } catch (error) {

    }
  }

  async function loadMentorias() {
    try {
      const response = await Get('/mentorias/marcadas/1');
      setMentorias(response.data)
    } catch (error) {
    }
  }


  React.useEffect(() => {
    loadMentorias()
    loadPost()
  }, [])

  return (
    <>
      <ForumPageContainer className="mainContent">
        <ForumContainer>
          <TopContentContainer>
            <MainTextContainer>
              <h1>Você tem alguma dúvida?</h1>
            </MainTextContainer>
            <QuestionButton>
              <p>Faça sua pergunta</p>
            </QuestionButton>
          </TopContentContainer>
          <BottomContainer>
            {posts.map((post) =>

            (
              <PostContainer PostContainer key={post.id} >
                <AvatarPostContainer>
                  <img src={post.avatar ? post.avatar : Profile} alt="avatar" />
                </AvatarPostContainer>
                <InfosPostContainer>
                  <NamePostContainer>
                    <p>{post.nome}</p>
                    <span>{post.habilidade}</span>
                  </NamePostContainer>
                  <QuestionPostContainer>
                    <p>
                      {post.pergunta}
                    </p>
                  </QuestionPostContainer>
                  <AnswerPostContainer>
                    <p>
                      Responder
                    </p>
                  </AnswerPostContainer>
                </InfosPostContainer>
              </PostContainer>
            )
            )
            }
          </BottomContainer>
        </ForumContainer>
        <InfosContainer>
          <MentoriaTitle>
            Mentorias Marcadas
          </MentoriaTitle>
          {mentorias.map((mentoria) => (
            <MentoriaDate key={mentoria.id}>
              <p>{new Date(mentoria.dia).getDate()}/{new Date(mentoria.dia).getMonth()}</p>
              <p>{mentoria.hora}<img src={Lixo} /></p>
            </MentoriaDate>

          ))}
          <MentoriaPlus>
            <span>Ver mais<img src={Plus} alt='+' /></span>
          </MentoriaPlus>
        </InfosContainer>

      </ForumPageContainer>
    </>
  );
}
