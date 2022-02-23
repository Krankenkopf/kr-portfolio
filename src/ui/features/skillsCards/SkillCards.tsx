import React, { CSSProperties, FC } from "react";
import { skillImgs } from "assets/skills"
import { splashImgs } from "assets/skills/splashes"
import { blankcover } from "../../Main"
import { useInView } from "react-intersection-observer";

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

const skillsData: Array<TSkill> = [
    {
        id: 1,
        skillName: ['React'],
        skillImg: skillImgs.skill1,
        skillImgAlt: skillImgs.skill1.toString(),
        skillSplash: splashImgs.splash1,
        skillSplashAlt: splashImgs.splash1.toString(),
        skillSplashDesc: 'React4Life',
        skillDesc: ''
    },
    {
        id: 2,
        skillName: ['Redux'],
        skillImg: skillImgs.skill2,
        skillImgAlt: skillImgs.skill2.toString(),
        skillSplash: splashImgs.splash2,
        skillSplashAlt: splashImgs.splash2.toString(),
        skillSplashDesc: 'A State Of Trance',
        skillDesc: '',
    },
    {
        id: 3,
        skillName: ['Typescript'],
        skillImg: skillImgs.skill3,
        skillImgAlt: skillImgs.skill3.toString(),
        skillSplash: splashImgs.splash3,
        skillSplashAlt: splashImgs.splash3.toString(),
        skillSplashDesc: 'Make JS great again',
        skillDesc: '',
    },
    {
        id: 4,
        skillName: ['Next'],
        skillImg: skillImgs.skill4,
        skillImgAlt: skillImgs.skill4.toString(),
        skillSplash: splashImgs.splash4,
        skillSplashAlt: splashImgs.splash4.toString(),
        skillSplashDesc: 'Born in SSR',
        skillDesc: '',
    },
    {
        id: 5,
        skillName: ['Node.js'],
        skillImg: skillImgs.skill5,
        skillImgAlt: skillImgs.skill5.toString(),
        skillSplash: splashImgs.splash5,
        skillSplashAlt: splashImgs.splash5.toString(),
        skillSplashDesc: 'Moar callbackz!',
        skillDesc: '',
    },
    {
        id: 6,
        skillName: ['Postgresql'],
        skillImg: skillImgs.skill6,
        skillImgAlt: skillImgs.skill6.toString(),
        skillSplash: splashImgs.splash6,
        skillSplashAlt: splashImgs.splash6.toString(),
        skillSplashDesc: 'Any progress?',
        skillDesc: '',
    },
    {
        id: 7,
        skillName: ['SASS'],
        skillImg: skillImgs.skill7,
        skillImgAlt: skillImgs.skill7.toString(),
        skillSplash: splashImgs.splash7,
        skillSplashAlt: splashImgs.splash7.toString(),
        skillSplashDesc: 'No god please no',
        skillDesc: '',
    },
    {
        id: 8,
        skillName: ['Axios'],
        skillImg: skillImgs.skill8,
        skillImgAlt: skillImgs.skill8.toString(),
        skillSplash: splashImgs.splash8,
        skillSplashAlt: splashImgs.splash8.toString(),
        skillSplashDesc: 'Crucio!',
        skillDesc: '',
    },
    {
        id: 9,
        skillName: ['jest'],
        skillImg: skillImgs.skill9,
        skillImgAlt: skillImgs.skill9.toString(),
        skillSplash: splashImgs.splash9,
        skillSplashAlt: splashImgs.splash9.toString(),
        skillSplashDesc: 'surely you jest',
        skillDesc: '',
    },
    {
        id: 10,
        skillName: ['Test', 'Driving', 'Development'],
        skillImg: skillImgs.skill10,
        skillImgAlt: skillImgs.skill10.toString(),
        skillSplash: splashImgs.splash10,
        skillSplashAlt: splashImgs.splash10.toString(),
        skillSplashDesc: 'that awkward moment',
        skillDesc: '',
    },
    {
        id: 11,
        skillName: ['Chaos', 'Driving', 'Development'],
        skillImg: skillImgs.skill11,
        skillImgAlt: skillImgs.skill11.toString(),
        skillSplash: splashImgs.splash11,
        skillSplashAlt: splashImgs.splash11.toString(),
        skillSplashDesc: 'laik if u into 2',
        skillDesc: '',
    },
    {
        id: 12,
        skillName: ['Copypasting'],
        skillImg: skillImgs.skill12,
        skillImgAlt: skillImgs.skill12.toString(),
        skillSplash: splashImgs.splash12,
        skillSplashAlt: splashImgs.splash12.toString(),
        skillSplashDesc: 'On a professional basis',
        skillDesc: '',
    },
]

const SkillCards: FC<{}> = () => {

    const { ref, inView } = useInView({
        threshold: 0.1
    })
    const skillsTitle = 'MY_SKILLS'.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i + char} className={`__L${i + 1}`} style={inView ? {} : { animationName: 'none' }}>{char}</h2>
            : <h2 key={i + char} style={{ opacity: '0' }}>{char}</h2>
    ))
    const skillsCards = skillsData.map(s => (
        <div key={s.id} className="skills__card">
            <div className="skills__card__container">
                <div className="skills__card__header">
                    <div className="skills__card__img">
                        <img src={s.skillImg} alt={s.skillImgAlt} />
                    </div>
                    {/*TODO: fix fontsize ov short titles in mobile view:*/}
                    <div className="skills__card__title title">
                        {s.skillName.map((n, i) => s.skillName.length > 1 || n.length > 7
                            ? (<div key={i + n} className="reduced">
                                <h4 className="stringThree">{n}</h4>
                            </div>)
                            : (<div key={i + n}>
                                <h3 className="stringThree">{n}</h3>
                            </div>))}
                    </div>
                </div>

                {/* <div className="skills__card__text text">
                    {s.skillDesc} <br/>
                </div> */}
            </div>
            <div className="skills__card__splashDesc" style={inView ? {} : { animationName: 'none' }}>
                {s.skillSplashDesc}
            </div>
            <div className="skills__card__splash">
                <img src={s.skillSplash} alt={s.skillSplashAlt} />
            </div>
        </div>))

    return <section ref={ref} id="skills" className="page__skills">
        <div className="skills">
            <div className="skills__container _container">
                <div className="skills__title title">
                    <div className="stringThree"
                        style={inView ? { display: 'flex' } : { display: 'flex', opacity: '0', transition: 'all 300ms 0s', }}>
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
