import { useState } from 'react';
import './Menu.css'
import Menulist from './MenuList';
import Carrito from '../../Carrito/Carrito';
import CartIcon from '../../CartIcon/CartIcon';



const Menu = ({ showMenu, setShowMenu}) => {

    
    const [active, setActive] = useState(false)


    const handleToggle = () => {
        setShowMenu(!showMenu);
    }


    return (
        <div>
            <div className={showMenu ? 'menu' : 'menu-active'}>
                <div className={showMenu ? 'menulist menulist-active' : 'menulist'}>
                    
                    <Menulist cerrar={handleToggle} />
                </div>
            </div>

            <div onClick={() => setActive(!active)} className='cart-widget-container'>
                    <CartIcon />

                    {active && <Carrito />}
                </div>

            
        </div>

    );
}

export default Menu;