import React, { useState } from "react";

const License = () => {
  const [license, setLicense] = useState("poko_example_key");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(license);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <main>
      <h2 className="title is-3">Your license</h2>
      <p className="subtitle is-6 poko-muted">
        Paste this key into the extension options page.
      </p>
      <div className="poko-card">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              className="input"
              type="text"
              value={license}
              onChange={(event) => setLicense(event.target.value)}
            />
          </div>
          <div className="control">
            <button className="button is-light" type="button" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <p className="poko-muted">
          License issuance is stubbed until the payment backend is connected.
        </p>
      </div>
    </main>
  );
};

export default License;
