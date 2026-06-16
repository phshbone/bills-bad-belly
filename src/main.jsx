import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Home, Camera, Activity, User, Gauge, CalendarDays, Zap, ClipboardList, ShieldCheck, Ban, BookOpen, Settings, History } from 'lucide-react';
import './styles.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'scan', label: 'Scan', icon: Camera },
  { id: 'flare', label: 'Flare', icon: Activity },
  { id: 'me', label: 'Me', icon: User },
];

const blueprintSummary = `Bottom Navigation
* Home
* Scan
* Flare
* Me

Home
* Belly Meter
* Today / 7 Days / 30 Days
* Quick Actions

Scan
* Camera placeholder
* Quick Mode
* Full Breakdown

Flare
* Normal Mode / Flare Mode
* Safe Foods
* Avoid Foods

Me
* My Foods
* Daily Log
* Notes
* History
* Settings
---
The advantage is that the new chat becomes:

### Build Chat`;

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const ActiveScreen = screens[activeTab];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Version 0.1</p>
          <h1>bill's bad belly</h1>
        </div>
        <div className="logo-mark" aria-hidden="true">bb</div>
      </header>

      <section className="screen-card">
        <ActiveScreen />
      </section>

      <nav className="bottom-nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={isActive ? 'nav-button active' : 'nav-button'}
              onClick={() => setActiveTab(item.id)}
              type="button"
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </main>
  );
}

function HomeScreen() {
  return (
    <div className="screen-content">
      <ScreenTitle title="Home" subtitle="Quick status and daily gut check." />
      <div className="belly-meter">
        <Gauge size={42} />
        <div>
          <p>Belly Meter</p>
          <strong>Steady</strong>
          <span>Placeholder score for Version 0.1</span>
        </div>
      </div>
      <div className="segmented-control">
        <button>Today</button>
        <button>7 Days</button>
        <button>30 Days</button>
      </div>
      <div className="grid two">
        <ActionCard icon={Camera} title="Scan food" text="Open camera placeholder." />
        <ActionCard icon={ClipboardList} title="Daily log" text="Track symptoms later." />
        <ActionCard icon={Zap} title="Flare check" text="Switch mode later." />
        <ActionCard icon={CalendarDays} title="History" text="Review patterns later." />
      </div>
    </div>
  );
}

function ScanScreen() {
  return (
    <div className="screen-content">
      <ScreenTitle title="Scan" subtitle="Camera shell for food and menu checks." />
      <div className="camera-placeholder">
        <Camera size={54} />
        <p>Camera placeholder</p>
        <span>No image analysis in Version 0.1.</span>
      </div>
      <div className="grid two">
        <ActionCard icon={Zap} title="Quick Mode" text="Fast Good / Caution / Avoid result later." />
        <ActionCard icon={BookOpen} title="Full Breakdown" text="Ingredient-level explanation later." />
      </div>
    </div>
  );
}

function FlareScreen() {
  return (
    <div className="screen-content">
      <ScreenTitle title="Flare" subtitle="Mode shell for normal and flare guidance." />
      <div className="mode-toggle">
        <button className="selected">Normal Mode</button>
        <button>Flare Mode</button>
      </div>
      <div className="grid two">
        <ActionCard icon={ShieldCheck} title="Safe Foods" text="Placeholder list for flare-safe foods." />
        <ActionCard icon={Ban} title="Avoid Foods" text="Placeholder list for foods to avoid." />
      </div>
    </div>
  );
}

function MeScreen() {
  return (
    <div className="screen-content">
      <ScreenTitle title="Me" subtitle="Personal food profile and app records." />
      <div className="list-stack">
        <ListRow icon={BookOpen} title="My Foods" />
        <ListRow icon={ClipboardList} title="Daily Log" />
        <ListRow icon={BookOpen} title="Notes" />
        <ListRow icon={History} title="History" />
        <ListRow icon={Settings} title="Settings" />
      </div>
      <details className="blueprint-box">
        <summary>Blueprint Summary</summary>
        <pre>{blueprintSummary}</pre>
      </details>
    </div>
  );
}

function ScreenTitle({ title, subtitle }) {
  return (
    <div className="screen-title">
      <p>{title}</p>
      <h2>{subtitle}</h2>
    </div>
  );
}

function ActionCard({ icon: Icon, title, text }) {
  return (
    <article className="action-card">
      <Icon size={24} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ListRow({ icon: Icon, title }) {
  return (
    <button className="list-row" type="button">
      <Icon size={22} />
      <span>{title}</span>
      <strong>›</strong>
    </button>
  );
}

const screens = {
  home: HomeScreen,
  scan: ScanScreen,
  flare: FlareScreen,
  me: MeScreen,
};

createRoot(document.getElementById('root')).render(<App />);
