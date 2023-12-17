import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Room from './pages/Room';
import Main from './pages/Main';
import NotFound404 from './pages/NotFound404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Main}/>
        <Route exact path='/room/:id' Component={Room}/>
        <Route Component={NotFound404}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
