import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContet";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const Bookmark = () => {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmarked location</p>;
  return (
    <div>
      <h2>Bookmark list</h2>

      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div className="">
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Bookmark;
