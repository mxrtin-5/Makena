import styles from './MenuDropdown.module.css'


const MenuDropdown = ({ subCategoriasAnime }) => {
    return (
        <div className={styles.div}>
            {
                subCategoriasAnime.map((subCategoria) =>(
                    <ul>
                        <li className={styles.li}>
                            <a href="">{subCategoria}</a>
                        </li>
                    </ul>
                ))
            }
        </div>
    );
}

export default MenuDropdown;