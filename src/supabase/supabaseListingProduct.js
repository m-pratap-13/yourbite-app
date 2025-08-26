import supabase from "./supabaseClient";
import imagesService from "./supabaseImages";

export class ProductService {
  async addProduct({
    title,
    description,
    category,
    price,
    stock,
    shippingInformation,
    availabilityStatus,
    type,
    images,
    ingredients,
    sellerId,
  }) {
    const foodImageUrl = await imagesService.createImageURL(images);
    try {
      const { data, error } = await supabase.from("foods").insert([
        {
          title,
          description,
          category,
          price,
          stock,
          shippingInformation,
          availabilityStatus,
          type,
          images: foodImageUrl,
          ingredients: [ingredients],
          seller_id: sellerId,
        },
      ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Supabase service :: addListing :: error", error);
      return null;
    }
  }

  async addToCart({ userId, foodId }) {
    try {
      const { data, error } = await supabase.from("carts").insert([
        {
          id: userId,
          food_id: foodId,
        },
      ]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.log("Supabase service :: addListing :: error", error);
      return null;
    }
  }

  async getAllProducts() {
    try {
      const { data, error } = await supabase.from("foods").select(`
    *,
    users (
      *
    )
  `);
      return data;
    } catch (error) {
      console.log("Supabase service :: getPosts :: error", error);
      return [];
    }
  }

  async getSingleProducts(foodId) {
    const { data, error } = await supabase
      .from("foods")
      .select(
        `
    *,
    users (
      *
    )
  `
      )
      .eq("id", foodId);
    if (error) {
      console.error("Supabase single product error:", error.message);
      throw error;
    }

    return data;
  }

  async getCartFoodsId(userId) {
    const { data, error } = await supabase
      .from("carts")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Supabase getSellers error:", error.message);
      throw error;
    }

    return data;
  }

  async getCartFoods(userId) {
    try {
      const { data } = await supabase
        .from("carts")
        .select(
          `
    *,
    foods (
      *
    )
  `
        )
        .eq("id", userId);
      return data;
    } catch (error) {
      console.log("Supabase getCartFoods error", error);
      return [];
    }
  }

  async deleteFromCart(userId) {
    const { error } = await supabase
      .from("carts")
      .delete()
      .eq("food_id", userId);

    if (error) {
      console.error("Supabase deleteFromCart error:", error.message);
      throw error;
    }
  }

  async getCategoryProducts(categoryName) {
    const { data, error } = await supabase
      .from(`foods`)
      .select("*")
      .eq("category", categoryName);

    if (error) {
      console.error("Supabase getSellers error:", error.message);
      throw error;
    }

    return data;
  }
}

const productService = new ProductService();
export default productService;
