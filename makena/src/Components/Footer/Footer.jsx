import styles from './Footer.module.css'
import InfoHome from '../../Components/InfoHome/InfoHome'

const Footer = () => {
    return (

        <footer className={styles.footer}>
            <InfoHome />
        </footer>

    );
}

export default Footer;