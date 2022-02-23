import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles/style.scss';
import ParticlesLower from "./elements/decor/ParticlesLower";
import Main from "./Main";
import Header from "./Header";
import EpicBlock from "./elements/decor/EpicBlock";
import Footer from "./Footer";
import PreLoader from "./elements/decor/PreLoader";
import { useAppDispatch, useAppSelector, useWindowSize } from "../common/hooks";
import ParticlesUpper from "./elements/decor/ParticlesUpper";
import InfoSnackbar from "./elements/infoSnackbar/InfoSnackbar";
import { TEmailSendingStatus } from "../bll/reducers/contacts";
import ErrorSnackbar from "./elements/errorSnackbar/ErrorSnackbar";
import { setDeviceType, TDevice } from '../bll/reducers/app';
import { Sparks } from './elements/decor/Sparks';
import { INTERVAL } from '../common/consts';

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
            setHeight(ref.current.offsetHeight)
        }
        setMenuStatus(false)

    }, [size, height, isLoaded])

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
    const requestRef = useRef<number>();
    const previousTimeRef = useRef<number>();
    const paintQueueRef = useRef<(arg: number) => void | null>();

    const scrollContainerMain = useRef<HTMLDivElement>(null);
    const scrollContainerEpic = useRef<HTMLDivElement>(null);
    const scrollContainerFooter = useRef<HTMLDivElement>(null);
    const scrollData = {
        ease: isMobileMode ? 1 : 0.2,
        current: 0,
        previous: scrollLastPosition,
        rounded: 0
    }
    const timeData = {
        now: 0,
        previous: 0,
        delta: 0,
        ticking: false
    }
    let latestKnownScrollY = 0;
    const setCallback = useCallback((callback: (arg: number) => void) => {
        paintQueueRef.current = callback
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            latestKnownScrollY = window.scrollY;
            console.log("scroll");
        })
        window.addEventListener('touchmove', (e) => {
            if (timeData.ticking) {
                e.preventDefault()
                return
            }
            timeData.ticking = true
        }, { passive: false })
        window.addEventListener('drag', (e) => {
            e.preventDefault()
        }, { passive: false })
        // @ts-ignore
        const requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        requestRef.current = requestAnimationFrame(render)
        return () => cancelAnimationFrame(requestRef.current!)
    }, [])

    const render = (now: number) => {
        if (!previousTimeRef.current) {
            previousTimeRef.current = now
        }
        timeData.delta = now - previousTimeRef.current!;
        paintQueueRef.current && paintQueueRef.current(timeData.delta)
        requestRef.current = requestAnimationFrame(render)
        scrolling(timeData.delta)
        if (timeData.delta > INTERVAL) {
            timeData.ticking = false
            previousTimeRef.current = now - Math.round(timeData.delta % INTERVAL);
        }
        console.log(Math.round(timeData.delta));
    }

    const scrolling = (deltaTime: number) => {
        if (deltaTime < INTERVAL) return
        const scrollY = latestKnownScrollY;
        if (menuStatus) {
            scrollData.current = scrollLastPosition
            scrollData.previous = scrollLastPosition
        }
        else {
            scrollData.current = scrollY
            if (scrollData.current !== Math.round(scrollData.previous)) {
                scrollData.previous += (scrollData.current - scrollData.previous) * scrollData.ease
            }

            console.log(scrollData.previous);

        }
        scrollData.rounded = Math.round(scrollData.previous * 100) / 100
        if (scrollData.current !== Math.round(scrollData.previous)
            && scrollContainerMain.current
            && scrollContainerEpic.current
            && scrollContainerFooter.current) {
            scrollContainerMain.current.style.willChange = "transform"
            scrollContainerMain.current.style.transform = `translate3d(0, -${scrollData.rounded}px, 0)`
            scrollContainerEpic.current.style.willChange = "transform"
            scrollContainerEpic.current.style.transform = `translate(0, -${scrollData.rounded}px)`
            scrollContainerFooter.current.style.willChange = "transform"
            scrollContainerFooter.current.style.transform = `translate(0, -${scrollData.rounded}px)`
        } else {
            if (scrollContainerMain.current) {
                scrollContainerMain.current.style.willChange = "auto"
            }
            if (scrollContainerEpic.current) {
                scrollContainerEpic.current.style.willChange = "auto"
            }
            if (scrollContainerFooter.current) {
                scrollContainerFooter.current.style.willChange = "auto"
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
                <Sparks isMobileMode={isMobileMode} setCallback={setCallback} />
                <ParticlesLower />
                <ParticlesUpper />
            </div>
        </div>
    )
}

export default App;
