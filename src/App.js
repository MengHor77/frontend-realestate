import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Sale from './pages/sale/Sale';    
import Rent from './pages/rent/Rent';       
import News from './pages/news/News';  
import ContactUs from './pages/contact/ContactUs';  

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;