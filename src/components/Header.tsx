import React, {FC, useState} from 'react';
import  "../styles/style.scss"
import BurgerMenu from "./burgerMenu/BurgerMenu";
import css from "./burgerMenu/BurgerMenu.module.css";

type THeaderProps = {
    scrollDistance: number
}

const Header: FC<THeaderProps> = ({scrollDistance}) => {
    const [status, setStatus] = useState(false)
    const toggleMenu = (status: boolean) => {
        setStatus(status)
    }
    const menyBodyStyle = `menu__body ${status ? "_active" : null}`
    return <header className="header">
        <div className="header__content _container">
            <div className="header__menu menu">
                <div className="menu__icon icon-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
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

            <div style={{position: 'absolute', top: '20px', zIndex: 70}}>{scrollDistance} </div>
        </div>
    </header>
}

export default Header