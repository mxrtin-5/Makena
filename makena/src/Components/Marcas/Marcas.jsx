import styles from './Marcas.module.css'
import { Link } from "react-router-dom";

export const Marcas = () => {
//!acordate de hacerlo vos a esto 
//!Aqui te haces la reqeust para traer todas las marcas
    const arrayMarcas = [
        {
            nombre: "iphone",
            imageUrl:"https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418609/wfuimcaryk9ltpb4lnmx.png"
        },
        {
            nombre: "samsung",
            imageUrl: "https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418624/jmwahnu91gmtnyt7sf4i.png"
        }
        
    ]
    return (
        <section className={styles.containerSeccionMarcas}>
            <div className={styles.containerSection}>
                {arrayMarcas.map(marcaDetail => <article className={styles.containerImg}>
                    <Link to={`/crear-funda/seleccion/${marcaDetail.nombre}`}><img src={marcaDetail.imageUrl} alt="" /></Link>
                </article>)}

            </div>
        </section>
    );
}

{/* <article className={styles.containerImg}>
<Link to='/crear-funda/seleccion/iphone'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418609/wfuimcaryk9ltpb4lnmx.png" alt="" /></Link>
</article>
<article className={styles.containerImg}>
<Link to='/crear-funda/seleccion/samsung'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418624/jmwahnu91gmtnyt7sf4i.png" alt="" /></Link>
</article>
<article className={styles.containerImg}>
<Link to='/crear-funda/seleccion/huawei'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418605/vicjcaqkhy5btqj88rsq.png" alt="" /></Link>
</article>
<article className={styles.containerImg}>
<Link to='/crear-funda/seleccion/xiaomi'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418617/baiq2vdj73d6g1rrwcjc.png" alt="" /></Link>
</article>
<article className={styles.containerImg}>
<Link to='/crear-funda/seleccion/lg'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418613/frhqyg6ch2yycrd61hmh.png" alt="" /></Link>
</article>
<article className={styles.containerImg}>
<Link to='/crear-funda/seleccion/sony'><img src="https://res.cloudinary.com/djkwdbi2z/image/upload/v1693418628/wvocpmd2lsaai2u7pxj0.png" alt="" /></Link>
</article> */}