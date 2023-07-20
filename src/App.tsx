import React from 'react';
import '../src/styles/App.css';
import '../src/styles/main.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, Staff} from './pages/Public';
import Layout from './components/Layout/Layout';
import TrainingSchedule from './pages/Public/TrainingSchedule';
import Customer from './pages/Public/Customer';
import NotFound from './pages/NotFound';
import { useAppSelector } from './store/hook';
import { RootState } from './store/redux';
import Authorized from './pages/Authorized';


const Admin = ({ children}:any) => {
  const userState = useAppSelector((state: RootState) => state.user.data);
  if ((userState?.Role === "Admin")){
    return children;
  }
  return <Authorized></Authorized>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/change-password" element={<Login/>}/>
        <Route path="/" element={<Layout/>}>
            <Route path="*" element={<NotFound/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="user/customer" element={<Admin><Customer/></Admin>}/>
            <Route path="user/staff" element={<Staff/>}/>
            <Route path="schedule/training-schedule" element={<TrainingSchedule/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
