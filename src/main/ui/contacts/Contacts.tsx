import React, {FC} from "react";
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import {useInView} from "react-intersection-observer";
import ContactsForm from "./ContactsForm";

const Contacts: FC<{}> = () => {

    const {ref, inView} = useInView({
        threshold: 0.1
    })
    const contactsTitle = 'CONTACT_ME'.split('').map((char, i) => (
        char !== '_'
            ? <h2 key={i+char} className={`__L${i+1}`} style={inView ? {} : {animationName: 'none'}}>{char}</h2>
            : <h2 key={i+char} style={{opacity: '0'}}>{char}</h2>
    ))
    return (
        <section ref={ref} className="page__contacts">
            <div className="contacts">
                <div className="contacts__container _container">
                    <div className="contacts__title title">
                        <div className={"stringThree"}
                             style={inView ? {display: 'flex'} : {display: 'flex', opacity: '0', transition: 'all 300ms 0s',}}>
                            {contactsTitle}
                        </div>
                    </div>
                    <div className="contacts__body">
                        <div className="contacts__form">
                            <ContactsForm />
                        </div>
                        <div className="contacts__map__container">
                            <YMaps query={{ lang: 'en_US' }}>
                                <Map className="contacts__map" defaultOptions={{tileTransparent: true, brightness: 0}}
                                     defaultState={{ center: [52.1239, 28.4883], zoom: 13 }}
                                     width={400} height={400}>
                                <Placemark geometry={[52.1239, 28.4883]}
                                        //   properties={{hintContent: '!!!'}}
                                        //   options={{
                                        // iconImageHref: '',
                                        // iconImageSize: [130, 130],
                                        //iconImageOffset: [-65, -110]
                                   // }}
                                />
                                </Map>
                            </YMaps>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    )
}

export default Contacts