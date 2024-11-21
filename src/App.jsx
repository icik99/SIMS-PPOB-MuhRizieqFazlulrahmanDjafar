import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TopUp from './pages/TopUp';
import Payment from './pages/Payment';
import TransactionHistory from './pages/TransactionHistory';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import './index.css'


function App() {
  return (
    <>
      <Toaster 
      position="bottom-left"
      reverseOrder={false}
      toastOptions={{
        className: '',
        style: {
          border: '1px solid #A02334',
          padding: '8px 16px',
          color: '#A02334',
        },
      }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/history" element={<TransactionHistory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
