import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import './App.css'
import Home from '../src/Pages/Home/Home'
import ItemListContainer from './Components/ItemListContainer/ItemListContainer';
import CrearFunda from '../src/Pages/CrearFunda/CrearFunda'
import DistribucionImg from './Pages/DistribucionImg/DistribucionImg';
import Detail from './Pages/Detail/Detail';

function App() {



  return (
    <div>
      <BrowserRouter>

      <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/crear-funda/seleccion' element={<CrearFunda />}/>
          <Route path='/crear-funda/seleccion/:marca' element={<ItemListContainer/>} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/crear-funda/seleccion/distribucion' element={<DistribucionImg />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
