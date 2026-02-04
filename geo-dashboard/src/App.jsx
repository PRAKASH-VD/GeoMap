import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <Dashboard />
      </main>

      {/* Fixed Footer */}
      <Footer />
    </div>
  );
};

export default App;
