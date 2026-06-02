import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Sale from './pages/sale/Sale';       // Import ទំព័រលក់
import Rent from './pages/rent/Rent';       // Import ទំព័រជួល
import ContactUs from './pages/contact/ContactUs'; // Import ទំព័រទំនាក់ទំនង

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sale" element={<Sale />} />
          <Route path="rent" element={<Rent />} />
          <Route path="contact-us" element={<ContactUs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;