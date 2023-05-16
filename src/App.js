import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { history } from './_helpers/history';
import Match from './components/Match';
import Room from './components/Room';
import Private from './components/Private';
import Home from './components/Home';
import Login from './components/Login';

export { App };

function App() {
  // init custom history object to allow navigation from 
  // anywhere in the react app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();
  return (
    <div className="app-container bg-light">
      <div className="container pt-4 pb-4">
        <Routes>
          <Route
            path="/"
            element={
              <Private >
                <Home />
              </Private>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}
