import ItemCard from "../../Components/ItemCard/ItemCard";
import styles from './Catalogo.module.css'
import MenuDropdown from "../../Components/MenuDropdown/MenuDropdown";
import { useFetchProducts } from "../../hooks/fetch-products";
import SubCategoryMenu from "../../Components/SubCategoryMenu/SubCategoryMenu";
import { useState } from "react";


const Catalogo = () => {
    const [
        filterCategory,
        productosFiltrados,
        productos,
        filterSubCategory
    ] = useFetchProducts()
    const [openSubMenu, setOpenSubmenu] = useState(false)
    const [category, setCategory] = useState('')

    const handleCategoryClick = (category) => {
        if (!category) {
            filterCategory()
        } else filterCategory(category);
    };

    const handleSubCategoryClick = (subCat) => {
        filterSubCategory(subCat);
    };


    return (
        <section className={styles.section} >
            <h1>Productos Destacados</h1>

            <MenuDropdown
                {...{
                    handleCategoryClick,
                    productos,
                    setOpenSubmenu,
                    setCategory
                }}
            />
            <SubCategoryMenu
                {...{
                    productos,
                    openSubMenu,
                    setOpenSubmenu,
                    category,
                    handleSubCategoryClick
                }}
            />
            <div className={styles.prods}>
                {
                    productosFiltrados.map((elemento) => (
                        <ItemCard
                            id={elemento.id}
                            name={elemento.name}
                            price={elemento.price}
                            image={elemento.image}
                            key={elemento.id}
                        />
                    ))
                }
            </div>
        </section>
    );
};

export default Catalogo;