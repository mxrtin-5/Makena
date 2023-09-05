import { useDrag } from "react-dnd";
import { useContext } from "react";
import { ImageContext } from "../../context/imageContext";



const EditableImage = ({ src, imagen, index, moveImage }) => {

    const { ItemTypes } = useContext(ImageContext)

    const [, drag] = useDrag({
        type: ItemTypes.IMAGE,
        item: { src }
    })

    const handleDrop = () => {
        moveImage(index);
    };




    return (
        <img
            src={src}
            alt="Editable Image"
            className={imagen}
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
            draggable={true}
        />
    );
}

export default EditableImage;