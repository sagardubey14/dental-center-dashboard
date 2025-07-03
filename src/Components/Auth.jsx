import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";

export default function Auth() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { notify, user, setUser, navigate, users } = useApp();

  const onSubmit = (data) => {
    const user = users.find(
      (u) => u.email === data.email && u.password === data.password
    );
    console.log(data, users);
    
    if (user) {
      // localStorage.setItem("authUser", JSON.stringify(user));
      notify("success", `Welcome ${user.email}`);
      reset();
      setUser(user);
      console.log(user);
    } else {
      notify("fail", `Invalid credentials`);
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "Admin") navigate("/admin/dashboard");
      else navigate("/patient/dashboard");
    }
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: 'url("/7701518.jpg")',
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md animate-fadeIn">
        <h2 className="text-4xl font-extrabold text-teal-700 mb-8 text-center tracking-wide">
          Dental Portal Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-teal-800 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border border-teal-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 px-5 py-3 rounded-xl shadow-sm placeholder-teal-300 transition"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                Email is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-teal-800 mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border border-teal-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-500 px-5 py-3 rounded-xl shadow-sm placeholder-teal-300 transition"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1 font-medium">
                Password is required
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 transition text-white py-3 rounded-xl font-bold tracking-wide shadow-lg"
          >
            Login
          </button>
        </form>
      </div>

      <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px);}
        to { opacity: 1; transform: translateY(0);}
      }
      .animate-fadeIn {
        animation: fadeIn 0.6s ease forwards;
      }
    `}</style>
    </div>
  );
}
