


const ItemCard = ({ item }) => {
    console.log("ItemCard:", item);
    return (
        <div>
            <div>
                <h4> {item.nombre} </h4>
                <img src={item.image} alt="" />
            </div>
        </div>
    );
}

export default ItemCard;