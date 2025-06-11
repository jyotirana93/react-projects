import AddUser from './components/smartComponents/addUser/AddUser';
import Home from './pages/home/Home';
import RoutesComponent from './routes/routes';
import SideNav from './components/uiComponents/nav/SideNav';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="root-container">
        <SideNav />
        <RoutesComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
