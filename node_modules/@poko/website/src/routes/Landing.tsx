import React from "react";

const Landing = () => {
  return (
    <main>
      <div className="poko-hero">
        <div>
          <span className="poko-chip">Mindful commerce · Local-only</span>
          <h2 className="title is-2">Calmer checkout experiences</h2>
          <p className="subtitle is-5 poko-muted">
            Poko gives you a quiet pause before a high-pressure purchase so you
            can check in with yourself.
          </p>
          <div className="buttons">
            <a className="button poko-cta" href="/pricing">
              See pricing
            </a>
            <a className="button is-light" href="/install">
              Install guide
            </a>
          </div>
        </div>
        <div className="poko-card is-bright">
          <h3 className="title is-5">What it does</h3>
          <ul className="content">
            <li>Detects urgency cues on storefronts.</li>
            <li>Adds a reflection moment before checkout.</li>
            <li>Tracks moments locally so you stay aware.</li>
          </ul>
          <div className="columns is-mobile">
            <div className="column">
              <p className="heading">Signal scan</p>
              <p className="title is-5">Always on</p>
            </div>
            <div className="column">
              <p className="heading">Data</p>
              <p className="title is-5">On device</p>
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-variable is-5 mt-5">
        {[
          {
            title: "Gentle guardrails",
            text: "Custom selectors match your favorite stores with precision."
          },
          {
            title: "Reflection moments",
            text: "Short prompts keep you grounded before impulse checkouts."
          },
          {
            title: "Premium insights",
            text: "See the patterns that lead to pressure moments over time."
          }
        ].map((item) => (
          <div className="column" key={item.title}>
            <div className="poko-card">
              <h4 className="title is-6">{item.title}</h4>
              <p className="poko-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Landing;
