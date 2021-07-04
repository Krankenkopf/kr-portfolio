import React, {useEffect, useState} from 'react';
import  './styles/style.scss';
import Particles from "./components/decor/Particles";
import About from "./components/About";
import Header from "./components/Header";

function App() {
    const [scrollDistance, setScrollDistance] = useState<number>(0);
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

    console.log('app render')


    return (
        <div>
            <div className="wrapper">
                <Header scrollDistance={scrollDistance}/>
                <About />
                <Particles />
            </div>
            <div style={{height: '10000px'}} className='scrollPage'> </div>
        </div>

    );
}

export default App;


