import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas'
import image from '/public/a03.png'
import image2 from '/public/a02.png'


function ImageCombiner() {
    const image1Ref = useRef(null);
    const image2Ref = useRef(null);
    const combinedImageRef = useRef(null);

    const [combinedImageUrl, setCombinedImageUrl] = useState('');

    const combineImages = () => {
        html2canvas(image1Ref.current).then(canvas1 => {
            html2canvas(image2Ref.current).then(canvas2 => {
                const ctx = combinedImageRef.current.getContext('2d');
                ctx.drawImage(canvas1, 0, 0);
                ctx.drawImage(canvas2, canvas1.width, 0);

                // Convertir el lienzo combinado en una URL de imagen
                const combinedImageUrl = combinedImageRef.current.toDataURL('image/png');
                console.log(combinedImageUrl);
                setCombinedImageUrl(combinedImageUrl);
            });
        });
    };



    console.log(combinedImageRef);
    return (
        <div>
            <h1>Combine Images</h1>
            <button onClick={combineImages}>Combine</button>
            <div style={{ display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <h2>Image 1</h2>
                    <img style={{
                        width: 120,
                        height: 500
                    }} ref={image1Ref} src={image} alt="Image 1" />
                </div>
                <div>
                    <h2>Image 2</h2>
                    <img style={{
                        width: 120,
                        height: 500
                    }} ref={image2Ref} src={image2} alt="Image 2" />
                </div>
            </div>
            <canvas
                ref={combinedImageRef}
                style={{ display: 'none' }}
                width="240" // Ajusta el ancho del lienzo según tus necesidades
                height="500" // Ajusta la altura del lienzo según tus necesidades
            ></canvas>
            <div>
                <h2>Combined Image</h2>
                <img src={combinedImageUrl} alt="Combined Image" />
            </div>
        </div>
    );
}

export default ImageCombiner;