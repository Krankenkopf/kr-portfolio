import React, {useEffect, useState} from 'react';
import  './styles/style.scss';
import Particles from "./components/decor/Particles";
import Main from "./components/Main";
import Header from "./components/Header";
import EpicBlock from "./components/decor/EpicBlock";

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
                <Main />
                <EpicBlock scrollDistance={scrollDistance}/>
                <Particles />


            </div>
            <div style={{height: '12000px'}} className='scrollPage'> </div>
        </div>

    );
}

export default App;


