import styled from "styled-components";

export const MainContainer = styled.main`

    width: 80vw;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
    grid-template-rows: 20vh 1fr;
    grid-template-areas: 
        "topHeader topHeader topHeader"
        "sideMenu mainContent rightContent";

    .header{
        grid-area: topHeader;
    }

    .sideMenu{
        grid-area: sideMenu;
    }

    .mainContent{
        grid-area: mainContent;
    }

    .rightContent{
        grid-area: rightContent;
    }

`