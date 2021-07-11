import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import  './styles/style.scss';
import Particles from "./components/decor/Particles";
import Main from "./components/Main";
import Header from "./components/Header";
import EpicBlock from "./components/decor/EpicBlock";
import Footer from "./components/Footer";
import PreLoader from "./components/decor/PreLoader";

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function App() {
    const [scrollDistance, setScrollDistance] = useState<number>(0);
    const [height, setHeight] = useState<number>(0)
    const [windowWidth, windowHeight] = useWindowSize();
    const [loading, setLoading] = useState<boolean>(true)

    const handleScroll = (e: Event) => {
        const position = Math.ceil(window.pageYOffset/25);
        setScrollDistance(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const loaded = () => {
        setLoading(false)
    }
    const loaded2 = () => {
    }
    useEffect( () => {
        if (ref.current
            && ref.current.offsetHeight > windowHeight
            && !loading) {
            ref.current && setHeight(ref.current?.offsetHeight)
            console.log('height ' + height)
        }

    }, [windowWidth, windowHeight, height, loading])
    console.log('app render')
/*    console.log(window.innerWidth)*/
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div style={{height: `${height}px`}}>
            <div ref={ref} className="wrapper">
                {!loading && <Header scrollDistance={scrollDistance}/>}
                <Main  height={height} wHeight={windowHeight} loaded={loaded2}/>
                <EpicBlock scrollDistance={scrollDistance} height={height} wHeight={windowHeight} loaded={loaded}/>
                <Footer scrollDistance={scrollDistance} height={height} wHeight={windowHeight}/>
                {loading && <PreLoader />}
                <Particles />


            </div>
{/*
            <div style={{height: `${height}px`}} className='scrollPage'> </div>*/}
        </div>

    );
}

export default App;


