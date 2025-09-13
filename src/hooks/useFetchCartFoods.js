import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";
import supabase from "../supabase/supabaseClient";

function useFetchCartFoods(userId) {
  const [cartFoods, setCartFoods] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const data = await productService.getCartFoods(userId);
        setCartFoods(data);
        const id = data.map((item) => item.food_id);
        setCartId(id);
      } catch (err) {
        console.error("Error fetching Food:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();

    const channel = supabase
      .channel("realtime:carts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "carts",
        },
        (payload) => {
          fetchFoods();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, refresh]);

  return {
    cartFoods,
    cartId,
    loading,
    error,
    refreshCardBtn: () => setRefresh((p) => p + 1),
  };
}

export default useFetchCartFoods;
