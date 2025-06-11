import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home';
import AddUser from '../components/smartComponents/addUser/AddUser';

const RoutesComponent = () => {
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add-users" element={<AddUser />} />
      </Routes>
    </main>
  );
};

export default RoutesComponent;
