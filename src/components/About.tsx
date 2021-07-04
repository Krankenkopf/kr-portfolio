import React, {CSSProperties, FC, useEffect, useState} from "react";
import css from "./About.module.css"
import photo1 from "../assets/img_1.jpg"
import photo2 from "../../assets/about/img_2.jpg"
import photo3 from "../../assets/about/img_3.jpg"
import photo4 from "../../assets/about/img_4.jpg"
import photo5 from "../../assets/about/img_5.jpg"
import temp from "../assets/avaB4B.jpg"
import "../styles/style.scss"
import HeroDescription from "./heroDescription/HeroDescription";
import SkillCardsM from "./skillsCards/SkillCardsM";
import BurgerMenu from "./burgerMenu/BurgerMenu";
import SkillCards from "./skillsCards/SkillCards";

type TAboutProps = {

}

const About: FC<TAboutProps> = () => {
    const [scrollDistance, setScrollDistance] = useState<number>(0);
    const handleScroll = (e: Event) => {
        const position = Math.ceil(window.pageYOffset/25);
        setScrollDistance(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    console.log("home render")

    const heroSectStyle = () => {
        switch (true) {
            case scrollDistance >= 0 && scrollDistance < 12:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${-scrollDistance*10}px)`,
                   /* transformStyle: 'preserve-3d',*/
                } as CSSProperties
            case scrollDistance >= 12 && scrollDistance <= 40:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${-(scrollDistance-12)*7-120}px)
                    translateZ(${(scrollDistance-12)*7}px)
                    rotateX(${scrollDistance * 3 - 36}deg`,
                   /* transformStyle: 'preserve-3d',*/
                } as CSSProperties
            default: return {
                transition: 'all 300ms 0s',
                opacity: '0',
                transform: `translateY(${-(scrollDistance-12)*7-120}px)
                    translateZ(10px) 
                    rotateX(${scrollDistance * 3 - 36}deg`,
            }
        }
    }
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
                    transform: `translateY(${-(scrollDistance-12)*20}px)`,
                    /*transformStyle: 'preserve-3d',*/
                } as CSSProperties
            default: return {

                transition: 'all 300ms 0s',
                opacity: '1',
                transform: `translateY(${-(scrollDistance-12)*20}px)`,
            }
        }
    }




    const skillsContainerMStyle = () => {
        switch (true) {
            case scrollDistance <= 100:
                return {
                    marginTop: `${-scrollDistance * 2 + 220}px`,
                } as CSSProperties
            default:
                return {marginTop: `${20}px`,} as CSSProperties
        }
    }
    const skillsContainerStyle = () => {
        switch (true) {
            case scrollDistance > 1500:
                return {
                    display: 'none',
                } as CSSProperties
            default:
                return {} as CSSProperties
        }
    }

    const decorHorizontalStripStyle = () => {
        switch (true) {
            case scrollDistance >= 1400 && scrollDistance<1650: return {
                width: '100%',
                height: `${(scrollDistance-1400)/2}px`,
            } as CSSProperties
            case scrollDistance >= 1650 && scrollDistance < 2900: return {
                width: '100%',
                height:  `125px`,
            } as CSSProperties
            default: return {display: 'none'} as CSSProperties
        }
    }
    const aboutPageContainerStyle = () => {
        switch (true) {
            case scrollDistance >= 1700: return {
                backgroundColor: '#202020',
            } as CSSProperties

            default: return {backgroundColor: '#202020'} as CSSProperties
        }
    }

    return <main className="page">
        <section style={heroSectStyle()} className="page__hero">
            <div className="hero">
                <div className="hero__container _container">
                    <div className="hero__desc">
                        <HeroDescription/>
                        <button className="hero__btnA btn">
                            Learn More
                        </button>
                    </div>
                    <div className="hero__img">
                        <img src={photo1} alt={'img_1'}/>
                    </div>
                    <button className="hero__btnB btn">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
        <section style={aboutSectStyle()} className="page__about">
            <div className="about">
                <div className="about__container _container">
                    <div className="about__title title">
                        <div className="stringThree" style={{display: 'flex'}}>
                            <h2 className="__a4">A</h2>
                            <h2 className="__b1">B</h2>
                            <h2 className="__o4">O</h2>
                            <h2 className="__u1">U</h2>
                            <h2 className="__t2">T</h2>
                            <h2 style={{opacity: '0'}}>_</h2>
                            <h2 className="__m3">M</h2>
                            <h2 className="__e5">E</h2>
                        </div>
                    </div>
                    <div className="about__text text">
                        <p>My name is Raman Khamets. I'm from Belarus. I'm a quality obsessed, detail-oriented frontend developer who have a strong interest in UI effects, animations and creating stunning dynamic user experiences. I live to learn. I love broadening my skills and working towards a goal.</p>
                        <p>Happily married, child-free, a proud owner of a dozen cats and an extremely mean dog, DIY amateur, a bit a music composer.</p>
                        <p>Interested in the entire frontend spectrum and working on ambitious projects with positive and open-minded people.</p>
                    </div>
                    <div>
                        <button className="about__btn btn">
                            Contact Me!
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <SkillCards scrollDistance={scrollDistance} />
        <section  className={css.section_2}>
        {/*    {scrollDistance<1500 && <div className={css.section_2__title}>
                <h1>My skills</h1>
            </div>}
            <div className={css.section_2__skillsContainerM} style={skillsContainerMStyle()}>
                <SkillCardsM scrollDistance={scrollDistance} />
            </div>
            <div className={css.section_2__skillsContainer} style={skillsContainerStyle()}>
                <div className={css.section_2__skillsContainer__leftFade}> </div>
                <SkillCards scrollDistance={scrollDistance} />
                <div className={css.section_2__skillsContainer__rightFade}> </div>
            </div>*/}
        </section>
        <section className={css.section_3}>
        </section>
        <section className={css.section_4}>
          {/*  <div style={{top: '0', ...decorHorizontalStripStyle()}} className={css.section_4__decorStrip}> </div>
            <div className={css.section_2__title}>
                <h1>My projects</h1>
            </div>
            <div className={css.section_4__projectsContainer}>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
                <div className={css.section_4__projectsContainer_box}>
                    <img src={temp} alt={'projekt'} />
                </div>
            </div>*/}

        </section>
    </main>
}

export default About