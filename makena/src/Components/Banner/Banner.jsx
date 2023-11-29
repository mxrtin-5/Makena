import { useEffect, useState } from 'react';
import imageDesktop from '../../assets/banner.png'
import imageMobile from '../../assets/BannerMobileInfo.png'
import styles from './Banner.module.css'


const Banner = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 800);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className={styles.image}>
            <img className={styles.img} src={isMobile ? imageMobile : imageDesktop} alt="" />
        </div>
    );
}

export default Banner;