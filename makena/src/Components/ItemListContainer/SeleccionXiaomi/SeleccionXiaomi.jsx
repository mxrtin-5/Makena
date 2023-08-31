import ItemCard from "./ItemCard/ItemCard";



const SeleccionXiaomi = ({ celulares }) => {

    console.log("celulares seccionXiaomi:", celulares);
    return (
        <section>
            <h1>Productos Xiaomi</h1>
            <div>
                {
                    celulares && celulares.map((cel) => (
                        <ItemCard key={cel.id} item={cel} />
                    ))
                }
            </div>
        </section>
    );
}

export default SeleccionXiaomi;