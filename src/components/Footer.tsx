import React, {CSSProperties, FC} from 'react';
import {useInView} from "react-intersection-observer";
import logo from "./../assets/png/kranklogo.png"
import TelegramIcon from '@material-ui/icons/Telegram';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {createTheme} from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';

type TFooterProps = {
    scrollDistance: number
    height: number
    wHeight: number
};
const theme = createTheme({
    palette: {
        text: {
            primary: '#ffffcc'
        },
        primary: {
            main: '#aa0000',
        },
        secondary: {
            main: '#ffffcc',
        },
    },
});
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
        <ThemeProvider theme={theme}>
            <footer ref={ref} className="footer" style={lastSectStyle()}>
                <div className="footer__content _container">
                    <div className="footer__firstBlock">
                        <p className="footer__text text">
                            ©2021 Krankenkopf ‒ All right!
                        </p>
                        <div>
                            <TelegramIcon className="footer__icon icon" color={'secondary'}/>
                            <GitHubIcon className="footer__icon icon" color={'secondary'} />
                            <LinkedInIcon className="footer__icon icon" color={'secondary'} />
                            <InstagramIcon className="footer__icon icon" color={'secondary'} />
                        </div>
                    </div>
                    <div className="footer__logo">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>

            </footer>
        </ThemeProvider>

    )
}

export default Footer