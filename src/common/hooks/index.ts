import { useEffect, useState } from "react";

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, TState } from "../../bll/store";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector;

export const useWindowSize = () => {
    function getSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        function handleResize() {
            setWindowSize(getSize());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}