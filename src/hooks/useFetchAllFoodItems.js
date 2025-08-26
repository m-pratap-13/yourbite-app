import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";

function useFetchAllFoodItems() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await productService.getAllProducts();
        setFoods(data || []);
      } catch (err) {
        console.error("Error fetching foods:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  return { foods, loading, error };
}

export default useFetchAllFoodItems;
