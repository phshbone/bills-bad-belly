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
  Settings,
  History,
  Upload,
  Search,
  Apple,
  NotebookPen,
  ArrowLeft,
  Minus,
  Plus,
} from 'lucide-react';
import './styles.css';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'scan', label: 'Scan', icon: Camera },
  { id: 'flare', label: 'Flare', icon: Activity },
  { id: 'me', label: 'Me', icon: User },
];

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Version 0.3</p>
          <h1>bill's bad belly</h1>
        </div>
        <div className="logo-mark" aria-hidden="true">bb</div>
      </header>

      <section className="screen-card">
        {activeTab === 'home' && <HomeScreen setActiveTab={setActiveTab} />}
        {activeTab === 'scan' && <ScanScreen />}
        {activeTab === 'flare' && <FlareScreen />}
        {activeTab === 'me' && <MeScreen />}
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

function HomeScreen({ setActiveTab }) {
  const [range, setRange] = useState('today');

  const ranges = [
    { id: 'today', label: 'Today' },
    { id: 'week', label: '7 Days' },
    { id: 'month', label: '30 Days' },
  ];

  return (
    <div className="screen-content">
      <ScreenTitle title="Home" subtitle="Can I safely eat this right now?" />

      <div className="belly-meter">
        <Gauge size={42} />
        <div>
          <p>Belly Meter</p>
          <strong>Steady</strong>
          <span>{ranges.find((item) => item.id === range)?.label} view — placeholder trend status.</span>
        </div>
      </div>

      <div className="segmented-control">
        {ranges.map((item) => (
          <button
            key={item.id}
            className={range === item.id ? 'selected' : ''}
            onClick={() => setRange(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid two">
     <ActionCard icon={Camera} title="Scan Food" text="Check a meal, snack, label, or menu." onClick={() => setActiveTab('scan')} />
<ActionCard icon={ClipboardList} title="Daily Log" text="Quick symptom and food note." onClick={() => setActiveTab('me')} />
<ActionCard icon={Zap} title="Flare Help" text="Switch to stricter guidance." onClick={() => setActiveTab('flare')} />
<ActionCard icon={CalendarDays} title="Trends" text="Future symptom patterns." onClick={() => setActiveTab('me')} />
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
  const [meScreen, setMeScreen] = useState('main');

  if (meScreen === 'daily-log') {
    return <DailyLogScreen onBack={() => setMeScreen('main')} />;
  }

  return (
    <div className="screen-content">
      <ScreenTitle title="Me" subtitle="Personal food profile and app records." />

      <div className="list-stack">
        <ListRow icon={Apple} title="My Foods" />
        <ListRow icon={ClipboardList} title="Daily Log" onClick={() => setMeScreen('daily-log')} />
        <ListRow icon={NotebookPen} title="Notes" />
        <ListRow icon={History} title="History" />
        <ListRow icon={Settings} title="Settings" />
      </div>
    </div>
  );
}

function DailyLogScreen({ onBack }) {
  const [bellyStatus, setBellyStatus] = useState('Good');
  const [painLevel, setPainLevel] = useState(0);
  const [bathroomTrips, setBathroomTrips] = useState(0);
  const [urgency, setUrgency] = useState('None');
  const [notes, setNotes] = useState('');

  function saveLog() {
    console.log({
      bellyStatus,
      painLevel,
      bathroomTrips,
      urgency,
      notes,
    });
  }

  return (
    <div className="screen-content">
      <button className="back-button" onClick={onBack} type="button">
        <ArrowLeft size={20} />
        Back
      </button>

      <ScreenTitle title="Me → Daily Log" subtitle="10-second Crohn's check-in." />

      <LogSection title="Belly Status">
        <TapGroup
          options={['Good', 'Ehhh', 'Rough', 'Flare']}S
          value={bellyStatus}
          onChange={setBellyStatus}
        />
      </LogSection>

      <LogSection title={`Pain Level: ${painLevel}`}>
        <input
          className="pain-slider"
          type="range"
          min="0"
          max="10"
          value={painLevel}
          onChange={(event) => setPainLevel(Number(event.target.value))}
        />
      </LogSection>

      <LogSection title="Bathroom Trips">
        <div className="counter-control">
          <button
            type="button"
            onClick={() => setBathroomTrips((current) => Math.max(0, current - 1))}
          >
            <Minus size={20} />
          </button>

          <strong>{bathroomTrips}</strong>

          <button
            type="button"
            onClick={() => setBathroomTrips((current) => current + 1)}
          >
            <Plus size={20} />
          </button>
        </div>
      </LogSection>

      <LogSection title="Urgency">
        <TapGroup
          options={['None', 'Mild', 'Moderate', 'Severe']}
          value={urgency}
          onChange={setUrgency}
        />
      </LogSection>

      <LogSection title="Optional Notes">
        <textarea
          className="notes-box"
          placeholder="Anything worth remembering?"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
        />
      </LogSection>

      <button className="primary-action full-width" onClick={saveLog} type="button">
        Save Log
      </button>

      <div className="recent-logs">
        <h3>Recent Logs</h3>

        <div className="recent-log-card">
          <strong>June 15</strong>
          <span>Status: Okay</span>
          <span>Pain: 2</span>
        </div>

        <div className="recent-log-card">
          <strong>June 14</strong>
          <span>Status: Good</span>
          <span>Pain: 1</span>
        </div>

        <div className="recent-log-card">
          <strong>June 13</strong>
          <span>Status: Rough</span>
          <span>Pain: 5</span>
        </div>
      </div>
    </div>
  );
}

function TapGroup({ options, value, onChange }) {
  return (
    <div className="tap-group">
      {options.map((option) => (
        <button
          key={option}
          className={value === option ? 'selected' : ''}
          onClick={() => onChange(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function LogSection({ title, children }) {
  return (
    <section className="log-section">
      <h3>{title}</h3>
      {children}
    </section>
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

function ActionCard({ icon: Icon, title, text, onClick }) {
  return (
    <button
      className="action-card"
      onClick={onClick}
      type="button"
    >
      <Icon size={24} />
      <h3>{title}</h3>
      <p>{text}</p>
    </button>
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

function ListRow({ icon: Icon, title, onClick }) {
  return (
    <button className="list-row" onClick={onClick} type="button">
      <Icon size={22} />
      <span>{title}</span>
      <strong>›</strong>
    </button>
  );
}

createRoot(document.getElementById('root')).render(<App />);