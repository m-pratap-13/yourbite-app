import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";
import supabase from "../supabase/supabaseClient";

function useSellerFoods(userId) {
  const [sellerFoods, setSellerFoods] = useState([]);
  const [sellerRejectedFoods, setSellerRejectedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCatFoods = async () => {
    try {
      const data = await productService.getSellerFoods(userId);
      const activeItems = (data || []).filter(
        (item) =>
          item.admin_approval === "approved" ||
          item.admin_approval === "pending"
      );

      setSellerFoods(activeItems);
      const rejectedItems = (data || [])?.filter(
        (item) => item.admin_approval === "rejected"
      );
      setSellerRejectedFoods(rejectedItems);
    } catch (err) {
      console.error("Error fetching userRole:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatFoods();

    const channel = supabase
      .channel("realtime:foods")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "foods",
          filter: `seller_id=eq.${userId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            fetchCatFoods();
          }
          if (payload.eventType === "UPDATE") {
            fetchCatFoods();
          }
          if (payload.eventType === "DELETE") {
            fetchCatFoods();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return {
    sellerFoods,
    sellerRejectedFoods,
    loading,
    error,
  };
}

export default useSellerFoods;
