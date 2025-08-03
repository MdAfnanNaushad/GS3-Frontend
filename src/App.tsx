import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Service from "./pages/Service";
import gsap from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { TransitionProvider } from "./Context/TransitionContext";
import TransitionComponent from "./Context/Transition";
import Layout from "./layout/Layout";
import { useEffect, useState } from "react";
import PageLoder from "./layout/components/common/PageLoder";
import AdminPage from "./pages/AdminPage";
import AllProjects from "./pages/AllProjects";
import EmployeePage from "./pages/Admin/EmployeePage";
import ProjectsPage from "./pages/Admin/ProjectsPage";
import AboutPage from "./pages/Admin/AboutPage";
import ContactPage from "./pages/Admin/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLayout from "./layout/components/AdminPart/AdminLayout";
import ServicesPage from "./pages/Admin/ServicePage";
import EmployeeList from "./layout/components/AdminPart/EmployeeList";
import EmployeeStatus from "./pages/Admin/EmployeeStatus";
import ServicesOffered from "./pages/Admin/ServicesOffered";
import ClientServed from "./pages/Admin/ClientServed";
import TeamPage from "./pages/Admin/TeamPage";


import CaseStudy from "./layout/components/CaseStudies/CaseStudy";

import CaseStudyPage from "./pages/Admin/CaseStudyPage";
import ProtectedRoute from "./layout/components/Auth/ProtectedRoute";
import AITrainingPage from "./pages/Admin/AITrainingPage";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoder />;
  }

  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route
            path="/"
            element={
              <Layout>
                <TransitionComponent>
                  <Home />
                </TransitionComponent>
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <TransitionComponent>
                  <About />
                </TransitionComponent>
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <TransitionComponent>
                  <Contact />
                </TransitionComponent>
              </Layout>
            }
          />
          <Route
            path="/services"
            element={
              <Layout>
                <TransitionComponent>
                  <Service />
                </TransitionComponent>
              </Layout>
            }
          />
          <Route
            path="/all-projects"
            element={
              <Layout>
                <AllProjects />
              </Layout>
            }
          />

          <Route
            path="/case-study/:id"
            element={
              <Layout>
                <CaseStudy />
              </Layout>
            }
          />

          {/* --- ADMIN ROUTES --- */}
          <Route path="/admin" element={
            <ProtectedRoute>
               <AdminLayout />
            </ProtectedRoute>
           
            
            }>
            <Route index element={<AdminPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about" element={<AboutPage />} />

            <Route path="case-studies" element={<CaseStudyPage />} />

            <Route path="employee" element={<EmployeePage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route path="active-employees" element={<EmployeeStatus />} />
            <Route path="services-offered" element={<ServicesOffered />} />
            <Route path="clients" element={<ClientServed />} />
             <Route path="ai-training" element={<AITrainingPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          {/* --- LOGIN ROUTES --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
