import React, {CSSProperties, FC} from 'react';
import HeroDescription from "./heroDescription/HeroDescription";
import photo1 from "../../assets/img_1.jpg";

type THeroProps = {
    scrollDistance: number
}

const Hero: FC<THeroProps> = ({scrollDistance}) => {
    const heroSectStyle = ():CSSProperties => {
        switch (true) {
            case scrollDistance >= 0 && scrollDistance <= 40:
                return {
                    transition: 'all 700ms 0s cubic-bezier(0.3, 1, 1, 1)',
                    transform: `
                    translateZ(${(scrollDistance)*7}px)
                    rotateX(${scrollDistance * 4}deg`,
                }
            default: return {
                transition: 'all 300ms 0s',
                opacity: '0',
                transform: `
                    translateZ(10px) 
                    rotateX(${scrollDistance * 3 - 36}deg`,
            }
        }
    }
    return (
        <section className="page__hero"  style={heroSectStyle()}>
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
    )
}

export default Hero