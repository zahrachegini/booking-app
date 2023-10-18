import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const BookmarkListProvider = ({ children }) => {
  const [currentBookmark, setCurrentBookmark] = useState(null);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    setCurrentBookmark(null);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      isLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        getBookmark,
        bookmarks,
        isLoadingCurrentBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkListProvider;

export const useBookmark = () => {
  return useContext(BookmarkContext);
};
