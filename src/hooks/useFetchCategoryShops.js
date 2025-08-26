import { useEffect, useState } from "react";
import usersService from "../supabase/supabaseUsers";

function useFetchCategoryShops(categoryName) {
  const [categoryShops, setCategoryShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatFoods = async () => {
      try {
        const data = await usersService.getCategoryShops(categoryName);
        setCategoryShops(data);
      } catch (err) {
        console.error("Error fetching userRole:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatFoods();
  }, [categoryName]);

  return { categoryShops, loading, error };
}

export default useFetchCategoryShops;
