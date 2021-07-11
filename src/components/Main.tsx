import React, {CSSProperties, FC, useEffect, useState} from "react";
import photo1 from "../assets/img_1.jpg"
import "../styles/style.scss"
import HeroDescription from "./hero/heroDescription/HeroDescription";
import SkillCards from "./skillsCards/SkillCards";
import ProjectCards from "./projectsCards/ProjectCards";
import {useInView} from 'react-intersection-observer';
import Contacts from "./contacts/Contacts";
import Hero from "./hero/Hero";


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


    const aboutSectStyle = () => {
        switch (true) {
            case scrollDistance >= 0 && scrollDistance < 4:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${0}px)`,
                } as CSSProperties
            case scrollDistance >= 4 && scrollDistance < 12:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${0}px)`,
                } as CSSProperties
            case scrollDistance >= 12 && scrollDistance <= 40:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${-(scrollDistance - 12) * 20}px)`,
                    /*transformStyle: 'preserve-3d',*/
                } as CSSProperties
            default:
                return {

                    transition: 'all 300ms 0s',
                    opacity: '1',
                    transform: `translateY(${-(scrollDistance - 12) * 20}px)`,
                } as CSSProperties
        }
    }
    const pageStyle = (): CSSProperties => {
        return {
            /*height: `${8000-scrollDistance*25}px`*/
            transition: 'transform 700ms 0s cubic-bezier(0.3, 1, 1, 1)',
            transform: `translateY(${height !== 0 && scrollDistance * 25 > height - wHeight ? -height + wHeight : -scrollDistance * 25}px)`,
            /*transformStyle: 'preserve-3d',*/
        }
    }
    const {ref, inView} = useInView({
        threshold: 0.2
    })
    const aboutTitle = 'ABOUT_ME'.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i + char} className={`__R${i + 1}`} style={inView ? {} : {animationName: 'none'}}>{char}</h2>
            : <h2 key={i + char} style={{opacity: '0'}}>{char}</h2>
    ))


    return <main className="page" style={pageStyle()}>
        <Hero scrollDistance={scrollDistance}/>
        <section ref={ref} className="page__about">
            <div className="about">
                <div className="about__container _container">
                    <div className="about__title title">
                        <div className={"stringThree"}
                             style={inView ? {display: 'flex'} : {
                                 display: 'flex',
                                 opacity: '0',
                                 transition: 'all 300ms 0s',
                             }}>
                            {aboutTitle}
                        </div>
                    </div>
                    <div className="about__text text">
                        <p>My name is Raman Khamets. I'm from Belarus. I'm a quality obsessed, detail-oriented frontend
                            developer who have a strong interest in UI effects, animations and creating stunning dynamic
                            user experiences. I live to learn. I love broadening my skills and working towards a
                            goal.</p>
                        <p>Happily married, child-free, a proud owner of a dozen cats and an extremely mean dog, DIY
                            amateur, a bit a music composer.</p>
                        <p>Interested in the entire frontend spectrum and working on ambitious projects with positive
                            and open-minded people.</p>
                    </div>
                    <div>
                        <button className="about__btn btn">
                            Contact Me!
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <SkillCards scrollDistance={scrollDistance}/>
        <ProjectCards scrollDistance={scrollDistance} loaded={loaded}/>
        <Contacts scrollDistance={scrollDistance}/>

    </main>
}

export default Main

export const blankcover = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel est eu tortor porttitor congue. Praesent finibus eleifend mi, eu dictum est scelerisque ut. Nulla sed nulla sed tellus feugiat dignissim a pulvinar sem.'
