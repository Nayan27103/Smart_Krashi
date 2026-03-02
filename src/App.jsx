import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ComingSoonPage from './pages/ComingSoonPage';

// Dashboard Pages
import DashboardOverview from './pages/dashboard/DashboardOverview';
import CropDiseasePage from './pages/dashboard/CropDiseasePage';
import SoilFertilityPage from './pages/dashboard/SoilFertilityPage';
import WeatherPage from './pages/dashboard/WeatherPage';
import PesticidePage from './pages/dashboard/PesticidePage';
import MandiPricePage from './pages/dashboard/MandiPricePage';
import PriceForecastPage from './pages/dashboard/PriceForecastPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

// Mock Auth wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = true; // Mock authentication
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Catch All Routes inside Public Layout */}
          <Route path="*" element={<ComingSoonPage />} />
        </Route>

        {/* Farmer Dashboard Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardOverview />} />
          <Route path="crop-disease" element={<CropDiseasePage />} />
          <Route path="soil-fertility" element={<SoilFertilityPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="pesticide" element={<PesticidePage />} />
          <Route path="mandi-prices" element={<MandiPricePage />} />
          <Route path="price-forecast" element={<PriceForecastPage />} />

          {/* Catch All Dashboard Routes */}
          <Route path="*" element={<ComingSoonPage />} />
        </Route>

        {/* Admin Dashboard Protected Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <DashboardLayout isAdmin={true} />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="*" element={<ComingSoonPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
