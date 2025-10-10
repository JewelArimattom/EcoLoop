import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import NavigationBar from './components/layout/Navbar';
import Footer from './components/footer/Footer';
import SchedulePickup from './pages/SchedulePickup';
import HowItWorks from './pages/HowItWorks';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const userName = "EcoUser";
  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout} />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="*" element={<div className="p-8 text-center"><h1>404 - Page Not Found</h1><p>Sorry, the page you are looking for does not exist.</p></div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;