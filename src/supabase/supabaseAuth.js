import supabase from "./supabaseClient";
import imagesService from "./supabaseImages";

export class AuthService {
  async createAccount({
    email,
    password,
    name,
    role,
    profileImage,
    restaurantName,
    typeOfFood,
    openingHour,
    address,
    city,
    state,
    pincode,
    shopImage,
    restaurantType,
  }) {
    try {
      // 1. Sign up user
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) throw signUpError;

      const userId = signUpData.user?.id;

      if (!userId) throw new Error("User signup failed");

      await supabase.auth.updateUser({
        data: {
          displayName: name,
        },
      });

      const profileImageUrl = await imagesService.createImageURL(
        profileImage,
        userId
      );

      const shopImageUrl = await imagesService.createImageURL(
        shopImage,
        userId
      );

      const { error: insertError } = await supabase.from("users").insert([
        {
          id: userId,
          email,
          name,
          profileImage: profileImageUrl,
          role,
          restaurantName,
          typeOfFood,
          openingHour,
          address,
          city,
          state,
          pincode,
          shopImage: shopImageUrl,
          restaurantType,
        },
      ]);

      if (insertError) throw insertError;

      if (insertError) throw insertError;

      // Login after signup
      return await this.login({ email, password });
    } catch (error) {
      console.error("Supabase :: createAccount :: error", error.message);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Supabase :: login :: error", error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error("Supabase :: getCurrentUser :: error", error.message);
      return null;
    }
  }

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error("Supabase :: logout :: error", error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
