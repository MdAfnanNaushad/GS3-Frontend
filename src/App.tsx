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
      <Layout>
        <TransitionProvider>
          <Routes>
            <Route
              index
              element={
                <TransitionComponent>
                  <Home />
                </TransitionComponent>
              }
            />
            <Route
              path="/about"
              element={
                <TransitionComponent>
                  <About />
                </TransitionComponent>
              }
            />
            <Route
              path="/contact"
              element={
                <TransitionComponent>
                  <Contact />
                </TransitionComponent>
              }
            />

            <Route
              path="/services"
              element={
                <TransitionComponent>
                  <Service />
                </TransitionComponent>
              }
            />

            {/* Add more routes here as needed */}
            <Route path="/case-studies/project1" element={<Project1 />} />
            <Route path="/case-studies/project2" element={<Project2 />} />
            <Route path="/case-studies/project3" element={<Project3 />} />
            <Route path="/case-studies/project4" element={<Project4 />} />
            <Route path="/case-studies/project5" element={<Project5 />} />
            <Route path="/case-studies/project6" element={<Project6 />} />

            <Route path="/admin" element={<AdminPage />} />
            <Route path="/all-projects" element={<AllProjects />} />
          </Routes>
        </TransitionProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
