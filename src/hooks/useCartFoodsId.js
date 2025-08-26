import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";

function useCartFoodsId(userId) {
  const [cartId, setCartId] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchFoodId = async () => {
      try {
        const data = await productService.getCartFoodsId(userId);
        const id = data.map((item) => item.food_id);
        setCartId(id);
      } catch (err) {
        console.error("Error fetching Food Id:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodId();
  }, [userId, refresh]);

  return {
    cartId,
    loading,
    error,
    refreshCardBtn: () => setRefresh((p) => p + 1),
  };
}

export default useCartFoodsId;
