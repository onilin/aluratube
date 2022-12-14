import react from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSreset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosDaHomePage = {
        // backgroundColor: "red" 
    };
    const [valorDoFiltro, setValorDoFiltro] = react.useState("");

    return (
        <>
            <CSSReset />
            <div style={estilosDaHomePage} >
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    conteúdo
                </Timeline>
            </div>
        </>

    );
}

export default HomePage

// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     )
// }

const StyledHeader = styled.div`
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
     background-color: blue;
     background-image: url(${({ bg }) => bg });
     /* background-image: url(${config.bg}); */
     height: 230px;
 `;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({ searchValue, ...propriedades }) {
    // console.log("Dentro do componente", propriedades.playlists);
    const playlistsNames = Object.keys(propriedades.playlists);
    // statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistsNames.map((playlistsName) => {
                const videos = propriedades.playlists[playlistsName];
                // console.log(playlistsName);
                // console.log(videos);
                return (
                    <section key={playlistsName}>
                        <h2>{playlistsName}</h2>
                        <div>
                            {videos
                                .filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}
