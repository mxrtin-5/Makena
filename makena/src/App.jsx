import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import Home from '../src/Pages/Home/Home'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import CrearFunda from '../src/Pages/CrearFunda/CrearFunda'
import DistribucionImg from './Pages/DistribucionImg/DistribucionImg';
import Detail from './Pages/Detail/Detail';
import CartProvider from './context/cartContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import GrillasProvider from './context/grillasContext';
import ImageCombiner from './Pages/Prueba/Prueba';

function App() {


  return (
    <div>
      <DndProvider backend={HTML5Backend}>

        <CartProvider>

          <GrillasProvider>

            <BrowserRouter>

              <Navbar />

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/crear-funda/seleccion' element={<CrearFunda />} />
                <Route path='/crear-funda/seleccion/:marca' element={<ItemListContainer />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/crear-funda/seleccion/distribucion' element={<DistribucionImg />} />
                <Route path='/prueba' element={<ImageCombiner />} />
              </Routes>

            </BrowserRouter>

          </GrillasProvider>


        </CartProvider>

      </DndProvider>



    </div>
  )
}

export default App
