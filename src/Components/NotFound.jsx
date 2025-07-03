import { useApp } from "../context/AppContext";

export default function NotFound() {
    const {navigate} = useApp();
  return (
    <div
     to 
      className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center text-center px-6"
      style={{ backgroundImage: "url('/24284.jpg')" }}
    >
      <div className=" bg-gradient-to-br from-[#e1ffff] to-[#44bcf3] bg-opacity-90 backdrop-blur-md p-10 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">404</h1>
        <p className="text-xl font-semibold text-blue-700 mb-2">Page Not Found</p>
        <p className="text-sm text-gray-600 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
        >
          ⬅️ Go to Home
        </button>
      </div>
    </div>
  );
}
