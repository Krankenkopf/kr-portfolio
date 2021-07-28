import React, {useEffect, useRef, useState} from 'react';
import '../styles/style.scss';
import ParticlesLower from "./ui/decor/ParticlesLower";
import Main from "./ui/Main";
import Header from "./ui/Header";
import EpicBlock from "./ui/decor/EpicBlock";
import Footer from "./ui/Footer";
import PreLoader from "./ui/decor/PreLoader";
import {useWindowSize} from "../utils/hooks/useWindowSize";
import ParticlesUpper from "./ui/decor/ParticlesUpper";

function App() {
    const [height, setHeight] = useState<number>(0)
    const size = useWindowSize()


    const [loadingStages, incLoadingStages] = useState(0)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const loaded = () => {
        incLoadingStages(loadingStages + 1)
    }
    if (loadingStages === 4 && !isLoaded) {
        setIsLoaded(true)
    }

    const [menuStatus, setMenuStatus] = useState(false)
    const toggleMenu = (status: boolean) => {
        setMenuStatus(status)
        if (status) {
            setScrollLastPosition(window.scrollY)
        }

    }
    useEffect(() => {
        if (!menuStatus) {
            window.scrollTo({top: scrollLastPosition})
        }
    }, [menuStatus])
    const [scrollLastPosition, setScrollLastPosition] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current
            && ref.current.offsetHeight !== height
            && isLoaded) {
            ref.current && setHeight(ref.current?.offsetHeight)
        }

    }, [size, height, isLoaded])
    console.log('app render')

    // scrolling page processing
    let request: number
    const scrollContainerMain = useRef<HTMLDivElement>(null);
    const scrollContainerEpic = useRef<HTMLDivElement>(null);
    const scrollContainerFooter = useRef<HTMLDivElement>(null);
    const scrollData = {
        ease: 0.1,
        current: 0,
        previous: scrollLastPosition,
        rounded: 0
    }

    useEffect(() => {
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        request = requestAnimationFrame(() => scrolling(menuStatus))
        return () => cancelAnimationFrame(request)
    }, [menuStatus])
    const scrolling = (menuStatus: boolean) => {
        if (menuStatus) {
            scrollData.current = scrollLastPosition
            scrollData.previous = scrollLastPosition
        }
        else {
            scrollData.current = window.scrollY
            scrollData.previous += (scrollData.current - scrollData.previous) * scrollData.ease
        }
        scrollData.rounded = Math.round(scrollData.previous * 100) / 100
        if (menuStatus) {
            if (scrollContainerMain.current) {
                scrollContainerMain.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0) 
                scale(0.7) rotateX(-40deg)`
            }
            if (scrollContainerEpic.current) {
                scrollContainerEpic.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)
                 scale(0.7) rotateX(-40deg)`
            }
            if (scrollContainerFooter.current) {
                scrollContainerFooter.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)
                 scale(0.7) rotateX(-40deg)`
            }
        }
        else {
            if (scrollContainerMain.current) {
                scrollContainerMain.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
            }
            if (scrollContainerEpic.current) {
                scrollContainerEpic.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
            }
            if (scrollContainerFooter.current) {
                scrollContainerFooter.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
            }
        }

        request = requestAnimationFrame(() => scrolling(menuStatus))
    }


    return (
        <div style={menuStatus
            ? {height: `${height}px`, position: 'fixed',  overflowY: 'hidden'}
            : {height: `${height}px`,}}>
            <div ref={ref} className="wrapper" style={menuStatus
                ? {paddingRight: '17px',}
                : {}}>
                <Header loaded={loaded}
                        isLoaded={isLoaded}
                        toggleMenu={toggleMenu}
                        menuStatus={menuStatus}/>
                <div ref={scrollContainerMain} style={menuStatus
                    ? {transition: 'transform 150s cubic-bezier(0.3, 1, 1, 1)'}
                    : {transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)', zIndex: 2}}>
                    <Main loaded={loaded}
                          isLoaded={isLoaded}/>
                </div>
                <div ref={scrollContainerEpic} style={menuStatus
                    ? {transition: 'transform 150s cubic-bezier(0.3, 1, 1, 1)'}
                    : {transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)', zIndex: 0}}>
                    <EpicBlock loaded={loaded}/>
                </div>
                <div ref={scrollContainerFooter} style={menuStatus
                    ? {transition: 'transform 150s cubic-bezier(0.3, 1, 1, 1)'}
                    : {transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)', zIndex: 5}}>
                    <Footer />
                </div>
                {!isLoaded && <PreLoader/>}
                <ParticlesLower/>
                <ParticlesUpper />
            </div>
        </div>
    )
}

export default App;


