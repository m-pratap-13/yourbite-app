import { useForm } from "react-hook-form";
import authService from "../../supabase/supabaseAuth";
import { useDispatch } from "react-redux";
import { setUser, setUserRole } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const SellerSignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    const { profileImage, shopImage } = formData;

    try {
      const user = await authService.createAccount({
        ...formData,
        role: "seller",
        profileImage: profileImage[0],
        shopImage: shopImage[0],
      });
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(setUser(userData));
          dispatch(setUserRole("seller"));
          navigate("/seller/dashboard");
        }
      }
    } catch (error) {
      console.error("Signup error", error.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Seller Registration
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                autoComplete="name"
                {...register("name", { required: "Full name is required" })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("profileImage", {
                  required: "Profile image is required",
                })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.profileImage && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profileImage.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                {...register("password", { required: "Password is required" })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Restaurant / Business Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Restaurant Name
              </label>
              <input
                type="text"
                {...register("restaurantName", {
                  required: "Restaurant name is required",
                })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.restaurantName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Category
              </label>
              <select
                {...register("category", {
                  required: "Type of Category is required",
                })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              >
                <option value="">Select</option>
                <option value="Biriyani">Biriyani</option>
                <option value="Curry">Curry</option>
                <option value="Paneer">Paneer</option>
                <option value="Fried Rice">Fried Rice</option>
                <option value="Chowmein">Chowmein</option>
                <option value="Momos">Momos</option>
                <option value="Pizza">Pizza</option>
                <option value="Pasta">Pasta</option>
                <option value="Burger">Burger</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Dosa">Dosa</option>
                <option value="Idli">Idli</option>
                <option value="Samosa">Samosa</option>
                <option value="Sweets">Sweets</option>
              </select>
              {errors.typeOfFood && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.typeOfFood.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Shop Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register("shopImage", {
                  required: "Shop images are required",
                })}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
              {errors.shopImages && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shopImages.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Opening Hours
              </label>
              <input
                type="text"
                placeholder="e.g. 10:00 - 22:00"
                {...register("openingHour")}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-600">
                Restaurant Type
              </label>

              <div className="flex flex-wrap gap-4 border px-4 py-2 rounded-md">
                {["DINE", "HOME DELEVERY", "PRE-BOOKING"].map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={type}
                      {...register("restaurantType", {
                        required: "At least one restaurantType is required",
                      })}
                      className="accent-blue-500"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {errors.restaurantType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.restaurantType.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Location Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Full Address
              </label>
              <textarea
                autoComplete="street-address"
                {...register("address", { required: "Address is required" })}
                rows="3"
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                City
              </label>
              <input
                type="text"
                autoComplete="address-level2"
                {...register("city")}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                State
              </label>
              <input
                type="text"
                autoComplete="address-level1"
                {...register("state")}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Pincode
              </label>
              <input
                autoComplete="postal-code"
                type="text"
                {...register("pincode")}
                className="mt-1 w-full border px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-300"
              />
            </div>
          </div>
        </div>

        <div className="text-right pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default SellerSignUpForm;
