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
        success: {
          style: {
            background: '#A02334',
            color: 'white',
            fontWeight: '500',
            border: '1px solid',
            padding: '8px 16px' ,
            fontSize: '12px',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        },
        error: {
          style: {
            background: '#A02334',
            color: 'white',
            fontWeight: '500',
            border: '1px solid',
            padding: '8px 16px',
            fontSize: '12px',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'red',
          },
        },
        loading: {
          style: {
            background: '#A02334',
            color: 'white',
            fontWeight: '500',
            border: '1px solid',
            padding: '8px 16px' ,
            fontSize: '12px',
          },
          iconTheme: {
            primary: 'white',
            secondary: 'white',
          },
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
