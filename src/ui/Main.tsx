import React, { FC, MouseEvent} from "react";
import "./styles/style.scss"
import SkillCards from "./features/skillsCards/SkillCards";
import ProjectCards from "./features/projectsCards/ProjectCards";
import Contacts from "./features/contacts/Contacts";
import Hero from "./features/hero/Hero";
import About from "./features/about/About";


type TMainProps = {
    loaded: () => void
    isLoaded: boolean
    onScrollToSectionClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Main: FC<TMainProps> = ({loaded, isLoaded, onScrollToSectionClick }) => {
    return <main className="page">
        <Hero setLoaded={loaded}
            isLoaded={isLoaded}
            onScrollToSectionClick={onScrollToSectionClick} />
        <About onScrollToSectionClick={onScrollToSectionClick}/>
        <SkillCards />
        <ProjectCards loaded={loaded}/>
        <Contacts/>
    </main>
}

export default Main

export const blankcover = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel est eu tortor porttitor congue. Praesent finibus eleifend mi, eu dictum est scelerisque ut. Nulla sed nulla sed tellus feugiat dignissim a pulvinar sem.'
