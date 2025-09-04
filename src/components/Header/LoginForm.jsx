import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../supabase/supabaseAuth";
import { setUser } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { user } = await authService.login(formData);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(setUser(userData));
          navigate("/");
        }
      }

      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm text-green-600 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
      <div className="text-center text-sm text-gray-700 mt-6">
        Not a member?{" "}
        <Link
          to="/customer-registration"
          className="text-green-600 hover:underline"
        >
          Signup
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
