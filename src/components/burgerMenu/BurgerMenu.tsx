import React, {FC, useState} from "react";
import css from "./BurgerMenu.module.css";

type TBurgerMenuProps = {
    toggleMenu: (status: boolean) => void
}

const BurgerMenu: FC<TBurgerMenuProps> = ({toggleMenu}) => {
    const [status, setStatus] = useState(false)
    const toggleActive = () => {
        setStatus(!status)
        toggleMenu(!status)
    }
    const burgerStyle = `${css.burger} ${status ? css.active : null}`

    return <button className={burgerStyle} onClick={toggleActive}>
        <div className={css.burgerLine_1}> </div>
        <div className={css.burgerLine_2}> </div>
        <div className={css.burgerLine_3}> </div>
    </button>
}

export default BurgerMenu