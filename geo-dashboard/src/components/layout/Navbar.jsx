import { useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50
      bg-linear-to-r from-indigo-600 to-blue-500
      dark:from-gray-900 dark:to-gray-800
      shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo / Title */}
        <h1 className="text-white text-xl font-bold tracking-wide">
          Geo Data Dashboard
        </h1>

        {/* Nav Items */}
        <div className="flex items-center gap-6">

          {/* Active Nav Highlight (Single Page Dashboard) */}
          <span className="text-white font-semibold border-b-2 border-white pb-1">
            Dashboard
          </span>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-white/20 hover:bg-white/30
              text-white px-3 py-1 rounded-lg text-sm transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

