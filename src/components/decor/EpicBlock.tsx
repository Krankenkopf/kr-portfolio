import React, {CSSProperties, FC} from 'react';
import fire from "../../assets/fire.mp4";
import {useInView} from "react-intersection-observer";
import frame1 from "../../assets/epic/pre_frame1.png"
import frame2 from "../../assets/epic/pre_frame2.png"
import frame3 from "../../assets/epic/pre_frame3.png"
import frame4 from "../../assets/epic/pre_frame4.png"
import frame5 from "../../assets/epic/pre_frame5.png"
import frame6 from "../../assets/epic/pre_frame6.png"
import frame7 from "../../assets/epic/pre_frame7.png"
import frame8 from "../../assets/epic/pre_frame8.png"
import frame9 from "../../assets/epic/pre_frame9.png"
import frame10 from "../../assets/epic/pre_frame10.png"
import frame11 from "../../assets/epic/pre_frame11.png"

type TEpicBlockProps = {
    scrollDistance: number
}
const EpicBlock: FC<TEpicBlockProps> = ({scrollDistance}) => {

    const lastSectStyle = () => {
        switch (true) {
            case scrollDistance >= 0 && scrollDistance < 100:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${0}px)`,
                } as CSSProperties
            case scrollDistance >= 100 && scrollDistance <= 4000:
                return {
                    transition: 'all 300ms 0s',
                    transform: `translateY(${-(scrollDistance-100)*15-1460}px)`,
                } as CSSProperties
            default:
                return {
                    transition: 'all 300ms 0s',
                    opacity: '1',
                    transform: `translateY(${-(scrollDistance - 12) * 20}px)`,
                } as CSSProperties
        }
    }
    const {ref, inView} = useInView({
        threshold: 0.2
    })
    const frames = [
        {
            id: 1,
            imgSrc: frame1,
            imgAlt: '1',
        },
        {
            id: 2,
            imgSrc: frame2,
            imgAlt: '2',
        },
        {
            id: 3,
            imgSrc: frame3,
            imgAlt: '3',
        },
        {
            id: 4,
            imgSrc: frame4,
            imgAlt: '4',
        },
        {
            id: 5,
            imgSrc: frame5,
            imgAlt: '5',
        },
        {
            id: 6,
            imgSrc: frame6,
            imgAlt: '6',
        },
        {
            id: 7,
            imgSrc: frame7,
            imgAlt: '7',
        },
        {
            id: 8,
            imgSrc: frame8,
            imgAlt: '8',
        },
        {
            id: 9,
            imgSrc: frame9,
            imgAlt: '9',
        },
        {
            id: 10,
            imgSrc: frame10,
            imgAlt: '10',
        },
        {
            id: 11,
            imgSrc: frame11,
            imgAlt: '11',
        },
    ].map(fr => (
        <span key={fr.id} className="epic__hero__frame">
            <img src={fr.imgSrc} alt={fr.imgAlt} />
        </span>))
    return (
        <div ref={ref} className="epic__block" style={lastSectStyle()}>
            <div className="epic">
                <div className="epic__hero">
                    <div style={inView ? {} : {animationName: 'none'}}
                         className="epic__hero__frames">
                        {frames}
                    </div>
                </div>
                <video className="epic__fire" autoPlay muted loop>
                    <source src={fire} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                </video>
                <div className="epic__gradient"> </div>
            </div>
        </div>
    )
}

export default EpicBlock