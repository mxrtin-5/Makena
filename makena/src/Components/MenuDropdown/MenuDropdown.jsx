import styles from './MenuDropdown.module.css'

const categorias = [
    "Anime",
    "Deporte"
]

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
            </div>
        </div>
    );
}

export default MenuDropdown;