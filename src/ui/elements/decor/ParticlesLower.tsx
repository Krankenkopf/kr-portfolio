import React, {FC} from 'react';
import css from "./Particles.module.scss"

const ParticlesLower = React.memo(
    () => {
        let arr1: Array<{ height: number, rnd: string }> = []
        let arr2: Array<{ height: number, rnd: string }> = []
        let arr3: Array<{ height: number, rnd: string }> = []
        let arr4: Array<{ height: number, rnd: string }> = []
        console.log('particles')
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
                <div className={css.pitContainerLower}>
                    <div className={css.pit}>
                        {generateParticlesArr(arr1)}
                    </div>
                    <div className={css.pit}>
                        {generateParticlesArr(arr2)}
                    </div>
                    <div className={css.pit}>
                        {generateParticlesArr(arr3)}
                    </div>
                    <div className={css.pit}>
                        {generateParticlesArr(arr4)}
                    </div>
                </div>
            </>

        )
    }
)

const Particle: FC<{ rnd: string }> = ({rnd}) => {
    return <div id={rnd} className={css.spark}> </div>
}

export default ParticlesLower