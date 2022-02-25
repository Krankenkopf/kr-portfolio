import React, { FC, MouseEvent} from 'react';
import "./styles/style.scss"
import BurgerMenu from "./elements/burgerMenu/BurgerMenu";
import logo from "assets/png/kranktitle.png"

type THeaderProps = {
    loaded: () => void
    isLoaded: boolean
    toggleMenu: (status: boolean) => void
    menuStatus: boolean
    onNavClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Header: FC<THeaderProps> = ({ loaded, isLoaded, toggleMenu, menuStatus, onNavClick}) => {
    const menyBodyStyle = `menu__body ${menuStatus ? "_active" : null}`
    return <header className="header" style={isLoaded ? {} : {opacity: 0}}>
        <div className="header__content _container" >
            <div className="header__logo">
                <button
                    type='button'
                    value="hero"
                    style={{position: "relative", height: "100%", maxWidth: "90%"}}
                    onClick={onNavClick}>
                    <img src={logo} alt="logo" onLoad={loaded}/>
                </button>
            </div>
            <div className="header__menu menu">
                <nav className={menyBodyStyle}>
                    <ul className="menu__list">
                        <li>
                            <button
                                type='button'
                                value="about"
                            onClick={onNavClick}
                            className="menu__link">
                            About
                            </button>
                        </li>
                        <li>
                            <button type='button'
                                value="skills"
                                onClick={onNavClick}      
                                className="menu__link">
                                My skills
                            </button>
                        </li>
                        <li>
                            <button type='button'
                            value="projects"
                            onClick={onNavClick}
                                className="menu__link">
                                Work
                            </button>
                        </li>
                        <li>
                            <button type='button'
                            value="contacts"
                            onClick={onNavClick}
                                className="menu__link">
                                Contacts
                            </button>
                        </li>
                    </ul>
                </nav>
                <BurgerMenu toggleMenu={toggleMenu}
                    menuStatus={menuStatus} />
            </div>
        </div>
    </header>
}

export default Header
