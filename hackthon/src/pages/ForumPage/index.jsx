import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Lixo from "../../assets/lixo.svg";
import Plus from "../../assets/plus.svg";
import Profile from "../../assets/profile-icon-png-898.png";

import { Get } from "../../services/Conection";

import {
  AnswerPostContainer, AvatarPostContainer, BottomContainer, ForumContainer,
  ForumPageContainer, InfosContainer, InfosPostContainer, MainTextContainer, MentoriaDate,
  MentoriaPlus, MentoriaTitle, NamePostContainer, PostContainer, QuestionButton,
  QuestionPostContainer, TopContentContainer,
} from "./styles";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [mentorias, setMentorias] = useState([]);

  async function loadPost() {
    try {
      const response = await Get("/forum");
      setPosts(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function loadMentorias() {
    try {
      const response = await Get("/mentorias/marcadas/1");
      setMentorias(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    loadMentorias();
    loadPost();
  }, []);

  return (
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
          {posts.map((post) => (
            <PostContainer PostContainer key={post.id}>
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
          ))}
        </BottomContainer>
      </ForumContainer>
      <InfosContainer>
        <MentoriaTitle>
          Mentorias Marcadas
        </MentoriaTitle>
        {mentorias.map((mentoria) => (
          <MentoriaDate key={mentoria.id}>
            <p>
              {new Date(mentoria.dia).getDate()}
              /
              {new Date(mentoria.dia).getMonth()}
            </p>
            <p>
              {mentoria.hora}
              <img src={Lixo} alt="trash" />
            </p>
          </MentoriaDate>

        ))}
        <MentoriaPlus>
          <span>
            Ver mais
            <img src={Plus} alt="+" />
          </span>
        </MentoriaPlus>
      </InfosContainer>

    </ForumPageContainer>
  );
}
