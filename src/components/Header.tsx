import React, {FC, useState} from 'react';
import  "../styles/style.scss"
import BurgerMenu from "./burgerMenu/BurgerMenu";
import logo from "../assets/png/kranktitle.png"

type THeaderProps = {
    loaded: () => void
    isLoaded: boolean
}

const Header: FC<THeaderProps> = ({ loaded, isLoaded}) => {
    const [status, setStatus] = useState(false)
    const toggleMenu = (status: boolean) => {
        setStatus(status)
    }
    const menyBodyStyle = `menu__body ${status ? "_active" : null}`
    return <header className="header" style={isLoaded ? {} : {opacity: 0}}>
        <div className="header__content _container">
            <div className="header__logo">
                <img src={logo} alt="logo" onLoad={loaded}/>
            </div>
            <div className="header__menu menu">
                <nav className={menyBodyStyle}>
                    <ul className="menu__list">
                        <li><a href="" className="menu__link">About</a></li>
                        <li><a href="" className="menu__link">My skills</a></li>
                        <li><a href="" className="menu__link">Work</a></li>
                        <li><a href="" className="menu__link">Contacts</a></li>
                    </ul>
                </nav>
                <BurgerMenu toggleMenu={toggleMenu}/>
            </div>
        </div>
    </header>
}

export default Header