import { useDrag } from "react-dnd";
import { useContext } from "react";
import { ImageContext } from "../../context/imageContext";
import { Cropper } from "react-cropper";
import { GrillasContext } from "../../context/grillasContext";
import styles from './EditableImagen.module.css'

const EditableImage = ({ src, imagen, index, moveImage, onClick }) => {
    const { ItemTypes } = useContext(ImageContext);

    const { cropperRef, escala} = useContext(GrillasContext)

    const [, drag] = useDrag({
        type: ItemTypes.IMAGE,
        item: { src }
    });

    const handleDrop = () => {
        moveImage(index);
    };

    console.log(imagen);

    return (

        <div className={styles.div} draggable={true} onClick={onClick} ref={(node) => {
            drag(node);
            node?.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            node?.addEventListener('drop', (e) => {
                e.preventDefault();
                handleDrop();
            })
        }}>

            <Cropper
                ref={cropperRef}
                src={src}
                guides={false}
                zoomTo={escala}
                dragMode="none"
                responsive={true}
                autoCropArea={1}
                cropBoxResizable={true} />
        </div>

    );
};

export default EditableImage;




{/* <img
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
        /> */}