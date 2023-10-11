import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header/Header";
import LocationList from "./components/locationList/LocationList";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <LocationList />
    </div>
  );
}

export default App;
