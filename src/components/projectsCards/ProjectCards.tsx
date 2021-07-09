import React, {CSSProperties, FC} from "react";
import temp from "./../../assets/projects/temp.png"
import project1 from "./../../assets/projects/samurai.png"
import project2 from "./../../assets/projects/oregally.png"
import project3 from "./../../assets/projects/dadlinir.png"
import {useInView} from "react-intersection-observer";


const ProjectCards: FC<{ scrollDistance: number }> = ({scrollDistance}) => {
    const projectsData = [
        {
            id: 1,
            projectName: ['SamuraiJS-SN'],
            projectImg: project1,
            projectDesc: 'Social Network',
        },
        {
            id: 2,
            projectName: [`O'regally`, `Krankgrounds`],
            projectImg: project2,
            projectDesc: 'Online Store',
        },
        {
            id: 3,
            projectName: ['Dadlinir'],
            projectImg: project3,
            projectDesc: 'Todolist App',
        },
    ]
    const projectsSectStyle = () => {
        switch (true) {
            case scrollDistance >= 0 && scrollDistance < 100:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${0}px)`,
                } as CSSProperties
            case scrollDistance >= 100 && scrollDistance <= 4000:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${-(scrollDistance-100)*15-1460}px)`,
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
                <div className="projects__card__img">
                    <a href=''>
                        <img src={p.projectImg} alt={p.projectName[0].toLowerCase()} />
                        <div className="projects__card__anchor">View project</div>
                    </a>

                </div>
                <div className="projects__card__descBlock">
                    <div className="projects__card__descBlockContainer">
                        <div className="projects__card__title title">
                            {p.projectName.map((n, i) => (<div key={i+n}><h3>{n}</h3></div>))}
                        </div>
                        <div className="projects__card__desc text">
                            {p.projectDesc}
                        </div>
                    </div>
                </div>

        </div>
    ))
    const {ref, inView} = useInView({
        threshold: 0.1
    })
    const projectsTitle = 'MY_PROJECTS'.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i+char} className={`__R${i+1}`} style={inView ? {} : {animationName: 'none'}}>{char}</h2>
            : <h2 key={i+char} style={{opacity: '0'}}>{char}</h2>
    ))
    return <section ref={ref} style={projectsSectStyle()} className="page__projects">
        <div className="projects">
            <div className="projects__container _container">
                <div className="projects__title title">
                    <div className="stringThree"
                         style={inView ? {display: 'flex'} : {display: 'flex', opacity: '0', transition: 'all 300ms 0s',}}>
                        {projectsTitle}
                    </div>
                </div>
                <div className="projects__cards">
                    {projectsCards}
                </div>
            </div>
        </div>
    </section>
}

export default ProjectCards