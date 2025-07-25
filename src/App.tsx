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
import Project3 from "./layout/components/CaseStudies/Project3";
import Project4 from "./layout/components/CaseStudies/Project4";
import Project5 from "./layout/components/CaseStudies/Project5";
import Project6 from "./layout/components/CaseStudies/Project6";
import Project1 from "./layout/components/CaseStudies/Project1";
import Project2 from "./layout/components/CaseStudies/Project2";
import AdminPage from "./pages/AdminPage";
import AllProjects from "./pages/AllProjects";
import EmployeePage from "./pages/Admin/EmployeePage";
import ProjectsPage from "./pages/Admin/ProjectsPage";
import AboutPage from "./pages/Admin/AboutPage";
import CaseStudyPage from "./pages/Admin/CaseStudyPage";
import ContactPage from "./pages/Admin/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminLayout from "./layout/components/AdminPart/AdminLayout";
import ServicesPage from "./pages/Admin/ServicePage";
import EmployeeList from "./layout/components/AdminPart/EmployeeList";
import EmployeeStatus from "./pages/Admin/EmployeeStatus";
import ServicesOffered from "./pages/Admin/ServicesOffered";
import ClientServed from "./pages/Admin/ClientServed";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate 3-second loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer); // cleanup
  }, []);
  if (loading) {
    return <PageLoder />;
  }
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Routes>
          {/* Public pages wrapped in Layout */}
          <Route
            index
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
            path="/case-studies/project1"
            element={
              <Layout>
                <Project1 />
              </Layout>
            }
          />
          <Route
            path="/case-studies/project2"
            element={
              <Layout>
                <Project2 />
              </Layout>
            }
          />
          <Route
            path="/case-studies/project3"
            element={
              <Layout>
                <Project3 />
              </Layout>
            }
          />
          <Route
            path="/case-studies/project4"
            element={
              <Layout>
                <Project4 />
              </Layout>
            }
          />
          <Route
            path="/case-studies/project5"
            element={
              <Layout>
                <Project5 />
              </Layout>
            }
          />
          <Route
            path="/case-studies/project6"
            element={
              <Layout>
                <Project6 />
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

          {/* Admin and login pages NOT wrapped in Layout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="case-studies" element={<CaseStudyPage />} />
            <Route path="contacts" element={<ContactPage />} />
            <Route path="/admin/services" element={<ServicesPage />} />
            <Route path="/admin/employees" element={<EmployeeList />} />
            <Route path="active-employees" element={<EmployeeStatus />} />
            <Route path="services-offered" element={<ServicesOffered />} />
            <Route path="clients" element={<ClientServed />} />

          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/employee/login" element={<EmployeeLogin />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
