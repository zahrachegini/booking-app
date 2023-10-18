import { useParams } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";
// import Loader from "../loader/Loader";
import { useHotels } from "../context/HotelsProvider";
import { useEffect } from "react";
import Loader from "./../loader/Loader";

const SingleHotel = () => {
  const { id } = useParams();
  const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();

  useEffect(() => {
    getHotel(id);
  }, [id]);

  if (isLoadingCurrentHotel || !currentHotel) return <Loader />;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div className="">
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
};

export default SingleHotel;
