import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/frontentLayout';
import Home from './pages/frontend/home/Home';
import Sale from './pages/frontend/sale/Sale';
import Rent from './pages/frontend/rent/Rent';
import News from './pages/frontend/news/News';
import ContactUs from './pages/frontend/contact/ContactUs';
import SignUp from './pages/frontend/signUp/SignUp';
import Login from './pages/frontend/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sale" element={<Sale />} />
          <Route path="rent" element={<Rent />} />
          <Route path="news" element={<News />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;