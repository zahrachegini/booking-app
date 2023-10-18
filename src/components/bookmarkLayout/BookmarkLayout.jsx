import { Outlet } from "react-router-dom";
import Map from "../map/Map";
import { useBookmark } from "../context/BookmarkListContet";

const BookmarkLayout = () => {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocations={bookmarks} />
    </div>
  );
};

export default BookmarkLayout;
