import React, {CSSProperties, FC} from "react";
import {useInView} from "react-intersection-observer";

const Contacts: FC<{ scrollDistance: number }> = ({scrollDistance}) => {
    const contactsSectStyle = () => {
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
        threshold: 0.1
    })
    const contactsTitle = 'CONTACT_ME'.split('').map((char, i) => (
        char !== '_'
            ? <h2 className={`__L${i+1}`} style={inView ? {} : {animationName: 'none'}}>{char}</h2>
            : <h2 style={{opacity: '0'}}>{char}</h2>
    ))
    return (
        <section ref={ref} style={contactsSectStyle()} className="page__contacts">
            <div className="contacts">
                <div className="contacts__container _container">
                    <div className="contacts__title title">
                        <div className={"stringThree"}
                             style={inView ? {display: 'flex'} : {display: 'flex', opacity: '0', transition: 'all 300ms 0s',}}>
                            {contactsTitle}
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Contacts