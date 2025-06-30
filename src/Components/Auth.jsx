import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApp } from "../context/AppContext";

const users = [
  { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
  { id: "2", role: "Patient", email: "john@entnt.in", password: "patient123", patientId: "p1" }
];

export default function Auth() {
  const [currentUser, setCurrentUser] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const {notify} = useApp();
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const onSubmit = (data) => {
    const user = users.find(
      u => u.email === data.email && u.password === data.password
    );
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
      setCurrentUser(user);
        notify("success", `Welcome ${user.email}`);
      reset();
    } else {
    //   alert("Invalid credentials");
      notify("fail", `Invalid credentials`);

    }

  };

  const logout = () => {
    localStorage.removeItem("authUser");
    setCurrentUser(null);
  };

  if (currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {currentUser.role === "Admin" ? "Dentist" : "Patient"}
          </h2>
          <p className="mb-4">Logged in as: {currentUser.email}</p>
          {currentUser.role === "Admin" ? (
            <p className="text-blue-600">You have access to the Admin (Dentist) Dashboard</p>
          ) : (
            <p className="text-green-600">You have access to the Patient Portal</p>
          )}
          <button
            onClick={logout}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border px-3 py-2 rounded"
            />
            {errors.password && <p className="text-red-500 text-sm">Password is required</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
