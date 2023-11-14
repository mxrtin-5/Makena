<<<<<<< HEAD
=======
/* eslint-disable react/prop-types */
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
import styles from './MenuDropdown.module.css'

const categorias = [
    "Anime",
    "Deporte"
]

<<<<<<< HEAD
const MenuDropdown = ({ handleCategoryClick, setOpenSubmenu, setCategory }) => {
    return (
        <div className={styles.div}>
            <div className={styles.divBtn} style={{ gap: '5px' }}>
                <button className={styles.button} onClick={() => {
                    handleCategoryClick()
                    setOpenSubmenu(false)
                }}>
                    Todos
                </button>
                {
                    categorias.map((category, index) => (
                        <button className={styles.button} key={index} onClick={() => {
                            handleCategoryClick(category)
                            setCategory(category)
                            setOpenSubmenu(true)
                        }}>
                            {category}
                        </button>
                    ))}
=======
const MenuDropdown = ({handleCategoryClick, setOpenSubmenu, setCategory}) => {
    return (
        <div className={styles.div}>
            <div className={styles.divBtn} style={{gap: '5px'}}>
            <button className={styles.button} onClick={() => {
                handleCategoryClick()
                setOpenSubmenu(false)
            }}>
                Todos
            </button>
            {
                categorias.map((category, index) => (
                    <button className={styles.button} key={index} onClick={() => {
                        handleCategoryClick(category)
                        setCategory(category)
                        setOpenSubmenu(true)
                    }}>
                        {category}
                    </button>
            ))}
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
            </div>
        </div>
    );
}

export default MenuDropdown;