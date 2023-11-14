<<<<<<< HEAD
=======
/* eslint-disable react/prop-types */
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
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
<<<<<<< HEAD
        for (const prod of productos) {
            const sub = prod.categorias.subcategoria;
            if (!newSubCategoria.includes(sub)) {
                newSubCategoria.push(sub);
            }
        }
=======
            for (const prod of productos) {
                const sub = prod.categorias.subcategoria;
                if (!newSubCategoria.includes(sub)) {
                    newSubCategoria.push(sub);
                }
            }
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
        setSubCategoria(newSubCategoria);
    }, [productos])

    useEffect(() => {
        const filteredSubCategoria = Array.from(
<<<<<<< HEAD
            new Set(
                productos
                    .filter((prod) => prod.categorias.categoria === category)
                    .map((prod) => prod.categorias.subcategoria)
            )
        );

        setSubCategoria(filteredSubCategoria);
    }, [category, productos]);
=======
          new Set(
            productos
              .filter((prod) => prod.categorias.categoria === category)
              .map((prod) => prod.categorias.subcategoria)
          )
        );
    
        setSubCategoria(filteredSubCategoria);
      }, [category, productos]);
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354

    return (openSubMenu) ? (
        <div className={styles.div} style={{
            marginTop: '10px'
        }}>
<<<<<<< HEAD
            <div className={styles.divBtn} style={{ gap: '5px' }}>
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
=======
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
>>>>>>> 914d9bde88490199a5494393b5c318ac94051354
        </div>
    ) : null
}

export default SubCategoryMenu;