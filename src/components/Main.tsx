import React, {CSSProperties, FC, useEffect, useState} from "react";
import {useInView} from 'react-intersection-observer';
import "../styles/style.scss"
import SkillCards from "./skillsCards/SkillCards";
import ProjectCards from "./projectsCards/ProjectCards";
import Contacts from "./contacts/Contacts";
import Hero from "./hero/Hero";
import About from "./about/About";


type TMainProps = {
    loaded: () => void
    isLoaded: boolean
}

const Main: FC<TMainProps> = ({loaded, isLoaded}) => {



    console.log("main render")


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
