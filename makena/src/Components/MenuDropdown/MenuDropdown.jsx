import styles from './MenuDropdown.module.css'


const MenuDropdown = ({ categorias, filterCategory }) => {
    return (
        <div className={styles.div}>
            {
                categorias.map(category => (
                    <button type='button' className={styles.btnCategory} onClick={() => filterCategory(category)} key={category}>
                        {category}
                    </button>
                ))
            }
        </div>
    );
}

export default MenuDropdown;