import React, {CSSProperties, FC, useEffect, useState} from "react";
import {useInView} from 'react-intersection-observer';
import "../styles/style.scss"
import SkillCards from "./skillsCards/SkillCards";
import ProjectCards from "./projectsCards/ProjectCards";
import Contacts from "./contacts/Contacts";
import Hero from "./hero/Hero";
import About from "./about/About";


type TMainProps = {
    height: number
    wHeight: number
    loaded: () => void
}

const Main: FC<TMainProps> = ({height, wHeight, loaded}) => {
    const [scrollDistance, setScrollDistance] = useState<number>(0);
    const handleScroll = (e: Event) => {
        const position = Math.ceil(window.pageYOffset / 25);
        setScrollDistance(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    console.log("main render")

    const pageStyle = (): CSSProperties => {
        return {
            transition: 'transform 700ms 0s cubic-bezier(0.3, 1, 1, 1)',
            transform: `translateY(${height !== 0 && scrollDistance * 25 > height - wHeight ? -height + wHeight : -scrollDistance * 25}px)`,
        }
    }


    return <main className="page" style={pageStyle()}>
        <Hero scrollDistance={scrollDistance}/>
        <About/>
        <SkillCards scrollDistance={scrollDistance}/>
        <ProjectCards scrollDistance={scrollDistance} loaded={loaded}/>
        <Contacts scrollDistance={scrollDistance}/>
    </main>
}

export default Main

export const blankcover = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel est eu tortor porttitor congue. Praesent finibus eleifend mi, eu dictum est scelerisque ut. Nulla sed nulla sed tellus feugiat dignissim a pulvinar sem.'
