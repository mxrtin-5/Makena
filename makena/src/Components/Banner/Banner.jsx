import image from '../../assets/banner.png'
import styles from './Banner.module.css'


const Banner = () => {
    return (
        <div className={styles.image}>
            <img className={styles.img} src={image} alt="" />
        </div>
    );
}

export default Banner;