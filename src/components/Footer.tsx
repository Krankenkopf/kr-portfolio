import React, {CSSProperties, FC} from 'react';
import {useInView} from "react-intersection-observer";

type TFooterProps = {
    scrollDistance: number
    height: number
    wHeight: number
};
const Footer: FC<TFooterProps> = ({scrollDistance, height, wHeight}) => {
    const lastSectStyle = (): CSSProperties => {
        return {
            transition: 'transform 700ms 0s cubic-bezier(0.3, 1, 1, 1)',
            transform: `translateY(${height !==0 && scrollDistance * 25 > height - wHeight ? -height + wHeight : -scrollDistance * 25}px)`,
        }
    }
    const {ref, inView} = useInView({
        threshold: 1
    })


    return (
        <footer ref={ref} className="footer" style={lastSectStyle()}>
            <div className="footer__content _container">
            </div>

        </footer>
    )
}

export default Footer