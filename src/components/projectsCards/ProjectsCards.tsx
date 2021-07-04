import React, {CSSProperties, FC} from "react";
import temp from "./../../assets/projects/temp.png"
import {blankcover} from "../Main";

const ProjectsCards: FC<{ scrollDistance: number }> = ({scrollDistance}) => {
    const projectsData = [
        {
            id: 1,
            projectName: ['Samurai', 'Social', 'Network'],
            projectImg: temp,
            projectImgAlt: temp.toString(),
            projectDesc: blankcover,
        },
        {
            id: 2,
            projectName: [`O'regally Krankgrounds`, 'Online', 'Store'],
            projectImg: temp,
            projectImgAlt: temp.toString(),
            projectDesc: blankcover,
        },
        {
            id: 3,
            projectName: [`DADLINIR`, 'Todolist', 'App'],
            projectImg: temp,
            projectImgAlt: temp.toString(),
            projectDesc: blankcover,
        },
    ]
    const projectsSectStyle = () => {
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
    const projectsCards = projectsData.map(p => (
        <div key={p.id} className="projects__card">
            <div className="projects__card__container">
                <div className="projects__card__title title">
                    {p.projectName.map((n, i) => (<div key={i+n}><h3>{n}</h3></div>))}
                </div>
                <div className="projects__card__img">
                    <img src={p.projectImg} alt={p.projectImgAlt} />
                </div>
            </div>
        </div>
    ))
    return <section style={projectsSectStyle()} className="page__projects">
        <div className="projects">
            <div className="projects__container _container">
                <div className="projects__title title">
                    <div className="stringThree" style={{display: 'flex'}}>
                        <h2 className="__a4">M</h2>
                        <h2 className="__b1">Y</h2>
                        <h2 style={{opacity: '0'}}>_</h2>
                        <h2 className="__o4">P</h2>
                        <h2 className="__u1">R</h2>
                        <h2 className="__t2">O</h2>
                        <h2 className="__t2">J</h2>
                        <h2 className="__t2">E</h2>
                        <h2 className="__t2">C</h2>
                        <h2 className="__m3">T</h2>
                        <h2 className="__e5">S</h2>
                    </div>
                </div>
                <div className="projects__cards">
                    {projectsCards}
                </div>
            </div>
        </div>
    </section>
}

export default ProjectsCards