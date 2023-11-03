import { useEffect, useRef } from 'react';
import styles from './UploadWidget.module.css'


const UploadWidget = ({getImageData}) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'druiqihxp',
            uploadPreset: 'Makena'
        }, function (error, result) {
            if( result.event === "success"){
                getImageData({
                    url :result.info.url,
                    publicId:result.info.public_id
                })
            }
            
        })
    }, [])
    return (
        <div className={styles.containerButton}>
            <button className={styles.button2} onClick={() => widgetRef.current.open()}>
                Upload
            </button>
        </div>
    );
}

export default UploadWidget;