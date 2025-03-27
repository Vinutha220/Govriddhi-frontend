import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";
import Signin from './components/screens/Signin'
import Homepage from './components/screens/Homepage'
import ExploreCows from './components/screens/ExploreCows';
import Register from './components/screens/Register';
import Logout from './components/Logout';
import GoReg from './components/screens/GoReg';
import GohomePage from './components/screens/GohomePage';



const Routing = ()=>{

  return(
      <Routes>
      <Route path="/register" element = {<Register/>}/>
      <Route path="/" element = {<Signin/>}/>
      <Route path ="/home" element = {<Homepage/>}/>
      <Route path="/explore" element={<ExploreCows />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/GoReg" element={<GoReg />} />
      <Route path="/GohomePage" element={<GohomePage />} />



      </Routes>

  )

}


function App() {

  return (
    <Router>
      <Routing/>
    </Router>
  )
}

export default App
