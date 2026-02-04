import React from "react";

const GUMROAD_URL = "https://ethanwave33.gumroad.com/l/poko-premium";

const Pricing = () => {
  const openGumroad = () => {
    window.open(
      GUMROAD_URL,
      "poko-gumroad",
      "noopener,noreferrer,width=980,height=720"
    );
  };

  return (
    <main>
      <h2 className="title is-3">Pricing</h2>
      <p className="subtitle is-6 poko-muted">
        Start free, upgrade anytime for premium guardrails.
      </p>
      <div className="columns is-variable is-5">
        <div className="column is-half">
          <div className="poko-card">
            <h3 className="title is-4">Free</h3>
            <p className="subtitle is-5">$0 forever</p>
            <ul className="content">
              <li>Pause overlay on checkout clicks</li>
              <li>Pressure cue highlighting</li>
              <li>Sync settings across devices</li>
            </ul>
            <a className="button is-light" href="/install">
              Get started
            </a>
          </div>
        </div>
        <div className="column is-half">
          <div className="poko-card is-bright">
            <h3 className="title is-4">Premium</h3>
            <p className="subtitle is-5">$2 / month</p>
            <ul className="content">
              <li>Unlimited pressure guard rules</li>
              <li>Reflection prompts & journaling</li>
              <li>Local analytics dashboard</li>
              <li>Priority feature requests</li>
            </ul>
            <p className="poko-muted">
              Billing handled on Gumroad. Includes a 1 week free trial.
            </p>
            <a
              className="button poko-cta"
              href={GUMROAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                event.preventDefault();
                openGumroad();
              }}
            >
              Upgrade on Gumroad
            </a>
          </div>
        </div>
      </div>
      <p className="poko-muted mt-4">
        You can stay on the free plan forever and try Premium risk-free with the
        1 week trial.
      </p>
    </main>
  );
};

export default Pricing;
