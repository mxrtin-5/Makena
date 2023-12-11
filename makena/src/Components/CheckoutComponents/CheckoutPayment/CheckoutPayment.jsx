import styles from './CheckoutPayment.module.css'
import ButtonMP from '../../buttonMP/ButtonMP';
import { useContext } from 'react';
import { DataContext } from '../../../context/dataContext';

const CheckoutPayment = () => {

    const { orderData } = useContext(DataContext)

    return (
        <div className={styles.payment}>
            <p>Email: {orderData.email}</p>
            <p>Localidad: {orderData.localidad}</p>
            <p>Provincia: {orderData.provincia}</p>
            <p>Direccion: {orderData.direccion}</p>
            <p>Barrio: {orderData.barrio}</p>
            <p>Sucursal: {orderData.sucursal}</p>
            <p>CP: {orderData.codigoPostal}</p>
            <p>Opciones Envio: {orderData.opcionesEnvio}</p>
            <p>Observaciones: {orderData.observaciones}</p>
            <p>Eleccion: {orderData.eleccion}</p>


            <ButtonMP />
        </div>
    );
};

export default CheckoutPayment;