import React, {FC} from 'react';
import "./styles/style.scss"
import BurgerMenu from "./elements/burgerMenu/BurgerMenu";
import logo from "assets/png/kranktitle.png"

type THeaderProps = {
    loaded: () => void
    isLoaded: boolean
    toggleMenu: (status: boolean) => void
    menuStatus: boolean
}

const Header: FC<THeaderProps> = ({ loaded, isLoaded, toggleMenu, menuStatus}) => {

    const menyBodyStyle = `menu__body ${menuStatus ? "_active" : null}`
    return <header className="header" style={isLoaded ? {} : {opacity: 0}}>
        <div className="header__content _container" >
            <div className="header__logo">
                <img src={logo} alt="logo" onLoad={loaded}/>
            </div>
            <div className="header__menu menu">
                <nav className={menyBodyStyle}>
                    <ul className="menu__list">
                        <li><a href={"#about"} className="menu__link">About</a></li>
                        <li><a href={"#skills"} className="menu__link">My skills</a></li>
                        <li><a href={"#work"} className="menu__link">Work</a></li>
                        <li><a href={"#top"} className="menu__link">Contacts</a></li>
                    </ul>
                </nav>
                <BurgerMenu toggleMenu={toggleMenu} menuStatus={menuStatus}/>
            </div>
        </div>
    </header>
}

export default Header