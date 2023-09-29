import Problematica from '../../Components/Ploblematica/Problematica';
import Presentacion from '../../Components/Presentacion/Presentacion';
import Solucion from '../../Components/Solucion/Solucion';
import styles from './Home.module.css'
import portada from '../../assets/portada.png'
import portada2 from '../../assets/cambio 1.png'
import portada3 from '../../assets/cambio 2.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


const Home = () => {

    return (
        <section className={styles.sectionHome}>
        <div className={styles.swipper}>
            <Swiper
                slidesPerView={1}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation]}
                navigation={true}
                className={styles.backgroundImg}
            >
                <SwiperSlide className={styles.imagenes}><img src={portada} alt="" /></SwiperSlide>
                <SwiperSlide className={styles.imagenes}><img src={portada2} alt="" /></SwiperSlide>
                <SwiperSlide className={styles.imagenes}><img src={portada3} alt="" /></SwiperSlide>
            </Swiper>
        </div>

        <Presentacion />

        <div>
            <Problematica className={styles.componentContainer} />

            <Solucion />

        </div>


    </section>

    );
}

export default Home;