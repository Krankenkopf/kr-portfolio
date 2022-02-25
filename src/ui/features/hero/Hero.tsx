import React, { FC, useEffect, useRef, MouseEvent} from 'react';
import HeroDescription from "./heroDescription/HeroDescription";
import photo1 from "assets/img_1.jpg";
import cv from "assets/cv.pdf"
import {useInView} from "react-intersection-observer";
import { useCallback } from 'react';

type THeroProps = {
    isLoaded: boolean
    setLoaded: () => void
    onScrollToSectionClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Hero: FC<THeroProps> = ({setLoaded, isLoaded, onScrollToSectionClick}) => {
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
            rotateContainer.current.style.transform = `rotateX(${rotateData.rounded / 50}deg) translate3d(0, ${-rotateData.rounded / 20}px, ${-rotateData.rounded/30}px)`
        }
        if (inView) {
            request = requestAnimationFrame(rotating);
        }

    }
    useEffect(() => {
        // @ts-ignore
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        request = requestAnimationFrame(rotating)
        return () => cancelAnimationFrame(request)
    }, [inView])

    const openCV = useCallback(() => {
        window.open("/")
    }, [])

    return (
        <section id="hero" ref={ref} className="page__hero">
            <div ref={rotateContainer} className="hero">
                <div className="hero__container _container">
                    <div className="hero__desc">
                        <HeroDescription isLoaded={isLoaded} />
                        <a href={cv} target='pdf-frame'>
                           <button type='button'
                            className="hero__btnA btn">
                            Learn More
                        </button> 
                        </a>   
                    </div>
                    <div className="hero__img">
                        <img src={photo1} alt={'img_1'} onLoad={setLoaded}/>
                    </div>
                    <a href={cv} target='pdf-frame'>
                        <button type='button'
                        className="hero__btnB btn">
                        Learn More
                        </button>
                    </a> 
                </div>
            </div>
            {/* <div className="cv">
                <embed src="file_name.pdf" width="800px" height="2100px" />
            </div> */}
        </section>
    )
}

export default Hero