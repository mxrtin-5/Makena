import { Link } from "react-router-dom";
import Menu from "./Menu/Menu"
import { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai'
import Menulist from "./Menu/MenuList";
import styles from './Navbar.module.css'



const Navbar = () => {

    const [isMobile, setIsMobile] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1400);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <header className={styles.header}>
            <div className={styles.header_container}>
                <h2 className={styles.title}>
                    <Link className={styles["title-content"]} to={'/'}>
                        <img className={styles["img-logo"]} src='/20230814_105315_0000.png' alt="" />
                    </Link>
                </h2>

                {isMobile ? <Menu showMenu={showMenu} setShowMenu={setShowMenu} /> : <Menulist />}


                <AiOutlineMenu className={styles["menu-icon"]} onClick={() => setShowMenu(true)} />

            </div>
        </header>
    );
}

export default Navbar;