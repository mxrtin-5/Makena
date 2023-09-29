import { useDrag, useDrop } from "react-dnd";
import { useContext, useRef, useState } from "react";
import { ImageContext } from "../../context/imageContext";
import html2canvas from 'html2canvas'
import styles from './EditableImagen.module.css';

const EditableImage = ({ src, id, index, onDrop, onClick, isSelected, referenciaImagenes, translateX, translateY, escala }) => {

    const { ItemTypes } = useContext(ImageContext);

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const [, drag] = useDrag({
        type: ItemTypes.IMAGE,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: ItemTypes.IMAGE,
        drop: () => {
            onDrop(index);
        },
    });

    console.log(index);

    const imageStyle = {
        maxWidth: '100%',
        maxHeight: '100%',
        display: imageLoaded ? 'block' : 'none',
        border: isSelected ? '6px solid rgb(212, 0, 255)' : 'none',
        transform: `translate(${translateX}px, ${translateY}px) scale(${escala})`,
    };

    const handleImageError = (error) => {
        console.error('Error al cargar la imagen:', error);
    };

    const imageRef1 = useRef(null);
    const imageRef2 = useRef(null);


    const mergeImages = () => {
        html2canvas(imageRef1.current).then(canvas1 => {
            html2canvas(imageRef2.current).then(canvas2 => {
                const combinedCanvas = document.createElement('canvas');
                const ctx = combinedCanvas.current.getContext('2d');
                ctx.drawImage(canvas1, 0, 0);
                ctx.drawImage(canvas2, canvas1.width, 0);

                // Convertir el lienzo combinado en una URL de imagen
                const combinedImageUrl = combinedCanvas.current.toDataURL('image/png');
                console.log(combinedImageUrl);
                document.body.appendChild(combinedCanvas);
            });
        });




    };

    return (
        <div className={`${styles.div} ${styles.contenedorImagen}`} onClick={onClick}
            ref={(node) => {
                drop(node);
            }}
            draggable={true}
        >
            <div ref={referenciaImagenes === 0 ? imageRef1 : imageRef2} className={`${styles.imagenContainer}`}>
                <img
                    id={referenciaImagenes}
                    src={src}
                    alt="Editable Image"
                    className={styles.imagen}
                    draggable={true}
                    style={imageStyle}
                    onLoad={handleImageLoad}
                    onClick={() => {
                        onClick()
                        mergeImages()
                    }}
                    onError={handleImageError}
                    ref={(node) => {
                        drag(node);
                        node?.addEventListener('dragover', (e) => {
                            e.preventDefault();
                        });
                        node?.addEventListener('drop', (e) => {
                            e.preventDefault();
                            handleDrop();
                        });
                    }}
                />
            </div>
        </div>
    );
};

export default EditableImage;