import React, {CSSProperties, FC, useEffect, useRef} from 'react';
import HeroDescription from "./heroDescription/HeroDescription";
import photo1 from "assets/img_1.jpg";
import {useInView} from "react-intersection-observer";

type THeroProps = {
    loaded: () => void
    isLoaded: boolean
}

const Hero: FC<THeroProps> = ({loaded, isLoaded}) => {
    const {ref, inView} = useInView()
    const rotateContainer = useRef<HTMLDivElement>(null);
    let request: number
    const rotateData = {
        ease: 0.2,
        current: 0,
        previous: 0,
        rounded: 0
    }
    const rotating = () => {
        rotateData.current = window.scrollY
        rotateData.previous += (rotateData.current - rotateData.previous) * rotateData.ease
        rotateData.rounded = Math.round(rotateData.previous * 100) / 100

        if (rotateContainer.current) {
            rotateContainer.current.style.transform = `rotateX(${rotateData.rounded/7}deg)`
        }
        if (inView) {
            request = requestAnimationFrame(() => rotating());
        }

    }
    useEffect(() => {
        // @ts-ignore
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        request = requestAnimationFrame(() => rotating())
        return () => cancelAnimationFrame(request)
    }, [inView])

    return (
        <section ref={ref} className="page__hero">
            <div ref={rotateContainer} className="hero">
                <div className="hero__container _container">
                    <div className="hero__desc">
                        <HeroDescription isLoaded={isLoaded}/>
                        <button className="hero__btnA btn">
                            Learn More
                        </button>
                    </div>
                    <div className="hero__img">
                        <img src={photo1} alt={'img_1'} onLoad={loaded}/>
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