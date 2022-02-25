import React, {FC} from 'react';
import css from "./Particles.module.scss"

const ParticlesUpper = React.memo(
    () => {
        let arr1: Array<{ height: number, rnd: string }> = []
        const generateParticlesArr = (arr: Array<{ height: number, rnd: string }>) => {
            for (let i = 0; i < 50; i++) {
                arr.push({
                    height: Math.ceil(Math.random() * 10),
                    rnd: String.fromCharCode(97 + Math.floor(Math.random() * 10)) + 'a'
                })
            }
            return arr.map((p, i) => (
                <Particle key={i} rnd={p.rnd}/>
            ))
        }
        return (
            <>
                <div className={css.pitContainerUpper}>
                    <div className={css.pit__wide}>
                        {generateParticlesArr(arr1)}
                    </div>
                </div>
            </>

        )
    }
)

const Particle: FC<{ rnd: string }> = ({rnd}) => {
    return <div id={rnd} className={css.spark}> </div>
}

export default ParticlesUpper