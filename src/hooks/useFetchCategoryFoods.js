import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";

function useFetchCategoryFoods(categoryName) {
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatFoods = async () => {
      try {
        const data = await productService.getCategoryProducts(categoryName);
        setCategoryFoods(data);
      } catch (err) {
        console.error("Error fetching userRole:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatFoods();
  }, [categoryName]);

  return { categoryFoods, loading, error };
}

export default useFetchCategoryFoods;
