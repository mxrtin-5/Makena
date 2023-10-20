import styles from './ItemDetailProds.module.css'

const ItemDetailProd = ({ item }) => {
    return (
        <section className={styles.container} >
            <div className={styles.prod}>
                <h1 className={styles.name}>{item.name}</h1>
                <img className={styles.image} src={item.image} alt="" />
                <div className={styles.buttons}>
                    <p><span>Price:</span>${item.price}</p>
                    <button>Agregar al carrito</button>
                </div>

            </div>
        </section>
    );
}

export default ItemDetailProd;