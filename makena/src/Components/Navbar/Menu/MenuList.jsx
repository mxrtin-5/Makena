import { useRef} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import './Menu.css'
import CartIcon from "../../CartIcon/CartIcon";


const Menulist = ({ cerrar }) => {


    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    const handleCloseMenu = () => {
        navRef.current.classList.remove("responsive_nav");
        cerrar()
    };


    return (
        <div className="nav-container">

            <nav ref={navRef} onClick={handleCloseMenu} className='menulist'>
                <Link onClick={showNavbar} className="menulist__link active" to="/">Inicio</Link>
                <Link onClick={showNavbar} className="menulist__link" to="/crear-funda/seleccion">Crear Funda</Link>
                <Link onClick={showNavbar} className="menulist__link" to="/contacto">Contacto</Link>

                <button className="nav-btn nav-close-btn" onClick={handleCloseMenu}>
                    <AiOutlineClose />
                </button>

            </nav>

            <CartIcon />

        </div>
    );
}

export default Menulist;