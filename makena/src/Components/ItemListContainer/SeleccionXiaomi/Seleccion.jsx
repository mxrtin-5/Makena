import ItemCard from "./ItemCard/ItemCard";
import styles from './Seleccion.module.css'


const Seleccion = ({ celulares }) => {


    return (
        <section className={styles.section}>
            <h1 className={styles.tituloSamsungs}>Productos</h1>
            <div className={styles.containerProds}>
                {
                    celulares && celulares.map((cel) => (
                        <ItemCard key={cel.id} item={cel} />
                    ))
                }
            </div>
        </section>
    );
}

export default Seleccion;