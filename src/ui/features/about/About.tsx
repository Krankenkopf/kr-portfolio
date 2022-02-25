import React, { FC, MouseEvent } from 'react';
import {useInView} from "react-intersection-observer";

type TAboutProps = {
    onScrollToSectionClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const About: FC<TAboutProps> = ({onScrollToSectionClick}) => {
    const {ref, inView} = useInView({
        threshold: 0.2
    })
    const aboutTitle = 'ABOUT_ME'.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i + char} className={`__R${i + 1}`} style={inView ? {} : {animationName: 'none'}}>{char}</h2>
            : <h2 key={i + char} style={{opacity: '0'}}>{char}</h2>
    ))
    return (
        <section id="about" ref={ref} className="page__about">
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
                        <p>My name is Roman Khomets. I'm from Belarus. I'm a quality obsessed, detail-oriented frontend
                            developer who have a strong interest in UI effects, animations and creating stunning dynamic
                            user experiences. I live to learn. I love broadening my skills and working towards a
                            goal.</p>
                        <p>Happily married, child-free, a proud owner of a dozen cats and an extremely mean dog, DIY
                            amateur, a bit a music composer.</p>
                        <p>Interested in the entire frontend spectrum and working on ambitious projects with positive
                            and open-minded people.</p>
                    </div>
                    <div>
                        <button type="button"
                            value="contacts"
                            className="about__btn btn"
                            onClick={onScrollToSectionClick}>
                            Contact Me!
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About