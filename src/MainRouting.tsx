import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GraphApp from "./GraphApp";
import MainPage from "./MainPage";

function MainRouting() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="graph/:id" element={<GraphApp/>}/>
      <Route path="*" element={<Navigate to="/" />}
    />
    </Routes>
  </BrowserRouter>
  );
}

export default MainRouting;
