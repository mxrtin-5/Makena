import { useContext, useState } from 'react';
import styles from './ItemDetailProds.module.css'
import { CartContext } from '../../context/cartContext';

const ItemDetailProd = ({ item }) => {

    const { agregarAlCarrito } = useContext(CartContext)

    const [selectedModel, setSelectedModel] = useState(null);

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const handleAddToCart = () => {
        if (selectedModel) {
            const productInfo = {
                name: item.name,
                price: item.price,
                counter: 1,
                modelo: selectedModel,
            };

            agregarAlCarrito(productInfo);

            console.log(productInfo);
        } else {
            console.log('Selecciona un modelo antes de agregar al carrito');
        }
    };


    return (
        <section className={styles.container} >
            <div className={styles.prod}>
                <h1 className={styles.name}>{item.name}</h1>
                <img className={styles.image} src={item.image} alt="" />
                <div className={styles.buttons}>
                    <p><span>Price:</span>${item.price}</p>
                    <button onClick={handleAddToCart} className={styles.button2}>Agregar al carrito</button>
                </div>

                <div className={styles.seleccionModelo}>
                    <label htmlFor="modelos">Selecciona un Modelo:</label>
                    <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                        <option value="S23">S23</option>
                        <option value="S22">S22</option>
                        <option value="S21">S21</option>
                        <option value="A01">A01</option>
                        <option value="A02">A02</option>
                        <option value="A03">A03</option>
                        <option value="A04">A04</option>
                        <option value="A05">A05</option>
                        <option value="A06">A06</option>
                        <option value="A07">A07</option>
                        <option value="A08">A08</option>
                        <option value="A09">A09</option>
                        <option value="A20">A20</option>
                        <option value="A21">A21</option>
                        <option value="A22">A22</option>

                    </select>
                </div>

            </div>
        </section>
    );
}

export default ItemDetailProd;