import { css } from "styled-system/css";

export const Footer = () => {

    return (
        <div className={css({
            background: '#141414',
            color: '#e0d8d7',
            padding: '2rem',
        })}>
            ©2023 Adarsh Trivedi, All rights reserved.
        </div>
    );
};

export default Footer;
