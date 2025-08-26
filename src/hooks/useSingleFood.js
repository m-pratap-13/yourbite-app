import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";

function useSingleFood(foodId) {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await productService.getSingleProducts(foodId);
        setFood(data[0]);
      } catch (err) {
        console.error("Error fetching Food:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, [foodId, refresh]);

  return {
    food,
    loading,
    error,
    refreshCart: () => setRefresh((p) => p + 1),
  };
}

export default useSingleFood;
