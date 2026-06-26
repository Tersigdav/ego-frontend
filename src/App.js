import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Game from "./pages/Game";
import Register from "./pages/Register";

import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/game"
        element={
          <PrivateRoute>
            <Game />
          </PrivateRoute>
        }
      />

    </Routes>
  );
}

export default App;