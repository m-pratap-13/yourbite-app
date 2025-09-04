import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import productService from "../../supabase/supabaseListingProduct";
import { useEffect, useState } from "react";
import imagesService from "../../supabase/supabaseImages";

export default function ProductListingForm({ food }) {
  const sellerId = useSelector((state) => state.auth.currentUser.id);
  const navigate = useNavigate();
  const [inputType, setInputType] = useState("text");
  const [loading, setLoading] = useState(false);

  const handleImagesUpdate = () => {
    setInputType((prev) => (prev === "text" ? "file" : "text"));
  };

  console.log();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (food) {
      setValue("title", food.title || "");
      setValue("description", food.description || "");
      setValue("category", food.category || "");
      setValue("price", food.price || "");
      setValue("stock", food.stock || "");
      setValue("shippingInformation", food.shippingInformation || "");
      setValue("availabilityStatus", food.availabilityStatus || "");
      setValue("type", food.type || "");
      setValue("ingredients", food?.ingredients?.[0] || "");
      setValue("images", food.images || "");
    }
  }, [food, setValue]);

  useEffect(() => {
    if (food) {
      setValue("images", food.images || "");
    }
  }, [inputType]);

  const onSubmit = async (data) => {
    setLoading(true);
    const { ingredients, images } = data;
    const arrIngredients = ingredients?.split(",");
    try {
      if (!food) {
        await productService.addProduct({
          ...data,
          arrIngredients,
          images: images[0],
          sellerId,
          active: false,
          adminApproval: "pending",
        });
        navigate("/seller/products/all");
      } else {
        const foodImageUrl = await imagesService.createImageURL(images[0]);
        await productService.updateFood(food.id, {
          ...data,
          images: inputType === "text" ? images : foodImageUrl,
          ingredients: arrIngredients,
          active: false,
          admin_approval: "pending",
        });
        navigate("/seller/products/all");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold text-gray-700">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="text"
              placeholder="Enter product title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-40"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="block font-semibold text-gray-700">
              Ingredients (comma separated)
            </label>
            <textarea
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-30"
              placeholder="Example: Rice, Chicken, Masala"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">
                {errors.ingredients.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Category</option>
              <option>Biryani</option>
              <option>Pizza</option>
              <option>Burger</option>
              <option>Pasta</option>
              <option>Momos</option>
              <option>Sandwiches</option>
              <option>Desserts</option>
              <option>Snacks</option>
              <option>Bengali</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Price */}
          <div>
            <label className="block font-semibold text-gray-700">Price</label>
            <input
              {...register("price", { required: "Price is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="number"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          {/* Stock */}
          <div>
            <label className="block font-semibold text-gray-700">Stock</label>
            <input
              {...register("stock", { required: "Stock is required" })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type="number"
              placeholder="Enter available stock"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Availability */}
          <div>
            <label className="block font-semibold text-gray-700">
              Availability Status
            </label>
            <select
              {...register("availabilityStatus", {
                required: "Availability status is required",
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select</option>
              <option value="In Stock">In Stock</option>
              <option value="Out Of Stock">Out Of Stock</option>
              <option value="Preorder">Preorder</option>
            </select>
            {errors.availabilityStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.availabilityStatus.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold text-gray-700">Type</label>
            <select
              {...register("type", {
                required: "Please select Veg or Non Veg",
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Shipping */}
          <div>
            <label className="block font-semibold text-gray-700">
              Shipping Information
            </label>
            <select
              {...register("shippingInformation", {
                required: "Shipping info is required",
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Select Delivery Option --</option>
              <option value="15 min.">Delivered Within 10 Minutes</option>
              <option value="30 min.">Delivered Within 30 Minutes</option>
              <option value="1 hour.">Delivered Within 1 Hour</option>
              <option value="2 hour.">Delivered Within 2 Hours</option>
            </select>
            {errors.shippingInformation && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shippingInformation.message}
              </p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="flex flex-row gap-2 font-semibold text-gray-700">
              Images{" "}
              <span
                onClick={handleImagesUpdate}
                className={`border rounded text-sm mb-2 p-0.5 ${
                  food ? "block" : "hidden"
                }`}
              >
                {inputType === "text"
                  ? "Upload New Photo ?"
                  : "Keep Previous One ?"}
              </span>
            </label>
            <input
              {...register("images", {
                required: "At least one image is required",
              })}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              type={food ? `${inputType}` : "file"}
            />
            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT */}
        <div className="md:col-span-2 text-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-lg font-semibold shadow-md transition 
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {loading
              ? !food
                ? "Submitting..."
                : "Updating..."
              : !food
              ? "Submit Product"
              : "Update Product"}
          </button>
        </div>
      </form>
    </>
  );
}
