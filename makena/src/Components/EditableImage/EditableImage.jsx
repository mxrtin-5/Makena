import { useDrag, useDrop } from "react-dnd";
import { useContext, useState } from "react";
import { ImageContext } from "../../context/imageContext";
import styles from './EditableImagen.module.css';

const EditableImage = ({ src, id, index, onDrop, onClick, translateX, translateY, escala }) => {

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
        transform: `translate(${translateX}px, ${translateY}px) scale(${escala})`,
    };

    return (
        <div className={`${styles.div} ${styles.contenedorImagen}`} onClick={onClick}
            ref={(node) => {
                drop(node);
            }}
            draggable={true}
        >
            <div className={`${styles.imagenContainer}`}>
                <img
                    src={src}
                    alt="Editable Image"
                    className={styles.imagen}
                    draggable={true}
                    style={imageStyle}
                    onLoad={handleImageLoad}
                    onClick={onClick}
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