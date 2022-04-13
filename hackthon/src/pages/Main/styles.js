import styled from "styled-components";

export const MainContainer = styled.main`

    width: 100vw;
    display: grid;
    justify-content: center;
    grid-template-columns: 5vw 1fr 2fr 2fr 5vw;
    grid-template-rows: 12vh 1fr;
    grid-template-areas: 
        "Lblank topHeader topHeader topHeader Rblank"
        "Lblank sideMenu mainContent rightContent Rblank";

    .Lblank{
        grid-area: Lblank;
    }

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

    .Rblank{
        grid-area: Rblank;
    }

`