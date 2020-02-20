import React from 'react';
import Header from './Components/Header';
import Generos from './Components/Generos';
import Home from './Components/Home';
import NovoGenero from './Components/NovoGenero';
import EditarGenero from './Components/EditarGenero';
import Series from './Components/Series';
import NovaSerie from './Components/NovaSerie';
import InfoSerie from './Components/InfoSerie';


import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {

  return (

    <Router>
    <div className='App'>
      <Header/> 
      <Switch>
      <Route path="/" exact component = {Home}></Route>
      <Route path="/generos" exact component = {Generos}></Route>
      <Route path="/generos/novo" exact component={NovoGenero}></Route>
      <Route path="/generos/:id" exact component={EditarGenero}></Route>
      <Route path="/series" exact component = {Series}></Route>
      <Route path="/series/novo" exact component={NovaSerie}></Route>
      <Route path="/series/:id" exact component={InfoSerie}></Route>
      </Switch>
      </div>
    </Router>

  );
}

export default App;
