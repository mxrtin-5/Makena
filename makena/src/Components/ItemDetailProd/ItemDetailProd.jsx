import { useContext, useState } from 'react';
import styles from './ItemDetailProds.module.css'
import { CartContext } from '../../context/cartContext';

const ItemDetailProd = ({ item }) => {

    const { agregarAlCarrito } = useContext(CartContext);

    const [selectedModel, setSelectedModel] = useState('');

    const [selectedMarca, setSelectedMarca] = useState('');

    const [marca, setMarca] = useState(null);

    const handleModelChange = (event) => {
        setSelectedModel(event.target.value);
    };

    const handleMarcaChange = (event) => {
        setSelectedMarca(event.target.value);
    }

    const handleAddToCart = () => {
        if (selectedModel) {
            const productInfo = {
                name: item.name,
                price: item.price,
                counter: 1,
                modelo: selectedModel,
            };

            agregarAlCarrito(productInfo);

        } else {
            console.log('Selecciona un modelo antes de agregar al carrito');
        }
    };


    return (
        <section className={styles.container}>
            <div className={styles.prod}>
                <h1 className={styles.name}>{item.name}</h1>
                <img className={styles.image} src={item.image} alt="" />
                <div className={styles.buttons}>
                    <p><span>Price:</span>${item.price}</p>
                    <button onClick={handleAddToCart} className={styles.button2}>Agregar al carrito</button>
                </div>

                <div className={styles.seleccionMarca}>
                    <label htmlFor="marca">Selecciona una Marca:</label>
                    <select name="options" id="" onChange={handleMarcaChange} value={selectedMarca}>
                        <option value="Select">Select</option>
                        <option onClick={() => setMarca('Samsung')} value="Samsung">Samsung</option>
                        <option onClick={() => setMarca('Apple')} value="Apple">Apple</option>
                        <option onClick={() => setMarca('Xiaomi')} value="Xiaomi">Xiaomi</option>
                        <option onClick={() => setMarca('LG')} value="LG">LG</option>
                        <option onClick={() => setMarca('Motorola')} value="Motorola">Motorola</option>
                        <option onClick={() => setMarca('ZTE')} value="ZTE">ZTE</option>
                    </select>
                </div>

                {
                    selectedMarca === 'Samsung' && (
                        <div className={styles.seleccionModeloSamsung}>
                            <label htmlFor="modelos">Selecciona un Modelo:</label>
                            <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                                <option value="Select">Select</option>
                                <option value="A01">A01</option>
                                <option value="A01 Core">A01 Core</option>
                                <option value="A02">A02</option>
                                <option value="A02s">A02s</option>
                                <option value="A03">A03</option>
                                <option value="A03s">A03s</option>
                                <option value="A03 core">A03 core</option>
                                <option value="A04">A04</option>
                                <option value="A04E">A04E</option>
                                <option value="A04S">A04S</option>
                                <option value="A13 5g">A13 5g</option>
                                <option value="A10">A10</option>
                                <option value="A10s">A10s</option>
                                <option value="A11">A11</option>
                                <option value="M11">M11</option>
                                <option value="M12">M12</option>
                                <option value="A12">A12</option>
                                <option value="A13 4G">A13 4G</option>
                                <option value="A04s">A04s</option>
                                <option value="A13 5g">A13 5g</option>
                                <option value="A14">A14</option>
                                <option value="a30">a30</option>
                                <option value="A20">A20</option>
                                <option value="A20s">A20s</option>
                                <option value="A21">A21</option>
                                <option value="A21s">A21s</option>
                                <option value="A22 4g">A22 4g</option>
                                <option value="A22 5g">A22 5g</option>
                                <option value="A23">A23</option>
                                <option value="A24">A24</option>
                                <option value="a50">a50</option>
                                <option value="A30s">A30s</option>
                                <option value="A31">A31</option>
                                <option value="A32 4G">A32 4G</option>
                                <option value="A32 5G">A32 5G</option>
                                <option value="A33 5G">A33 5G</option>
                                <option value="A34 (5G)">A34 (5G)</option>
                                <option value="A50">A50</option>
                                <option value="A30s">A30s</option>
                                <option value="A51">A51</option>
                                <option value="A52">A52</option>
                                <option value="A52s">A52s</option>
                                <option value="A53 5G">A53 5G</option>
                                <option value="A54 (5G)">A54 (5G)</option>
                                <option value="A70">A70</option>
                                <option value="A71">A71</option>
                                <option value="A72">A72</option>
                                <option value="J2 CORE">J2 CORE</option>
                                <option value="J2 Prime">J2 Prime</option>
                                <option value="J4 2018">J4 2018</option>
                                <option value="J4 Plus">J4 Plus</option>
                                <option value="J5 2016">J5 2016</option>
                                <option value="J5 Prime">J5 Prime</option>
                                <option value="J6 2018">J6 2018</option>
                                <option value="J6 Plus/PRIME">J6 Plus/PRIME</option>
                                <option value="J7 2015">J7 2015</option>
                                <option value="J7 Neo (SM-J701)">J7 Neo (SM-J701)</option>
                                <option value="J7 2016">J7 2016</option>
                                <option value="J7 2018">J7 2018</option>
                                <option value="J7 Prime">J7 Prime</option>
                                <option value="J8">J8</option>
                                <option value="Galaxy Note 10">Galaxy Note 10</option>
                                <option value="Galaxy Note 10 Plus">Galaxy Note 10 Plus</option>
                                <option value="Galaxy Note 20">Galaxy Note 20</option>
                                <option value="Galaxy Note 20 Ultra">Galaxy Note 20 Ultra</option>
                                <option value="S8">S8</option>
                                <option value="S8 Plus">S8 Plus</option>
                                <option value="S9">S9</option>
                                <option value="S9 Plus">S9 Plus</option>
                                <option value="S10">S10</option>
                                <option value="S10 plus">S10 plus</option>
                                <option value="S20">S20</option>
                                <option value="S20 Plus">S20 Plus</option>
                                <option value="S20 ultra">S20 ultra</option>
                                <option value="S20 fe">S20 fe</option>
                                <option value="S21">S21</option>
                                <option value="S21 ultra">S21 ultra</option>
                                <option value="S21 Plus">S21 Plus</option>
                                <option value="S21 fe">S21 fe</option>
                                <option value="S22">S22</option>
                                <option value="S22 ultra">S22 ultra</option>
                                <option value="S23">S23</option>
                                <option value="S23 Plus">S23 Plus</option>
                                <option value="S23 ultra">S23 ultra</option>
                                <option value="M13">M13</option>
                                <option value="M23/F23">M23/F23</option>
                                <option value="Z FLIP 3">Z FLIP 3</option>
                            </select>
                        </div>
                    )
                }

                {
                    selectedMarca === 'Apple' && (
                        <div className={styles.seleccionModeloSamsung}>
                            <label htmlFor="modelos">Selecciona un Modelo:</label>
                            <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                                <option value="Select">Select</option>
                                <option value="Iphone11">Iphone 11</option>
                                <option value="Iphone11Pro">Iphone 11 Pro</option>
                                <option value="Iphone11ProMax">Iphone 11 pro max</option>
                                <option value="Iphone12">Iphone 12</option>
                                <option value="Iphone12Pro">Iphone 12 Pro</option>
                                <option value="Iphone12Mini">Iphone 12 mini</option>
                                <option value="Iphone12ProMax">Iphone 12 pro max</option>
                                <option value="Iphone13">Iphone 13</option>
                                <option value="Iphone13mini">Iphone 13 mini</option>
                                <option value="Iphone13Pro">Iphone 13 pro</option>
                                <option value="Iphone13ProMax">Iphone 13 pro max</option>
                                <option value="Iphone14">Iphone 14</option>
                                <option value="Iphone14Pro">Iphone 14 Pro</option>
                                <option value="Iphone14Plus">Iphone 14 Plus</option>
                                <option value="Iphone14ProMax">Iphone 14 pro max</option>
                                <option value="Iphone15">Iphone 15</option>
                                <option value="Iphone 15ProMax">Iphone 15 pro max</option>
                                <option value="Iphone6">IPhone 6</option>
                                <option value="Iphone6s">IPhone 6s</option>
                                <option value="Iphone6Plus">IPhone 6 Plus</option>
                                <option value="Iphone6sPlus">IPhone 6s Plus</option>
                                <option value="Iphone7">IPhone 7</option>
                                <option value="Iphone7Plus">IPhone 7 Plus</option>
                                <option value="Iphone8">IPhone 8</option>
                                <option value="Iphone8Plus">IPhone 8 Plus</option>
                                <option value="IphoneSE">IPhone SE 2020</option>
                                <option value="IphoneX">IPhone X</option>
                                <option value="IphoneXS">IPhone XS</option>
                                <option value="IphoneXR">IPhone XR</option>
                                <option value="IphoneXSMax">IPhone XS Max</option>
                                {/* ... Agrega más modelos de Apple según sea necesario */}
                            </select>
                        </div>
                    )
                }

                {
                    selectedMarca === 'LG' && (
                        <div className={styles.seleccionModeloSamsung}>
                            <label htmlFor="modelos">Selecciona un Modelo:</label>
                            <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                                <option value="Select">Select</option>
                                <option value="K22">K22</option>
                                <option value="K41s">K41s</option>
                                <option value="K42">K42</option>
                                <option value="K50/Q60">K50/Q60</option>
                                <option value="K51s">K51s</option>
                                <option value="K52/ K62">K52/ K62</option>
                                <option value="K61">K61</option>
                                <option value="Velvet">Velvet</option>
                                {/* ... Agrega más modelos de LG según sea necesario */}
                            </select>
                        </div>
                    )
                }

                {
                    selectedMarca === 'Xiaomi' && (
                        <div className={styles.seleccionModeloSamsung}>
                            <label htmlFor="modelos">Selecciona un Modelo:</label>
                            <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                                <option value="Select">Select</option>
                                <option value="Redmi 9">Redmi 9</option>
                                <option value="Redmi 9a">Redmi 9a</option>
                                <option value="Redmi 9c">Redmi 9c</option>
                                <option value="Redmi 10c">Redmi 10c</option>
                                <option value="Redmi 12c">Redmi 12c</option>
                                <option value="Redmi Mi 9t">Redmi Mi 9t</option>
                                <option value="Redmi Note 7">Redmi Note 7</option>
                                <option value="Redmi note 8">Redmi note 8</option>
                                <option value="Redmi note 8 pro">Redmi note 8 pro</option>
                                <option value="Redmi Note 9">Redmi Note 9</option>
                                <option value="Redmi Note 9 pro">Redmi Note 9pro</option>
                                <option value="Redmi Note 9 S">Redmi Note 9s</option>
                                <option value="Redmi Note 10 (4G)">Redmi Note 10 (4G)</option>
                                <option value="Redmi Note 10 (5G)">Redmi Note 10 (5G)</option>
                                <option value="POCO M3 PRO">POCO M3 PRO</option>
                                <option value="Redmi Note 10 Pro">Redmi Note 10 Pro</option>
                                <option value="Redmi note 11">Redmi note 11</option>
                                <option value="Redmi Note 11s">Redmi Note 11s</option>
                                <option value="Redmi Note 11 Pro 4G ">Redmi Note 11 Pro 4G</option>
                                <option value="Redmi Note 11 Pro 5G">Redmi Note 11 Pro 5G</option>
                                <option value="Redmi Note 12 pro 4G">Redmi Note 12 Pro 4G</option>
                                <option value="Redmi Note 12 5G ">Redmi Note 12 5G</option>
                                <option value="POCO X5">POCO X5</option>
                                <option value="Redmi Note 12 Pro 5g">Redmi Note 12 Pro 5g</option>
                                <option value="Redmi Note 12 4g">Redmi Note 12 4g</option>
                                <option value="Redmi Note 12 S 4g">Redmi Note 12 S 4g</option>
                                <option value="Redmi Poco X3">Redmi Poco X3</option>
                                <option value="Redmi Poco pro">Redmi Poco Pro</option>
                                <option value="Redmi Poco x4 pro 5G">Redmi Poco x4 pro 5G</option>
                                <option value="Redmi Poco x5 pro ">Redmi Poco x5 pro</option>
                                <option value="Note 12 pro Speed">Note 12 pro Speed</option>
                                <option value="Redmi Poco F3">Redmi Poco F3</option>
                                <option value="Redmi Poco k40">Redmi Poco k40</option>
                                <option value="Redmi Poco k40+">Redmi Poco k40+</option>
                                <option value="Note 12 pro Speed">Note 12 pro Speed</option>
                                <option value="Redmi Poco F4">Redmi Poco F4</option>
                                <option value="Redmi Poco K40s">Note 12 pro Speed</option>
                                <option value="Redmi Poco F5">Redmi Poco F5</option>
                                <option value="Redmi Note 12 turbo">Note 12 turbo</option>
                            </select>
                        </div>
                    )
                }

                {
                    selectedMarca === 'Motorola' && (
                        <div className={styles.seleccionModeloSamsung}>
                            <label htmlFor="modelos">Selecciona un Modelo:</label>
                            <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                                <option value="Select">Select</option>
                                <option value="E4 plus">E4 plus</option>
                                <option value="E5">E5</option>
                                <option value="G6 play">G6 play</option>
                                <option value="E5 Play">E5 Play</option>
                                <option value="E5 plus">E5 plus</option>
                                <option value="E6i/E6s">E6i/E6s</option>
                                <option value="E6 plus">E6 plus</option>
                                <option value="E6 play">E6 play</option>
                                <option value="E7">E7</option>
                                <option value="E7power">E7power</option>
                                <option value="E7i power">E7i power</option>
                                <option value="E7plus">E7plus</option>
                                <option value="G9 play">G9 play</option>
                                <option value="E13">E13</option>
                                <option value="E20">E20</option>
                                <option value="E22">E22</option>
                                <option value="E22i">E22i</option>
                                <option value="E32">E32</option>
                                <option value="E32s">E32s</option>
                                <option value="E40">E40</option>
                                <option value="Edge 20 lite">Edge 20 lite</option>
                                <option value="Edge 20 Pro">Edge 20 Pro</option>
                                <option value="Edge 30">Edge 30</option>
                                <option value="Edge 30 fusion">Edge 30 fusion</option>
                                <option value="Edge 30 ultra">Edge 30 ultra</option>
                                <option value="Edge 30 Neo">Edge 30 Neo</option>
                                <option value="Edge 30 Pro">Edge 30 Pro</option>
                                <option value="Edge 40 ">Edge 40 </option>
                                <option value="Edge 40 Pro">Edge 40 Pro</option>
                                <option value="G5">G5</option>
                                <option value="G5 Plus">G5 Plus</option>
                                <option value="G5s">G5s</option>
                                <option value="G5s Plus">G5s Plus</option>
                                <option value="G6 Play">G6 Play</option>
                                <option value="MOTO E5">MOTO E5</option>
                                <option value="G6">G6</option>
                                <option value="G6 Plus">G6 Plus</option>
                                <option value="G7">G7</option>
                                <option value="G7 Plus">G7 Plus</option>
                                <option value="G7 Play">G7 Play</option>
                                <option value="G7 power">G7 power</option>
                                <option value="G8">G8</option>
                                <option value="G8 Play">G8 Play</option>
                                <option value="One Macro">One Macro</option>
                                <option value="G8 Plus">G8 Plus</option>
                                <option value="G8 Power">G8 Power</option>
                                <option value="G8 Power Lite">G8 Power Lite</option>
                                <option value="G9 Plus">G9 Plus</option>
                                <option value="G9 Power">G9 Power</option>
                                <option value="G9 Play">G9 Play</option>
                                <option value="E7 Plus">E7 Plus</option>
                                <option value="G10">G10</option>
                                <option value="G20">G20</option>
                                <option value="G30">G30</option>
                                <option value="G23">G23</option>
                                <option value="G13">G13</option>
                                <option value="G53">G53</option>
                                <option value="G22">G22</option>
                                <option value="G31">G31</option>
                                <option value="G32">G32</option>
                                <option value="G41">G41</option>
                                <option value="G42">G42</option>
                                <option value="G51">G51</option>
                                <option value="G52">G52</option>
                                <option value="G82">G82</option>
                                <option value="G60">G60</option>
                                <option value="G60s">G60s</option>
                                <option value="G71">G71</option>
                                <option value="G72">G72</option>
                                <option value="G100">G100</option>
                                <option value="G200">G200</option>
                                <option value="Moto One">Moto One</option>
                                <option value="Moto one hyper">Moto one hyper</option>
                                <option value="Moto one fusion">Moto one fusion</option>
                                <option value="Moto One Macro">Moto One Macro</option>
                                <option value="G8 Play">G8 Play</option>
                                <option value="Moto One Vision">Moto One Vision</option>
                                <option value="P40">P40</option>
                                <option value="Moto One Action">Moto One Action</option>
                            </select>
                        </div>
                    )
                }

                {
                    selectedMarca === 'ZTE' && (
                        <div className={styles.seleccionModeloSamsung}>
                            <label htmlFor="modelos">Selecciona un Modelo:</label>
                            <select name="options" id="" onChange={handleModelChange} value={selectedModel}>
                                <option value="Select">Select</option>
                                <option value="Blade A53+">A53+</option>
                                <option value="Blade A53+">Blade A53+</option>
                            </select>
                        </div>
                    )
                }

            </div>
        </section>
    );
}

export default ItemDetailProd;