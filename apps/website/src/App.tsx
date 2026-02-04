import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Install from "./routes/Install";
import Pricing from "./routes/Pricing";
import License from "./routes/License";
import Privacy from "./routes/Privacy";
import Docs from "./routes/Docs";
import Kakeibo from "./routes/Kakeibo";
import logo from "./assets/poko.png";

const App = () => {
  return (
    <div className="poko-app">
      <div className="poko-glow is-primary" />
      <div className="poko-glow is-secondary" />
      <section className="section">
        <div className="container">
          <header className="poko-shell">
            <nav className="navbar is-transparent poko-nav" role="navigation">
              <div className="navbar-brand">
                <span className="navbar-item poko-brand">
                  <img src={logo} alt="Poko" className="poko-logo" />
                </span>
              </div>
              <div className="navbar-menu is-active">
                <div className="navbar-end poko-nav-grid">
                  {[
                    {
                      to: "/",
                      label: "Home",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1v-4.5h-3V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5z" />
                        </svg>
                      )
                    },
                    {
                      to: "/install",
                      label: "Install",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 3a1 1 0 0 1 1 1v8.17l2.6-2.6a1 1 0 1 1 1.4 1.42l-4.3 4.3a1 1 0 0 1-1.4 0l-4.3-4.3a1 1 0 1 1 1.4-1.42l2.6 2.6V4a1 1 0 0 1 1-1zM5 19a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" />
                        </svg>
                      )
                    },
                    {
                      to: "/pricing",
                      label: "Pricing",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 3h6l5 5v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm5.5 5.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                        </svg>
                      )
                    },
                    {
                      to: "/license",
                      label: "License",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v8a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3v-8a1 1 0 0 1 1-1h1zm2 0h6V8a3 3 0 0 0-6 0v2z" />
                        </svg>
                      )
                    },
                    {
                      to: "/docs",
                      label: "Docs",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 3h9l3 3v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm8 1.5V7h2.5L14 4.5zM7 10h10v2H7v-2zm0 4h10v2H7v-2z" />
                        </svg>
                      )
                    },
                    {
                      to: "/kakeibo",
                      label: "Kakeibo",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M6 3l6 3 6-3v9a7 7 0 1 1-12 0V3z" />
                        </svg>
                      )
                    },
                    {
                      to: "/privacy",
                      label: "Privacy",
                      icon: (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 3l7 3v5c0 5.25-3.5 9-7 10-3.5-1-7-4.75-7-10V6l7-3zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                        </svg>
                      )
                    }
                  ].map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `navbar-item ${isActive ? "is-active" : ""}`
                      }
                    >
                      <span className="icon is-medium">{item.icon}</span>
                      <span className="poko-nav-label">{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </nav>
            <div className="section" style={{ paddingTop: 8 }}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/install" element={<Install />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/license" element={<License />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/kakeibo" element={<Kakeibo />} />
                <Route path="/privacy" element={<Privacy />} />
              </Routes>
            </div>
          </header>
        </div>
      </section>
    </div>
  );
};

export default App;
