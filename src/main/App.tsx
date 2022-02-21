import React, { useEffect, useRef, useState } from 'react';
import '../styles/style.scss';
import ParticlesLower from "./ui/u0-common/decor/ParticlesLower";
import Main from "./ui/Main";
import Header from "./ui/Header";
import EpicBlock from "./ui/u0-common/decor/EpicBlock";
import Footer from "./ui/Footer";
import PreLoader from "./ui/u0-common/decor/PreLoader";
import { useAppDispatch, useAppSelector, useWindowSize } from "../utils/hooks";
import ParticlesUpper from "./ui/u0-common/decor/ParticlesUpper";
import InfoSnackbar from "./ui/u0-common/infoSnackbar/InfoSnackbar";
import { TEmailSendingStatus } from "./bll/reducers/contacts";
import ErrorSnackbar from "./ui/u0-common/errorSnackbar/ErrorSnackbar";
import { setDeviceType, TDevice } from './bll/reducers/app';
import { Sparks } from './ui/u0-common/decor/Sparks';
import { INTERVAL } from '../utils/consts';

function App() {
    const dispatch = useAppDispatch()
    const [height, setHeight] = useState<number>(0)
    const size = useWindowSize()

    const device = useAppSelector<TDevice>(state => state.app.device)
    let isMobileMode = false
    if (device === "mobile" || device === "tablet") {
        isMobileMode = true
    }
    const error = useAppSelector<string>(state => state.contacts.emailFormErrorDescription)
    const info = useAppSelector<TEmailSendingStatus>(state => state.contacts.emailSendingStatus)

    const [loadingStages, incLoadingStages] = useState(0)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const loaded = () => {
        incLoadingStages(loadingStages + 1)
    }
    if (loadingStages === 4 && !isLoaded) {
        setIsLoaded(true)
    }

    const [menuStatus, setMenuStatus] = useState(false)
    const toggleMenu = (status: boolean) => {
        setMenuStatus(status)
        if (status) {
            setScrollLastPosition(window.scrollY)
        }
    }
    useEffect(() => {
        if (!menuStatus) {
            window.scrollTo({ top: scrollLastPosition })
        }
    }, [menuStatus])
    const [scrollLastPosition, setScrollLastPosition] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (ref.current
            && ref.current.offsetHeight !== height
            && isLoaded) {
            ref.current && setHeight(ref.current?.offsetHeight)
        }

    }, [size, height, isLoaded])
    console.log('app render')

    useEffect(() => {
        // $md1: 1182;
        // $md2: 991.98;
        // $md3: 767.98;
        // $md5: 479.98;
        switch (true) {
            case size.width <= 479.98: {
                device !== 'mobile' && dispatch(setDeviceType('mobile'));
                break;
            }
            case size.width > 479.98 && size.width <= 767.98: {
                device !== 'tablet' && dispatch(setDeviceType('tablet'));
                break;
            }
            case size.width > 767.98 && size.width <= 991.98: {
                device !== 'laptop' && dispatch(setDeviceType('laptop'));
                break;
            }
            case size.width > 991.98: {
                device !== 'desktop' && dispatch(setDeviceType('desktop'));
                break;
            }
            // no default
        }
    }, [size.width]);

    // scrolling page processing
    let request: number
    const scrollContainerMain = useRef<HTMLDivElement>(null);
    const scrollContainerEpic = useRef<HTMLDivElement>(null);
    const scrollContainerFooter = useRef<HTMLDivElement>(null);
    const scrollData = {
        ease: isMobileMode ? 1 : 0.2,
        current: 0,
        previous: scrollLastPosition,
        rounded: 0
    }
    let now = Date.now();
    let previous = now;
    useEffect(() => {
        // @ts-ignore
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        request = requestAnimationFrame(() => scrolling(menuStatus))
        return () => cancelAnimationFrame(request)
    }, [menuStatus])
    const scrolling = (menuStatus: boolean) => {
        request = requestAnimationFrame(() => scrolling(menuStatus))

        now = Date.now()
        let delta = now - previous;
        if (delta > INTERVAL) {
            previous = now - Math.round(delta % INTERVAL);
            if (menuStatus) {
                scrollData.current = scrollLastPosition
                scrollData.previous = scrollLastPosition
            }
            else {
                scrollData.current = window.scrollY
                scrollData.previous += (scrollData.current - scrollData.previous) * scrollData.ease
            }
            scrollData.rounded = Math.round(scrollData.previous * 100) / 100
                if (scrollContainerMain.current) {
                    scrollContainerMain.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
                }
                if (scrollContainerEpic.current) {
                    scrollContainerEpic.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
                }
                if (scrollContainerFooter.current) {
                    scrollContainerFooter.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
                }
        }

    }


    return (
        <div style={menuStatus
            ? { height: `${height}px`, position: 'fixed', overflowY: 'hidden' }
            : { height: `${height}px`, }}>
            {info !== 'Idle' && <InfoSnackbar info={info} />}
            <ErrorSnackbar error={error} />
            <div ref={ref} className="wrapper" style={menuStatus && !isMobileMode
                ? { paddingRight: '17px', }
                : {}}>
                <Header loaded={loaded}
                    isLoaded={isLoaded}
                    toggleMenu={toggleMenu}
                    menuStatus={menuStatus} />
                <div ref={scrollContainerMain}
                    style={{ transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)', zIndex: 2 }}>
                    <Main loaded={loaded}
                        isLoaded={isLoaded} />
                </div>
                <div ref={scrollContainerEpic}
                    style={{ transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)', zIndex: 0 }}>
                    <EpicBlock loaded={loaded} />
                </div>
                <div ref={scrollContainerFooter}
                    style={{ transition: 'all 500ms cubic-bezier(0.3, 1, 1, 1)', zIndex: 5 }}>
                    <Footer />
                </div>
                {!isLoaded && <PreLoader />}
                <Sparks isMobileMode={ isMobileMode }/>
                {/*  <ParticlesLower/> */}
                <ParticlesUpper />
            </div>
        </div>
    )
}

export default App;