import React, { useState } from "react";
import styles from './Navbar.module.css';
import FishLogo from '../../assets/navbar_logo.png';

// const arrOfItems = [
//     {
//         text : "top",
//         click: () => {},
//         link: '/top'
//     }
// ];

const Navbar = ({ arrOfItems }) => {

    const [mobile, setMobile] = useState(window.innerWidth < 600);
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

    return (
        <>            
            {
                mobile ?
                    <>
                        <div className={styles.navbar_mobile}>
                            <div className={styles.logo}>
                                <img className={styles.logo_img} width="40" src={FishLogo} />
                            </div>
                            <div className={styles.menu_button} onClick={() => { setMobileMenuIsOpen(true) }}>
                                <svg height="40" width="40" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="white" />
                                </svg>
                            </div>
                        </div>
                        {
                            mobileMenuIsOpen &&
                            <div className={styles.menu_open_container} onClick={() => { setMobileMenuIsOpen(false) }}>
                                <div className={styles.menu_open}>
                                    <div className={styles.menu_button_close} onClick={() => { setMobileMenuIsOpen(false) }}>
                                        <svg height="40" width="40" viewBox="0 0 24 24">
                                            <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"></path>
                                        </svg>
                                    </div>
                                    <div onClick={(e) => { e.stopPropagation(); }}>
                                        {
                                            arrOfItems?.map((navItem, key) => {
                                                return <div className={styles.navbar_item_mobile} key={key} onClick={() => { setMobileMenuIsOpen(false); navItem?.click(navItem?.link); }}>{navItem?.text}</div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                    :

                    <div className={styles.navbar_desktop}>
                        <div className={styles.logo}>
                            LOGO
                        </div>
                        <div>
                            {
                                arrOfItems?.reverse()?.map((navItem, key) => {
                                    return <div className={styles.navbar_item_desktop} key={key} onClick={() => { navItem?.click(navItem?.link) }}>{navItem?.text}</div>
                                })
                            }
                        </div>
                    </div>
            }
        </>
    );
};

export default Navbar;
