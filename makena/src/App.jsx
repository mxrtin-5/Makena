import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Marcas from './Components/Marcas/Marcas';
import Xiaomi from './Components/Xiaomi/Xiaomi'
import './App.css'
import SeleccionXiaomi from './Components/ItemListContainer/SeleccionXiaomi/SeleccionXiaomi';
import Home from './Components/home/Home';
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';


function App() {

  

  return (
    <div>
      <BrowserRouter>

      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/marcas' element={<Marcas />}/>
          <Route path='/seleccion-xiaomi/:categoryId' element={<ItemListContainer/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
