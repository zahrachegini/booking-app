import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContet";
import { useEffect } from "react";
import Loader from "./../loader/Loader";
import ReactCountryFlag from "react-country-flag";

const SingleBookmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookmark, isLoadingCurrentBookmark, currentBookmark } =
    useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;
  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        &larr; back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
