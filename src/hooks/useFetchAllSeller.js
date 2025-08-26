import { useEffect, useState } from "react";
import usersService from "../supabase/supabaseUsers";

function useFetchAllSeller() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const data = await usersService.getSellers();
        setSellers(data);
      } catch (err) {
        console.error("Error fetching sellers:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return { sellers, loading, error };
}

export default useFetchAllSeller;
