import React, {CSSProperties, FC} from "react";
import skill1 from "../../assets/skills/react.png"
import skill2 from "../../assets/skills/redux.svg"
import skill3 from "../../assets/skills/ts.svg"
import skill4 from "../../assets/skills/sass.png"
import skill5 from "../../assets/skills/axios.png"
import skill6 from "../../assets/skills/jest.png"
import skill7 from "../../assets/skills/tdd.png"
import skill8 from "../../assets/skills/cdd.png"
import skill9 from "../../assets/skills/ctrlcctrlv.png"
import splash1 from "../../assets/skills/splashes/react.png"
import splash2 from "../../assets/skills/splashes/redux.jpg"
import splash3 from "../../assets/skills/splashes/ts.jpg"
import splash4 from "../../assets/skills/splashes/sass.gif"
import splash5 from "../../assets/skills/splashes/axios.jpg"
import splash6 from "../../assets/skills/splashes/jest.jpg"
import splash7 from "../../assets/skills/splashes/tdd.jpg"
import splash8 from "../../assets/skills/splashes/cdd.png"
import splash9 from "../../assets/skills/splashes/ctrlcctrlv.jpg"
import {blankcover} from "../Main"
import {useInView} from "react-intersection-observer";

type TSkill = {
    id: number
    skillName: Array<string>
    skillImg: string
    skillImgAlt: string
    skillSplash: string
    skillSplashAlt: string
    skillSplashDesc: string
    skillDesc: string
}

const SkillCards: FC<{ scrollDistance: number }> = ({scrollDistance}) => {
    const skillsData: Array<TSkill> = [
        {
            id: 1,
            skillName: ['React'],
            skillImg: skill1,
            skillImgAlt: skill1.toString(),
            skillSplash: splash1,
            skillSplashAlt: splash1.toString(),
            skillSplashDesc: 'React4Life',
            skillDesc: ''
        },
        {
            id: 2,
            skillName: ['Redux'],
            skillImg: skill2,
            skillImgAlt: skill2.toString(),
            skillSplash: splash2,
            skillSplashAlt: splash2.toString(),
            skillSplashDesc: 'A State Of Trance',
            skillDesc: '',
        },
        {
            id: 3,
            skillName: ['Typescript'],
            skillImg: skill3,
            skillImgAlt: skill3.toString(),
            skillSplash: splash3,
            skillSplashAlt: splash3.toString(),
            skillSplashDesc: 'Make JS great again',
            skillDesc: '',
        },
        {
            id: 4,
            skillName: ['SASS'],
            skillImg: skill4,
            skillImgAlt: skill4.toString(),
            skillSplash: splash4,
            skillSplashAlt: splash4.toString(),
            skillSplashDesc: 'No god please no',
            skillDesc: '',
        },
        {
            id: 5,
            skillName: ['Axios'],
            skillImg: skill5,
            skillImgAlt: skill5.toString(),
            skillSplash: splash5,
            skillSplashAlt: splash5.toString(),
            skillSplashDesc: 'Crucio!',
            skillDesc: '',
        },
        {
            id: 6,
            skillName: ['jest'],
            skillImg: skill6,
            skillImgAlt: skill6.toString(),
            skillSplash: splash6,
            skillSplashAlt: splash6.toString(),
            skillSplashDesc: 'surely you jest',
            skillDesc: '',
        },
        {
            id: 7,
            skillName: ['Test', 'Driving', 'Development'],
            skillImg: skill7,
            skillImgAlt: skill7.toString(),
            skillSplash: splash7,
            skillSplashAlt: splash7.toString(),
            skillSplashDesc: '*whistle*',
            skillDesc: '',
        },
        {
            id: 8,
            skillName: ['Chaos', 'Driving', 'Development'],
            skillImg: skill8,
            skillImgAlt: skill8.toString(),
            skillSplash: splash8,
            skillSplashAlt: splash8.toString(),
            skillSplashDesc: 'laik if u into 2',
            skillDesc: '',
        },
        {
            id: 9,
            skillName: ['Copypasting'],
            skillImg: skill9,
            skillImgAlt: skill9.toString(),
            skillSplash: splash9,
            skillSplashAlt: splash9.toString(),
            skillSplashDesc: 'On a professional basis',
            skillDesc: '',
        },
    ]

    const skillsSectStyle = () => {
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
            case scrollDistance >= 12 && scrollDistance <= 4000:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${-(scrollDistance-12)*15-150}px)`,
                } as CSSProperties
            default: return {
                transition: 'all 300ms 0s',
                opacity: '1',
                transform: `translateY(${-(scrollDistance-12)*20}px)`,
            }
        }
    }
    const {ref, inView} = useInView({
        threshold: 0.1
    })
    const skillsTitle = 'MY_SKILLS'.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i+char} className={`__L${i+1}`} style={inView ? {} : {animationName: 'none'}}>{char}</h2>
            : <h2 key={i+char} style={{opacity: '0'}}>{char}</h2>
    ))
    const skillsCards = skillsData.map(s => (
        <div key={s.id} className="skills__card">
            <div className="skills__card__container _container">
                <div className="skills__card__header">
                    <div className="skills__card__img">
                        <img src={s.skillImg} alt={s.skillImgAlt} />
                    </div>
                    {/*TODO: fix fontsize ov short titles in mobile view:*/}
                    <div className="skills__card__title title">
                        {s.skillName.map((n, i) => s.skillName.length > 1 || n.length > 6
                            ? (<div key={i+n} className="skills__card__title__reduced"><h4>{n}</h4></div>)
                            : (<div key={i+n}><h3>{n}</h3></div>))}
                    </div>
                </div>
                <div className="skills__card__splashDesc">
                    {s.skillSplashDesc}
                </div>
                <div className="skills__card__splash">
                    <img src={s.skillSplash} alt={s.skillSplashAlt} />
                </div>
                <div className="skills__card__text text">
                    {s.skillDesc} <br/>
                    {blankcover}
                </div>
        </div>
    </div>))

    return <section ref={ref} className="page__skills">
        <div className="skills">
            <div className="skills__container _container">
                <div className="skills__title title">
                    <div className="stringThree"
                         style={inView ? {display: 'flex'} : {display: 'flex', opacity: '0', transition: 'all 300ms 0s',}}>
                        {skillsTitle}
                    </div>
                </div>
                <div className="skills__cards">
                    {skillsCards}
                </div>
            </div>
        </div>
    </section>
}

export default SkillCards