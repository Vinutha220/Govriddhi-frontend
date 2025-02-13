
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";
import Signin from './components/Signin';
import Homepage from './components/Homepage';
import Landingpage from './components/Landingpage';


const Routing = ()=>{

  return(
   

      <Routes>
      <Route path="/signin" element = {<Signin/>}/>
      <Route path ="/home" element = {<Homepage/>}/>
      <Route path ="/" element = {<Landingpage/>}/>
      </Routes>

  



  )

}

function App() {
  return (
    <Router>
      <Routing/>
    </Router>

    
  );
}

export default App;
