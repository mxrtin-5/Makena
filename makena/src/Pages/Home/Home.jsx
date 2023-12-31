import Presentacion from '../../Components/Presentacion/Presentacion';
import styles from './Home.module.css'
import portada from '../../assets/PortadaPrincipal.png'
import portada2 from '../../assets/Cambio1Principal.png'
import portada3 from '../../assets/Cambio2Principal.png'
import bannerMovile1 from '../../assets/BannerMovile.png'
import bannerMovile2 from '../../assets/Cambio.png'
import bannerMovile3 from '../../assets/Cambio1Min.png'
import bannerMovile4 from '../../assets/Cambio2Min.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Banner from '../../Components/Banner/Banner';
import { useEffect, useState } from 'react';
import CatralogoHome from '../../Components/CatalogoHome/CatalogoHome';



const Home = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Agregar un event listener para el cambio de tamaño de la ventana
        window.addEventListener('resize', handleResize);

        // Limpiar el event listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className={styles.sectionHome}>
            <div className={styles.swipper}>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    pagination={{
                        type: 'progressbar',
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    navigation={true}
                    className={styles.backgroundImg}
                >
                    {isMobile ? (
                        <>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={bannerMovile1} alt="" />
                            </SwiperSlide>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={bannerMovile2} alt="" />
                            </SwiperSlide>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={bannerMovile3} alt="" />
                            </SwiperSlide>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={bannerMovile4} alt="" />
                            </SwiperSlide>
                        </>
                    ) : (
                        <>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={portada} alt="" />
                            </SwiperSlide>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={portada2} alt="" />
                            </SwiperSlide>
                            <SwiperSlide className={styles.imagenes}>
                                <img src={portada3} alt="" />
                            </SwiperSlide>
                            
                        </>
                    )}
                </Swiper>

            </div>

            <Banner />

            <Presentacion />

            <CatralogoHome />

        </section>

    );
}

export default Home;