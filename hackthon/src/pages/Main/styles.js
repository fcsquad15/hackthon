import styled from "styled-components";

export const MainContainer = styled.main`

    width: 80vw;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    grid-template-rows: 20vh 1fr;
    grid-template-areas: 
        "topHeader topHeader topHeader"
        "mainContent mainContent mainContent";

    .header{
        grid-area: topHeader;
    }

    .mainContent{
        grid-area: mainContent;
    }

`