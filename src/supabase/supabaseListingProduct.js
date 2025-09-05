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
    active,
    adminApproval,
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
          active: active,
          admin_approval: adminApproval,
          admin_id: "71c6c97a-540a-4338-8782-a9daabdf6ffc",
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
         users!foods_seller_id_fkey(*) (
          *
        )
      `);
      return data || [];
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
     users!foods_seller_id_fkey(*) (
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

  async getSellerFoods(userId) {
    const { data, error } = await supabase
      .from(`foods`)
      .select("*")
      .eq("seller_id", userId);

    if (error) {
      console.error("Supabase getSellerFoods error:", error.message);
      throw error;
    }

    return data;
  }

  async updateFood(foodId, updatedData) {
    try {
      const { data, error } = await supabase
        .from("foods")
        .update(updatedData)
        .eq("id", foodId)
        .select();

      if (error) {
        console.error("Error updating food:", error.message);
        return { error };
      }

      return { data };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { error: err };
    }
  }

  async updateStatus(foodId, status, columnName) {
    try {
      const { data, error } = await supabase
        .from("foods")
        .update({ [columnName]: status })
        .eq("id", foodId)
        .select();

      if (error) {
        console.error("Error updating food:", error.message);
        return { error };
      }

      return { data };
    } catch (err) {
      console.error("Unexpected error:", err);
      return { error: err };
    }
  }

  async deleteFoodItem(foodId) {
    const { error } = await supabase.from("foods").delete().eq("id", foodId);

    if (error) {
      console.error("Supabase deleteFoodItem error:", error.message);
      throw error;
    }
  }

  async searchFoods(searchInput) {
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .or(
        `title.ilike.%${searchInput}%,category.ilike.%${searchInput}%,type.ilike.%${searchInput}%`
      );

    if (error) {
      console.error("Search error:", error.message);
      return [];
    }
    return data;
  }
}

const productService = new ProductService();
export default productService;
