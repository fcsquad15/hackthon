import React from "react";

import girl from '../../images/girl.svg'

import { 

    LeftStatementsContainer,
    HomePageContainer,
    GreenContentContainer,
    BottomContainer,
    SecondaryTextConytainer,
    MainTextContainer,
    ImgContainer
} from './styles'

export default function HomePage(){

    return(
        <HomePageContainer className="mainContent">
            <GreenContentContainer>
                
                <LeftStatementsContainer>
                <MainTextContainer>
                    <h1>Technical Share</h1>
                </MainTextContainer>
                <SecondaryTextConytainer>
                    <h2>Conectando pessoas interessadas pela tecnologia</h2>
                </SecondaryTextConytainer>
                </LeftStatementsContainer>

                <ImgContainer>
                    <img src={girl} alt='Tech Share' />
                </ImgContainer>

            </GreenContentContainer>
            <BottomContainer>

            </BottomContainer>
        </HomePageContainer>
    )
}