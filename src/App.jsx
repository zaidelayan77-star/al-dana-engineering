
import { Routes, Route, useLocation } from "react-router-dom";

// Components
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Top from "./components/Top";

// Pages
import Home from "./components/pages/Home";
import AboutUs from "./components/pages/AboutUs";
import Services from "./components/pages/Services";
import Experience from "./components/pages/Experience";
import Certifications from "./components/pages/Certifications";
import Projects from "./components/pages/Projects";
import Gallery from "./components/pages/Gallery";
import ContactUs from "./components/pages/ContactUs";
import NotFound from "./components/pages/NotFound";

// Auth
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

// Admin
import UserProfile from "./components/admin/UserProfile";
import MyProjects from "./components/admin/MyProjects";
import SecuritySettings from "./components/admin/SecuritySettings";
import Notifications from "./components/admin/Notifications";
import Support from "./components/admin/Support";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Super Admin
import SuperDashboard from "./components/admin/super/Dashboard";
import SuperProjects from "./components/admin/super/Projects";
import SuperUsers from "./components/admin/super/Users";
import SuperContactUs from "./components/admin/super/ContactUsMessages";
import SuperSupport from "./components/admin/super/SupportTickets";
import SuperGallery from "./components/admin/super/GalleryManager";
import SuperCertifications from "./components/admin/super/CertificationsManager";
import SuperPartners from "./components/admin/super/PartnersManager";
import SuperTeamMembers from "./components/admin/super/TeamMembersManager";
import Team from "./components/pages/Team";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin/") || location.pathname.startsWith("/portal/super/admin/");
  const isAuthRoute = location.pathname.startsWith("/auth/");

  return (
    <>
      <Top />
      <ScrollToTop />
      {!isAdminRoute && !isAuthRoute && <Header />}
      <Routes>
        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Registration />} />

        {/* Admin / User Panel */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/profile" element={<UserProfile />} />
          <Route path="/admin/projects" element={<MyProjects />} />
          <Route path="/admin/security" element={<SecuritySettings />} />
          <Route path="/admin/notifications" element={<Notifications />} />
          <Route path="/admin/support" element={<Support />} />
        </Route>

        {/* Super Admin Panel */}
        <Route path="/portal/super/admin/dashboard" element={<SuperDashboard />} />
        <Route path="/portal/super/admin/projects" element={<SuperProjects />} />
        <Route path="/portal/super/admin/users" element={<SuperUsers />} />
        <Route path="/portal/super/admin/contact-us" element={<SuperContactUs />} />
        <Route path="/portal/super/admin/support" element={<SuperSupport />} />
        <Route path="/portal/super/admin/gallary" element={<SuperGallery />} />
        <Route path="/portal/super/admin/certifications" element={<SuperCertifications />} />
        <Route path="/portal/super/admin/partners" element={<SuperPartners />} />
        <Route path="/portal/super/admin/team-members" element={<SuperTeamMembers />} />

        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
        <Route path="/services" element={<Services />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<ContactUs />} />


        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && !isAuthRoute && <Footer />}
    </>
  );
}