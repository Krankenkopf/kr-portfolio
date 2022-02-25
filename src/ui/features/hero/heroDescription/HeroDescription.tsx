import React, {FC} from "react";
import "../../../styles/style.scss"

const HeroDescription: FC<{isLoaded: boolean}> = ({isLoaded}) => {
    const stringOne = 'HI_ALL!'.split('').map((char, i) => (
        char !== '_' && char !== `!`
            ? <h3 key={i+char} className={`__L${i+1}`} style={isLoaded ? {animationDelay: '1s'} : {animationName: 'none'}}>{char}</h3>
            : char === '!'
                ? <h3 key={i+char} className={`__exc1`} style={isLoaded ? {animationDelay: '1s'} : {animationName: 'none'}}>{char}</h3>
                : <h3 key={i+char} style={{opacity: '0'}}>{char}</h3>
    ))
    const stringTwo = `I'M_ROMAN`.split('').map((char, i) => (
        char !== '_' && char !== `'`
            ? <h1 key={i+char} className={`__L${i+1}`} style={isLoaded ? {animationDelay: '2s'} : {animationName: 'none'}}>{char}</h1>
            : char === `'`
            ? <h1 key={i+char} className={`__apo1`} style={isLoaded ? {animationDelay: '2s'} : {animationName: 'none'}}>{char}</h1>
            : <h1 key={i+char} style={{opacity: '0'}}>{char}</h1>
    ))
    const stringThree = `FRONTEND_DEVELOPER`.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i+char} className={`__L${i+1}`} style={isLoaded ? {animationDelay: '3s'} : {animationName: 'none'}}>{char}</h2>
            : <h2 key={i+char} style={{opacity: '0'}}>{char}</h2>
    ))
    return (
        <div className="hero__title title">
            <div className="stringOne"
                 style={isLoaded ? {display: 'flex'} : {display: 'flex', opacity: '0', animationName: 'none',}}>
                {stringOne}
            {/*    <h3 className="__h1">H</h3>
                <h3 className="__i1">I</h3>
                <h3 style={{opacity: '0'}}>_</h3>
                <h3 className="__a1">A</h3>
                <h3 className="__l1">L</h3>
                <h3 className="__l2">L</h3>
                <h3 className="__exc1">!</h3>*/}
            </div>
            <div className="stringTwo"
                 style={isLoaded ? {display: 'flex'} : {display: 'flex', opacity: '0', animationName: 'none',}}>
                {stringTwo}
                {/*   <h1 className="__i2">I</h1>
                <h1 className="__apo1">'</h1>
                <h1 className="__m1">M</h1>
                <h1 style={{opacity: '0'}}>_</h1>
                <h1 className="__r1">R</h1>
                <h1 className="__a2">A</h1>
                <h1 className="__m2">M</h1>
                <h1 className="__a3">A</h1>
                <h1 className="__n1">N</h1>*/}
            </div>
            <div className="stringThree"
                 style={isLoaded ? {display: 'flex'} : {display: 'flex', opacity: '0', animationName: 'none',}}>
                {stringThree}
                {/*   <h2 className="__f1">F</h2>
                <h2 className="__r2">R</h2>
                <h2 className="__o2">O</h2>
                <h2 className="__n2">N</h2>
                <h2 className="__t1">T</h2>
                <h2 className="__e1">E</h2>
                <h2 className="__n3">N</h2>
                <h2 className="__d1">D</h2>
                <h2 style={{opacity: '0'}}>_</h2>
                <h2 className="__d2">D</h2>
                <h2 className="__e2">E</h2>
                <h2 className="__v1">V</h2>
                <h2 className="__e3">E</h2>
                <h2 className="__l3">L</h2>
                <h2 className="__o3">O</h2>
                <h2 className="__p1">P</h2>
                <h2 className="__e4">E</h2>
                <h2 className="__r3">R</h2>*/}
            </div>
        </div>
    )
}
export default HeroDescription