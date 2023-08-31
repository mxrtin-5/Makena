import { useEffect, useRef } from 'react';



const UploadWidget = ({getImageData}) => {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();


    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'djkwdbi2z',
            uploadPreset: 'gly1rbcq'
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
        <div>
            <button onClick={() => widgetRef.current.open()}>
                puto
            </button>
        </div>
    );
}

export default UploadWidget;