import React, { FC, useEffect, useRef, MouseEvent, useState} from 'react';
import HeroDescription from "./heroDescription/HeroDescription";
import photo1 from "assets/img_1.jpg";
import cv from "assets/cv.pdf"
import {useInView} from "react-intersection-observer";
import { useCallback } from 'react';

type THeroProps = {
    menuStatus: boolean
    isLoaded: boolean
    setLoaded: () => void
    setCallback: (callback: (deltaTime: number) => void) => void
    onScrollToSectionClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Hero: FC<THeroProps> = ({menuStatus, setLoaded, isLoaded, setCallback, onScrollToSectionClick}) => {
    const {ref, inView} = useInView()
    const rotateContainer = useRef<HTMLDivElement>(null);
    const rotateDataRef = useRef<any>()
    
    const rotating = (dy: number) => { 
        if (rotateContainer.current) {  
            if (dy >= -1 && dy <= rotateContainer.current?.offsetHeight - 10) {
                rotateDataRef.current.previous += (dy - rotateDataRef.current.previous)*0.2
                rotateDataRef.current.rounded = Math.round(rotateDataRef.current.previous * 100) / 100
                rotateContainer.current.style.transform = `rotateX(${rotateDataRef.current.rounded / 50}deg) translate3d(0, ${-rotateDataRef.current.rounded / 20}px, ${-rotateDataRef.current.rounded/30}px)`
            }  
        }
    }
    useEffect(() => {
        rotateDataRef.current = {
                current: 0,
                previous: 0,
                rounded: 0,
                rotateLock: false
            }  
        if (inView) {
            setCallback(rotating)
        } else {
            setCallback(() => { })
        }
        return () => setCallback(() => {})
    }, [inView])

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
        </section>
    )
}

export default Hero