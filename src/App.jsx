import { BrowserRouter, Routes, Route } from "react-router-dom";
import {ROUTES} from "./routes/routes"
import NavBar from './components/NavBar';
import FooterComponent from "./components/FooterComponent"
import { useSelector } from "react-redux";
import { selectUserAuthToken } from "./redux/app/app.slice";
import Login from "./screens/Login";
import Admin from "./screens/Admin";

function App() {
  const token = useSelector(selectUserAuthToken);

  return (
    <>
        <BrowserRouter>
          <Routes>
          {[...ROUTES].map((route, index) => (
            <Route
              key={index.toString() + route?.path}
              path={route?.route}
              element={
                  <>
                  { (route.route != "connexion" && route.route != "inscription" && route.route != "espace-administrateur" && route.route != "offres") && <NavBar />}
                  {
                    route.route == "espace-administrateur" ?
                    (
                      (!token)? <Login /> : <route.element />
                    ) :
                    <route.element />
                  }
                  { (route.route != "connexion" && route.route != "inscription" && route.route != "espace-administrateur") && <FooterComponent />}
                  </>
              }
            />
          ))}
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
