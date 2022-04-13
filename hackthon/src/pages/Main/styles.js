import styled from "styled-components";

export const MainContainer = styled.main`

    width: 100vw;
    display: grid;
    justify-content: center;
    grid-template-columns: 5vw 1fr 2fr 2fr 5vw;
    grid-template-rows: 12vh 1fr;
    grid-template-areas: 
        "Lblank topHeader topHeader topHeader Rblank"
        "Lblank mainContent mainContent mainContent Rblank";

    .Lblank{
        grid-area: Lblank;
    }

    .header{
        grid-area: topHeader;
    }

    .mainContent{
        grid-area: mainContent;
    }

    .Rblank{
        grid-area: Rblank;
    }
`