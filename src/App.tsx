import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from './components/layout'
import { ThemeProvider } from "./components/theme-provider"
import Landing from "./pages/Landing"
import Dashboard from "./pages/Dashboard"
import CreateProblem from "./pages/CreateProblem"
import SolveProblems from './pages/SolveProblem'
import { ToastContainer } from 'react-toastify'
import Evaluate from "./pages/Evaluate"
function App() {


  return (
    <>
      <BrowserRouter>

        <ThemeProvider defaultTheme="dark">
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />}></Route>
              <Route path="/Dashboard" element={<Dashboard />}></Route>
              <Route path="/CreateProblem" element={<CreateProblem />}></Route>
              <Route path="/SolveProblem" element={<SolveProblems />}></Route>
              <Route path="/evaluate" element={<Evaluate />}></Route>


            </Routes>
            <ToastContainer autoClose={1000}></ToastContainer>
          </Layout>
        </ThemeProvider>
      </BrowserRouter>

    </>
  )
}

export default App
