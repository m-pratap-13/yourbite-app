import { useEffect, useState } from "react";
import usersService from "../supabase/supabaseUsers";

function useCurrentUserRole(userId) {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserRole = async () => {
    try {
      const data = await usersService.getCurrentUserRole(userId);
      setUserRole(data[0].role);
    } catch (err) {
      console.error("Error fetching userRole:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, [userId]);

  return { userRole, loading, error };
}

export default useCurrentUserRole;
