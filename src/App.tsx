import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom"
import SearchComponent from './Components/SearchComponent'
import Home from './Pages/Home'


const NoPage = () => (
  <h2>No Page Found</h2>
)



function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<SearchComponent />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>



  )

  // return <SearchComponent />
}

export default App;
