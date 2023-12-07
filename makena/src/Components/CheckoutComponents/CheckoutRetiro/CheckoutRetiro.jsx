import styles from './CheckoutRetiro.module.css'


const CheckoutRetiro = ({ nextPage }) => {
    return (
        <div>
            <h2>Lo retiras por Lanus Oeste a 15m de la estacion</h2>

            <button className={styles.btn} onClick={nextPage}>Siguiente</button>
        </div>
    );
}

export default CheckoutRetiro;