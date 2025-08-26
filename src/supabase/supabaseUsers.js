import supabase from "./supabaseClient";

export class UsersService {
  async getAllUsers() {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Supabase getAllUsers error:", error.message);
      throw error;
    }

    return data;
  }

  async getSellers() {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "seller");

    if (error) {
      console.error("Supabase getSellers error:", error.message);
      throw error;
    }

    return data;
  }
  async getCurrentUserRole(userId) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Supabase getSellers error:", error.message);
      throw error;
    }

    return data;
  }

  async getCategoryShops(categoryName) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("typeOfFood", categoryName);

    if (error) {
      console.error("Supabase getSellers error:", error.message);
      throw error;
    }

    return data;
  }
}

const usersService = new UsersService();
export default usersService;
