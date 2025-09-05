import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";

function useSearch(query) {
  const [searchItems, setSearchItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchFoods = async () => {
    try {
      const data = await productService.searchFoods(query);
      const activeItems = (data || []).filter(
        (item) => item.active && item.admin_approval === "approved"
      );
      setSearchItems(activeItems);
    } catch (err) {
      console.error("Error fetching userRole:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchFoods();
  }, [query]);

  return { searchItems, loading, error };
}

export default useSearch;
