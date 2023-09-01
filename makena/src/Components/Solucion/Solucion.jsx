import styles from './Solucion.module.css'



const Solucion = () => {
    return (
        <section className={styles.sectionContenedor} >
            <div className={styles.solucionContenedor}>
                <h2 className={styles.tituloSeccionSolucion}>La Solución a una Funda Fea: Fundas Personalizadas a tu Medida</h2>
                <ul className={styles.ul}>
                    <li>Diseño a tu Gusto: Con nuestras fundas personalizadas, tienes el control total sobre el diseño. Puedes elegir tus colores favoritos, subir tus propias imágenes o seleccionar entre una amplia variedad de diseños exclusivos. Así, te aseguras de que tu funda sea un reflejo fiel de tu personalidad y estilo.</li>
                    <li>Calidad y Protección: No sacrificamos la calidad por la personalización. Nuestras fundas están diseñadas para proteger tu dispositivo de manera efectiva, manteniendo su integridad y durabilidad. Esto significa que puedes disfrutar de la estética sin preocuparte por la seguridad de tu dispositivo.</li>
                    <li>Experiencia Única: Una funda personalizada no es solo un accesorio, es una experiencia. Cada vez que saques tu dispositivo, te sentirás orgulloso de mostrar una pieza única y especial que nadie más tiene. Además, te ayudará a destacar en cualquier lugar.</li>
                    <li>Regalos Significativos: ¿Buscas un regalo especial para alguien? Una funda personalizada es una elección perfecta. Puedes diseñarla pensando en los gustos y preferencias de la persona, lo que lo convierte en un regalo memorable y significativo.</li>
                </ul>


                <div className={styles.comoFunciona}>
                    <h3>Como funciona?</h3>
                    <p>Diseña tu Funda: Utiliza nuestra herramienta de diseño fácil de usar para crear tu funda personalizada. Sube imágenes, elige colores, y ajusta los detalles hasta que estés satisfecho.</p>
                </div>

            </div>


        </section>
    );
}

export default Solucion;