import React, {useEffect, useRef, useState} from 'react';
import './styles/style.scss';
import Particles from "./components/decor/Particles";
import Main from "./components/Main";
import Header from "./components/Header";
import EpicBlock from "./components/decor/EpicBlock";
import Footer from "./components/Footer";
import PreLoader from "./components/decor/PreLoader";
import {useWindowSize} from "./hooks/useWindowSize";

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
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current
            && ref.current.offsetHeight > size.height
            && isLoaded) {
            ref.current && setHeight(ref.current?.offsetHeight)
        }

    }, [size, isLoaded])
    console.log('app render')

    // scrolling page processing
    const scrollContainer = useRef<HTMLDivElement>(null);
    const scrollData = {
        ease: 0.1,
        current: 0,
        previous: 0,
        rounded: 0
    }
    useEffect(() => {
        requestAnimationFrame(() => scrolling());
    }, [])
    const scrolling = () => {
        scrollData.current = window.scrollY
        scrollData.previous += (scrollData.current - scrollData.previous) * scrollData.ease
        scrollData.rounded = Math.round(scrollData.previous * 100) / 100
        if (scrollContainer.current) {
            scrollContainer.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
        }
        requestAnimationFrame(() => scrolling());
    }
    return (
        <div style={{height: `${height}px`}}>
            <div ref={ref} className="wrapper">
                <Header loaded={loaded}
                        isLoaded={isLoaded}/>
                <div ref={scrollContainer} style={{transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)',}}>
                    <Main loaded={loaded}
                          isLoaded={isLoaded}/>
                    <EpicBlock loaded={loaded}/>
                    <Footer />
                </div>
                <Particles/>
                {!isLoaded && <PreLoader/>}

            </div>
        </div>

    );
}

export default App;


