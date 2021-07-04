import React, {CSSProperties, FC} from "react";
import skill1 from "../../assets/skills/react.png"
import skill2 from "../../assets/skills/redux.svg"
import skill3 from "../../assets/skills/sass.png"
import skill4 from "../../assets/skills/axios.png"
import skill5 from "../../assets/skills/ctrlcctrlv.png"
import css from "./SkillCardsM.module.css";

const SkillCardsM: FC<{scrollDistance: number}> = ({scrollDistance}) => {

    const firstSkillStyle = () => {
        switch (true) {
            case scrollDistance >= 250 && scrollDistance<=400:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                } as CSSProperties
            case scrollDistance > 400:
                return {
                    transition: 'all 100ms 0s',
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                } as CSSProperties
        }
    }
    const secondSkillStyle = () => {
        switch (true) {
            case scrollDistance > 400 && scrollDistance<=700:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150 - 180}deg)`,
                } as CSSProperties
            case scrollDistance > 700 || scrollDistance <=400:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150 -180}deg)`,
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(90deg)`,
                } as CSSProperties
        }
    }
    const thirdSkillStyle = () => {
        switch (true) {
            case scrollDistance > 700 && scrollDistance<=1000:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                } as CSSProperties
            case scrollDistance > 1000 || scrollDistance <=700:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(90deg)`,
                } as CSSProperties
        }
    }
    const forthSkillStyle = () => {
        switch (true) {
            case scrollDistance > 1000 && scrollDistance<=1300:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150 - 180}deg)`,
                } as CSSProperties
            case scrollDistance > 1300 || scrollDistance <=1000:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150 -180}deg)`,
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(90deg)`,
                } as CSSProperties
        }
    }
    const fifthSkillStyle = () => {
        switch (true) {
            case scrollDistance > 1300 && scrollDistance<=1600:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                } as CSSProperties
            case scrollDistance > 1600 || scrollDistance <=1300:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(90deg)`,
                } as CSSProperties
        }
    }
    const sixthSkillStyle = () => {
        switch (true) {
            case scrollDistance > 1600 && scrollDistance<=1900:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150 - 180}deg)`,
                } as CSSProperties
            case scrollDistance > 1900 || scrollDistance <=1600:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150 -180}deg)`,
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(90deg)`,
                } as CSSProperties
        }
    }
    const seventhSkillStyle = () => {
        switch (true) {
            case scrollDistance > 1900 && scrollDistance<=2200:
                return {
                    transition: 'all 100ms 0s',
                    transformStyle: 'preserve-3d',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                } as CSSProperties
            case scrollDistance > 2200 || scrollDistance <=1900:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(${scrollDistance / 5 * 3 - 150}deg)`,
                    display: 'none',
                } as CSSProperties
            default:
                return {
                    transition: 'all 100ms 0s',
                    transform: `rotateX(90deg)`,
                } as CSSProperties
        }
    }
    return <>
        <div style={firstSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill1} alt={'react'}/>
            <div className={css.section_2__skillsContainer__item}>React</div>
            <div> React4Life</div>
        </div>
        <div style={secondSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill2} alt={'redux'}/>
            <div className={css.section_2__skillsContainer__item}>Redux</div>
            <div> Ridakzz</div>
        </div>
        <div style={thirdSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill3} alt={'sass'}/>
            <div className={css.section_2__skillsContainer__item}>Sass</div>
            <div> NO GOD PLEASE NOOOO!!!</div>
        </div>
        <div style={forthSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill4} alt={'axios'}/>
            <div className={css.section_2__skillsContainer__item}>Axios</div>
            <div> Crucio!</div>
        </div>
        <div style={fifthSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill5} alt={'ctrlC_ctrl_V'}/>
            <div className={css.section_2__skillsContainer__item}>Copypasting</div>
            <div> ...on a professional basis</div>
        </div>
        <div style={sixthSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill1} alt={'tdd'}/>
            <div className={css.section_2__skillsContainer__item}>Test driving development</div>
            <div>...</div>
        </div>
        <div style={seventhSkillStyle()} className={css.section_2__skillsContainer__box}>
            <img src={skill1} alt={'cdd'}/>
            <div className={css.section_2__skillsContainer__item}>Chaos driving development</div>
            <div> like if u r into 2</div>
        </div>
    </>
}

export default SkillCardsM