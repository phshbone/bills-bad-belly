import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Home,
  Camera,
  Activity,
  User,
  Gauge,
  CalendarDays,
  Zap,
  ClipboardList,
  ShieldCheck,
  Ban,
  BookOpen,
  Settings,
  History,
  Upload,
  Search,
  Apple,
  NotebookPen,
} from 'lucide-react';
import './styles.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'scan', label: 'Scan', icon: Camera },
  { id: 'flare', label: 'Flare', icon: Activity },
  { id: 'me', label: 'Me', icon: User },
];

const screens = {
  home: HomeScreen,
  scan: ScanScreen,
  flare: FlareScreen,
  me: MeScreen,
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const ActiveScreen = screens[activeTab];

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Version 0.2</p>
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
  const [range, setRange] = useState('Today');

  return (
    <div className="screen-content">
      <ScreenTitle title="Home" subtitle="Can I safely eat this right now?" />

      <div className="belly-meter">
        <Gauge size={42} />
        <div>
          <p>Belly Meter</p>
          <strong>Steady</strong>
          <span>{range} view — placeholder trend status.</span>
        </div>
      </div>

      <div className="segmented-control">
        {['Today', '7 Days', '30 Days'].map((item) => (
          <button
            key={item}
            className={range === item ? 'selected' : ''}
            onClick={() => setRange(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid two">
        <ActionCard icon={Camera} title="Scan Food" text="Check a meal, snack, label, or menu." />
        <ActionCard icon={ClipboardList} title="Daily Log" text="Quick symptom and food note." />
        <ActionCard icon={Zap} title="Flare Help" text="Switch to stricter guidance." />
        <ActionCard icon={CalendarDays} title="Trends" text="Future symptom patterns." />
      </div>
    </div>
  );
}

function ScanScreen() {
  return (
    <div className="screen-content">
      <ScreenTitle title="Scan" subtitle="Photo-based Crohn's food check shell." />

      <div className="camera-placeholder">
        <Camera size={54} />
        <p>Camera Placeholder</p>
        <span>Image capture and AI analysis come later.</span>
      </div>

      <div className="button-stack">
        <button className="primary-action" type="button">
          <Upload size={20} />
          Upload Image
        </button>

        <button className="secondary-action" type="button">
          <Search size={20} />
          Analyze
        </button>
      </div>

      <div className="results-panel">
        <ResultCard label="Good Foods" text="Foods that appear safer will show here." />
        <ResultCard label="Caution Foods" text="Possible trigger foods will show here." />
        <ResultCard label="Avoid Foods" text="Higher-risk foods will show here." />
      </div>
    </div>
  );
}

function FlareScreen() {
  const [mode, setMode] = useState('Normal');

  return (
    <div className="screen-content">
      <ScreenTitle title="Flare" subtitle="Normal and flare-mode food guidance." />

      <div className="mode-toggle">
        {['Normal', 'Flare'].map((item) => (
          <button
            key={item}
            className={mode === item ? 'selected' : ''}
            onClick={() => setMode(item)}
            type="button"
          >
            {item} Mode
          </button>
        ))}
      </div>

      <div className="panel-list">
        <FoodPanel
          icon={ShieldCheck}
          title="Safe Foods"
          foods={['White rice', 'Bananas', 'Plain chicken', 'Applesauce']}
        />

        <FoodPanel
          icon={Ban}
          title="Avoid Foods"
          foods={['Seeds', 'Raw vegetables', 'Fried foods', 'Carbonated drinks']}
        />
      </div>
    </div>
  );
}

function MeScreen() {
  return (
    <div className="screen-content">
      <ScreenTitle title="Me" subtitle="Personal food profile and app records." />

      <div className="list-stack">
        <ListRow icon={Apple} title="My Foods" />
        <ListRow icon={ClipboardList} title="Daily Log" />
        <ListRow icon={NotebookPen} title="Notes" />
        <ListRow icon={History} title="History" />
        <ListRow icon={Settings} title="Settings" />
      </div>
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

function ResultCard({ label, text }) {
  return (
    <article className="result-card">
      <h3>{label}</h3>
      <p>{text}</p>
    </article>
  );
}

function FoodPanel({ icon: Icon, title, foods }) {
  return (
    <article className="food-panel">
      <div className="food-panel-title">
        <Icon size={22} />
        <h3>{title}</h3>
      </div>

      <ul>
        {foods.map((food) => (
          <li key={food}>{food}</li>
        ))}
      </ul>
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

createRoot(document.getElementById('root')).render(<App />);