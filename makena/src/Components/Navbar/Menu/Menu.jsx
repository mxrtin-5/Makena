import './Menu.css'
import Menulist from './MenuList';



const Menu = ({ showMenu, setShowMenu}) => {

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
        </div>

    );
}

export default Menu;