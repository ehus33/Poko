import React, { useEffect, useState } from "react";

const STORAGE_KEY = "poko:kakeibo";

type JournalEntry = {
  id: string;
  date: string;
  text: string;
};

type KakeiboState = {
  streak: number;
  lastCheckIn: string | null;
  entries: JournalEntry[];
};

const todayKey = () => new Date().toISOString().slice(0, 10);

const normalizeState = (state: Partial<KakeiboState>): KakeiboState => {
  return {
    streak: typeof state.streak === "number" ? state.streak : 0,
    lastCheckIn: state.lastCheckIn ?? null,
    entries: Array.isArray(state.entries) ? state.entries : []
  };
};

const readState = (): KakeiboState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { streak: 0, lastCheckIn: null, entries: [] };
    }
    return normalizeState(JSON.parse(raw) as Partial<KakeiboState>);
  } catch {
    return { streak: 0, lastCheckIn: null, entries: [] };
  }
};

const writeState = (state: KakeiboState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const Kakeibo = () => {
  const [state, setState] = useState<KakeiboState>({
    streak: 0,
    lastCheckIn: null,
    entries: []
  });
  const [entryText, setEntryText] = useState("");

  useEffect(() => {
    setState(readState());
  }, []);

  const checkIn = () => {
    const today = todayKey();
    if (state.lastCheckIn === today) {
      return;
    }
    const next = {
      streak: state.streak + 1,
      lastCheckIn: today,
      entries: state.entries
    };
    writeState(next);
    setState(next);
  };

  const reset = () => {
    const next = { streak: 0, lastCheckIn: null, entries: [] };
    writeState(next);
    setState(next);
  };

  const addEntry = () => {
    const trimmed = entryText.trim();
    if (!trimmed) {
      return;
    }
    const nextEntry: JournalEntry = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString(),
      text: trimmed
    };
    const next = {
      ...state,
      entries: [nextEntry, ...state.entries]
    };
    writeState(next);
    setState(next);
    setEntryText("");
  };

  const checkedInToday = state.lastCheckIn === todayKey();

  return (
    <main>
      <h2 className="title is-3">Kakeibo streaks</h2>
      <p className="subtitle is-6 poko-muted">
        Track mindful spending days and keep your kitty thriving.
      </p>
      <div className="columns is-variable is-5">
        <div className="column is-half">
          <div className="poko-card is-bright">
            <div className="poko-kitty">
              <svg viewBox="0 0 128 128" aria-hidden="true">
                <path
                  d="M26 34c4-14 16-22 38-22s34 8 38 22l10-10c6 10 6 22 2 32v38c0 12-10 22-22 22H36c-12 0-22-10-22-22V56c-4-10-4-22 2-32l10 10z"
                  fill="#ffd9c2"
                />
                <path
                  d="M44 60c0-6 8-10 20-10s20 4 20 10-8 12-20 12-20-6-20-12z"
                  fill="#ffb89c"
                />
                <circle cx="50" cy="56" r="5" fill="#1c1d24" />
                <circle cx="78" cy="56" r="5" fill="#1c1d24" />
                <path
                  d="M62 68c2 3 2 6 0 9"
                  stroke="#1c1d24"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h3 className="title is-4">Kitty streak</h3>
            <p className="subtitle is-5">{state.streak} day streak</p>
            <p className="poko-muted">
              Check in each day you pause a purchase. Your kitty glows with
              every mindful choice.
            </p>
            <div className="buttons">
              <button
                className="button poko-cta"
                type="button"
                onClick={checkIn}
                disabled={checkedInToday}
              >
                {checkedInToday ? "Checked in today" : "Check in today"}
              </button>
              <button className="button is-light" type="button" onClick={reset}>
                Reset streak
              </button>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="poko-card">
            <h3 className="title is-5">Kakeibo journal</h3>
            <p className="poko-muted">
              Write a quick reflection each day to reinforce the habit.
            </p>
            <div className="field">
              <div className="control">
                <textarea
                  className="textarea"
                  rows={4}
                  placeholder="What did I pause on today? How do I feel about it?"
                  value={entryText}
                  onChange={(event) => setEntryText(event.target.value)}
                />
              </div>
            </div>
            <div className="buttons">
              <button className="button poko-cta" type="button" onClick={addEntry}>
                Save entry
              </button>
              <button
                className="button is-light"
                type="button"
                onClick={() => setEntryText("")}
              >
                Clear
              </button>
            </div>
            <div className="content">
              {state.entries.length === 0 ? (
                <p className="poko-muted">
                  Your reflections will appear here. Stored locally, no backend
                  needed.
                </p>
              ) : (
                <ul>
                  {state.entries.slice(0, 5).map((entry) => (
                    <li key={entry.id}>
                      <strong>{entry.date}:</strong> {entry.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Kakeibo;
