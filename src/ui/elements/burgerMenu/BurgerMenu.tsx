import React, { FC } from "react";
import css from "./BurgerMenu.module.css";

type TBurgerMenuProps = {
    menuStatus: boolean
    toggleMenu: (status: boolean) => void   
}

const BurgerMenu: FC<TBurgerMenuProps> = ({menuStatus, toggleMenu}) => {
    const toggleActive = () => {
        toggleMenu(!menuStatus)
    }
    const burgerStyle = `${css.burger} ${menuStatus ? css.active : null}`

    return <button className={burgerStyle}
        onClick={toggleActive}
        //style={menuStatus ? {right: '28px',} : {}}>
        >
        <div className={css.burgerLine_1}> </div>
        <div className={css.burgerLine_2}> </div>
        <div className={css.burgerLine_3}> </div>
    </button>
}

export default BurgerMenu