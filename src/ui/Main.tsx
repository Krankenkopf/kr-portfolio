import React, {FC} from "react";
import "./styles/style.scss"
import SkillCards from "./features/skillsCards/SkillCards";
import ProjectCards from "./features/projectsCards/ProjectCards";
import Contacts from "./features/contacts/Contacts";
import Hero from "./features/hero/Hero";
import About from "./features/about/About";


type TMainProps = {
    loaded: () => void
    isLoaded: boolean
}

const Main: FC<TMainProps> = ({loaded, isLoaded}) => {
    return <main className="page">
        <Hero loaded={loaded} isLoaded={isLoaded}/>
        <About/>
        <SkillCards/>
        <ProjectCards loaded={loaded}/>
        <Contacts/>
    </main>
}

export default Main

export const blankcover = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel est eu tortor porttitor congue. Praesent finibus eleifend mi, eu dictum est scelerisque ut. Nulla sed nulla sed tellus feugiat dignissim a pulvinar sem.'
