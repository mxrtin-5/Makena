/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../MenuDropdown/MenuDropdown.module.css'
import { useEffect } from 'react';
import { useState } from 'react';

const SubCategoryMenu = ({
    productos,
    openSubMenu = false,
    setOpenSubmenu,
    category,
    handleSubCategoryClick
}) => {
    const [subCategoria, setSubCategoria] = useState([]);

    useEffect(() => {
        const newSubCategoria = [];
            for (const prod of productos) {
                const sub = prod.categorias.subcategoria;
                if (!newSubCategoria.includes(sub)) {
                    newSubCategoria.push(sub);
                }
            }
        setSubCategoria(newSubCategoria);
    }, [productos])

    useEffect(() => {
        const filteredSubCategoria = Array.from(
          new Set(
            productos
              .filter((prod) => prod.categorias.categoria === category)
              .map((prod) => prod.categorias.subcategoria)
          )
        );
    
        setSubCategoria(filteredSubCategoria);
      }, [category, productos]);

    return (openSubMenu) ? (
        <div className={styles.div} style={{
            marginTop: '10px'
        }}>
                <div className={styles.divBtn} style={{gap: '5px'}}>
                        {
                            subCategoria.map((subCat, index) => open && (
                            <button 
                                className={styles.button} key={index}
                                onClick={() => {
                                    setOpenSubmenu(false)
                                    handleSubCategoryClick(subCat)
                                }}
                            >
                                <React.Fragment>
                                    {subCat}
                                </React.Fragment>
                            </button>
                         ))
                        }
                </div>
        </div>
    ) : null
}

export default SubCategoryMenu;