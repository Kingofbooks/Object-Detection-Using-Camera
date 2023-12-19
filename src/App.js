import './App.css';
import SignInSide from './LoginPage';
import ResponsiveDrawer from "./dummy";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<SignInSide />}> */}
          <Route path='/' element={<ResponsiveDrawer />} />
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
      {/* <SignInSide />
      <ResponsiveDrawer /> */}
    </div>
  );
}

export default App;
