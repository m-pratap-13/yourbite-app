import { useEffect, useState } from "react";
import productService from "../supabase/supabaseListingProduct";
import supabase from "../supabase/supabaseClient";

function useFetchAllFoodItems() {
  const [foods, setFoods] = useState([]);
  const [pendingFoods, setPendingFoods] = useState([]);
  const [rejectedFoods, setRejectedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFoods = async () => {
    try {
      const data = await productService.getAllProducts();
      const activeItems = (data || [])?.filter(
        (item) => item.active && item.admin_approval === "approved"
      );
      setFoods(activeItems);

      const unApprovedItems = (data || [])?.filter(
        (item) => item.active && item.admin_approval === "pending"
      );
      setPendingFoods(unApprovedItems);

      const rejectedItems = (data || [])?.filter(
        (item) => item.active && item.admin_approval === "rejected"
      );
      setRejectedFoods(rejectedItems);
    } catch (err) {
      console.error("Error fetching foods:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
    const channel = supabase
      .channel("realtime:foods")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "foods",
          filter: `admin_id=eq.71c6c97a-540a-4338-8782-a9daabdf6ffc`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            fetchFoods();
          }
          if (payload.eventType === "UPDATE") {
            fetchFoods();
          }
          if (payload.eventType === "DELETE") {
            fetchFoods();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { foods, loading, error, pendingFoods, rejectedFoods };
}

export default useFetchAllFoodItems;
