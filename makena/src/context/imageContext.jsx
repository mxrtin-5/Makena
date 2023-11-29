import { createContext } from "react";
import { useDrop } from "react-dnd";


export const ImageContext = createContext()

const ImageProvider = ({ children }) => {

    const ItemTypes = {
        IMAGE: 'image',
    };

    const [, drop] = useDrop({
        accept: ItemTypes.IMAGE,
    })


    return (
        <ImageContext.Provider value={{
            ItemTypes,
            drop
        }}>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "100px"
            }} ref={drop}>
                {children}
            </div>
        </ImageContext.Provider>
    );
}

export default ImageProvider;