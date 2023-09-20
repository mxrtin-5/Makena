import { useDrag, useDrop } from "react-dnd";
import { useContext } from "react";
import { ImageContext } from "../../context/imageContext";
import styles from './EditableImagen.module.css';

const EditableImage = ({ src, imagen, id, index, onDrop, onClick }) => {
    const { ItemTypes } = useContext(ImageContext);

    const [, drag] = useDrag({
        type: ItemTypes.IMAGE,
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: ItemTypes.IMAGE,
        drop: (item) => {
            onDrop(item.index, index);
        },
    });

    return (
        <div className={styles.div} onClick={onClick} ref={(node) => {
            drag(drop(node));
        }}>
            <img
                src={src}
                alt="Editable Image"
                className={imagen}
                draggable={true}
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
    );
};

export default EditableImage;




{/*  */ }