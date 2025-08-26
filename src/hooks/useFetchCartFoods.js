import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";

function useFetchCartFoods(userId) {
  const [cartFoods, setCartFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await productService.getCartFoods(userId);
        setCartFoods([...data]);
      } catch (err) {
        console.error("Error fetching Food:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [userId, refresh, loading]);

  return {
    cartFoods,
    loading,
    error,
    refreshCart: () => setRefresh((p) => p + 1),
  };
}

export default useFetchCartFoods;
