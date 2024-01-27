
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./routes/Login"
import Signup from "./routes/signup"
import Dashboard from "./routes/dashboard"
import SendMoney from "./routes/sendMoney"
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
