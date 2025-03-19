import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AddSchool from "./Components/AddSchool"
import Schools from "./Components/Schools"

function App() {

  return (
    <div className="flex flex-col">
      <BrowserRouter>
        <button onClick={()=>{
          window.location.pathname == "/" ? (window.location.pathname = "schools") : (window.location.pathname = "/")
        }} className="text-2xl mt-3 ml-3 cursor-pointer w-fit text-black font-bold rounded bg-white hover:text-white hover:bg-black">
          {window.location.pathname !== "/" ? "Add a School":"See list of schools"}
        </button>
        <Routes>
          <Route path="/" element={<AddSchool />} />
          <Route path="/schools" element={<Schools />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
