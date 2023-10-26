import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

const HotelsProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrentHotel, setIsLoadingCurrentHotel] = useState(false);
  const room = JSON.parse(searchParams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_get=${room || 1}`
  );
 
  async function getHotel(id) {
    setIsLoadingCurrentHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentHotel(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentHotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        isLoadingCurrentHotel,
        currentHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export default HotelsProvider;

export const useHotels = () => {
  return useContext(HotelContext);
};
