import { useState } from 'react';
import styles from './MenuDropdown.module.css'
import { AiOutlineArrowDown } from "react-icons/ai";

const MenuDropdown = ({ categorias, subCategorySelected, setSubCategorySelected }) => {

    const [showSubCategories, setShowSubCategories] = useState(false);

    const handleCategoryClick = (category) => {
        setValueSelected(category.nombre);
        filterCategory(category.nombre);
        setShowSubCategories(category.subcategorias.length > 0);
        setSubCategorySelected("");
    };

    const handleSubCategoryClick = (subCategory, category) => {
        setValueSelected(subCategory.nombre);
        setSubCategorySelected(subCategory.nombre);
        filterCategory(subCategory.nombre, category.nombre);
        setShowSubCategories(false);
    };

    return (
        <div className={styles.div}>
            {categorias.map((category) => (
                <div className={styles.divBtn} key={category.nombre}>
                    <button className={styles.button} onClick={() => handleCategoryClick(category)}>
                        {category.nombre}
                    </button>
                    {category.subcategorias.length > 0 && (
                        <AiOutlineArrowDown
                            onClick={handleArrowClick}
                            className={styles.AiOutlineArrowDown}
                        />
                    )}
                    {showSubCategories && category.subcategorias.length > 0 ? (
                        <div className={styles.subCategories}>
                            {category.subcategorias.map((subCategory) => (
                                <button
                                    key={subCategory.nombre}
                                    className={
                                        subCategorySelected === subCategory.nombre
                                            ? styles.subCategorySelected
                                            : styles.subCategory
                                    }
                                    onClick={() => setSubCategorySelected(subCategory.nombre)}
                                >
                                    {subCategory.nombre}
                                </button>
                            ))}
                        </div>
                    ) : null}
                </div>
            ))}
        </div>
    );
}

export default MenuDropdown;