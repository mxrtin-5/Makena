/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './MenuDropdown.module.css'
import { AiOutlineArrowDown } from "react-icons/ai";

const MenuDropdown = ({ 
            categorias, 
            subCategorySelected, 
            setSubCategorySelected, 
            handleCategoryClick 
}) => {
    const [open, setOpen] = useState(false)
    const [showSubCategories, setShowSubCategories] = useState(false);

    const handleSubCategoryClick = (subCategory, category) => {
        setSubCategorySelected(subCategory.nombre);
        setShowSubCategories(!showSubCategories);
    };

    return (
        <div className={styles.div}>
            {categorias.map((category) => (
                <div className={styles.divBtn} key={category.nombre}>
                    <button className={styles.button} onClick={() => handleCategoryClick(category)}>
                        {category.nombre}
                    </button>
                    {
                    category.subcategorias.length > 0 && (
                        <AiOutlineArrowDown
                            onClick={() => setOpen(!open)}
                            className={styles.AiOutlineArrowDown}
                        />
                    )}
                    {/* {
                    open && category.subcategorias.length > 0 ? (
                        <div className={styles.subCategories}>
                            {
                            category.subcategorias.map((subCategory) => (
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
                    ) : null
                    } */}
                </div>
            ))}
        </div>
    );
}

export default MenuDropdown;