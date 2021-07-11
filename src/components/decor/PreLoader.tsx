import React, {FC} from 'react';
import logo from "./../../assets/png/kranklogo.png"
type TPreLoaderProps = {
    
};
const PreLoader: FC<TPreLoaderProps> = () => {
    return (
        <div className="preloader">
            <div className="preloader__container">
                <img src={logo} alt={'preloader'} />
            </div>
        </div>
    )
}

export default PreLoader