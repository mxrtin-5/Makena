import { Link } from "react-router-dom";
import Menu from "./Menu/Menu"
import './Navbar.css'
import { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai'
import Menulist from "./Menu/MenuList";
import CartIcon from "../CartIcon/CartIcon";



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
        <header className="header">
            <div className="header_container">
                <h2 className="title">
                    <Link className="title-content" to={'/'}>
                        <img className="img-logo" src='/20230814_105315_0000.png' alt="" />
                    </Link>
                </h2>

                <CartIcon />

                {isMobile ? <Menu showMenu={showMenu} setShowMenu={setShowMenu} /> : <Menulist />}


                <AiOutlineMenu className="menu-icon" onClick={() => setShowMenu(true)} />

            </div>
        </header>
    );
}

export default Navbar;