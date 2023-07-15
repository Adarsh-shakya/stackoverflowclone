import { BrowserRouter  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './App.css';
import Navbar from './Componemts/Navbar';
import { fetchAllQuestions } from './actions/question';
import { fetchAllUsers } from './actions/Users';
import AllRoutes from './AllRoutes';

function App() {

    const dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(fetchAllQuestions())
       dispatch(fetchAllUsers())
    }, [dispatch])
  return (
    <div >
      <BrowserRouter>
            <Navbar/>
            <AllRoutes/>
     </BrowserRouter>
    </div>
  );
}

export default App;
