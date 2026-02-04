import React from "react";

const Install = () => {
  return (
    <main>
      <h2 className="title is-3">Install Poko</h2>
      <p className="subtitle is-6 poko-muted">
        Load the MV3 extension in under two minutes.
      </p>
      <div className="poko-card">
        <ol className="content">
          <li>Build the extension package.</li>
          <li>Open Chrome extensions and enable developer mode.</li>
          <li>Load the unpacked extension from the build folder.</li>
        </ol>
        <p className="poko-muted">Detailed steps are available in the docs.</p>
      </div>
    </main>
  );
};

export default Install;
