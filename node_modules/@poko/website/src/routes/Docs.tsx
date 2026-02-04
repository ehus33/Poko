import React from "react";

const Docs = () => {
  return (
    <main>
      <h2 className="title is-3">Docs</h2>
      <div className="columns is-variable is-5">
        {[
          "Configure checkout selectors in Options.",
          "Use the popup to pause or resume the guard.",
          "Keep your license key handy for premium features."
        ].map((text) => (
          <div className="column" key={text}>
            <div className="poko-card">
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Docs;
