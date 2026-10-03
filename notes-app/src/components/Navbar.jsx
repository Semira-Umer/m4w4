// src/components/Navbar.jsx
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ view, setView, counts }) {
  const { theme, toggleTheme } = useTheme();

  const tabs = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'pinned', label: 'Pinned', count: counts.pinned },
    { id: 'archived', label: 'Archived', count: counts.archived },
  ];

  return (
    <header className="navbar">
      <div className="navbar-top">
        <h1>📝 Notes</h1>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${view === tab.id ? 'active' : ''}`}
            onClick={() => setView(tab.id)}
          >
            {tab.label}
            <span className="badge">{tab.count}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}