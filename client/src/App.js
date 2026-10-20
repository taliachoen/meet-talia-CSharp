import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import './css/App.css';

function App() {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState('about');

  // Fetch projects as soon as the site opens. The server sleeps when idle (free hosting),
  // so starting early "wakes it up" and the projects are usually ready by the time they are opened.
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`)
      .then(response => {
        setProjects(response.data);
        setError('');
      })
      .catch(err => {
        console.error("error", err);
        setError('אירעה שגיאה בעת שליפת הנתונים מהשרת');
      });
  }, []);

  const data = activePage === 'projects' ? (projects || []) : [];

  const getHebrewTitle = (page) => {
    switch (page) {
      case 'about': return 'אודות';
      case 'projects': return 'פרויקטים';
      case 'contact': return 'צור קשר';
      case 'cv': return 'קורות חיים';
      default: return '';
    }
  };

  return (
    <div className="app-container" dir="rtl">
      <header className="main-header">
        <nav>
          <ul className="menu">
            <li>
              <button
                className={activePage === 'about' ? 'active' : ''}
                onClick={() => setActivePage('about')}
              >
                אודות
              </button>
            </li>
            <li>
              <button
                className={activePage === 'projects' ? 'active' : ''}
                onClick={() => setActivePage('projects')}
              >
                פרויקטים
              </button>
            </li>
            <li>
              <button
                className={activePage === 'cv' ? 'active' : ''}
                onClick={() => setActivePage('cv')}
              >
                קורות חיים
              </button>
            </li>
            <li>
              <button
                className={activePage === 'contact' ? 'active' : ''}
                onClick={() => setActivePage('contact')}
              >
                צור קשר
              </button>
            </li>
          </ul>
        </nav>
        <div className="site-logo">
          <div className="site-name">&lt;טליה כהן&gt;</div>
          <div className="site-slogan">בואו ניצור יחד</div>
        </div>

      </header>
      <div className="hero">
        <h2 className="main-title">ברוכים הבאים</h2>
        <div className="subtitle">
          <span>בואו נעשה הכרות</span>
          <span className="wave">😊</span>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <h2 className="section-title">{getHebrewTitle(activePage)}</h2>

      <ul className="card-list">
        {['cv', 'about', 'contact'].includes(activePage) ? (
          <li>
            <Card variant={activePage} />
          </li>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>
              <Card project={item} variant={activePage} />
            </li>
          ))
        ) : (
          !error && (
            <div style={{ textAlign: 'center' }}>
              <div className="spinner" style={{ margin: '20px auto' }}></div>
              <p>טוען את הפרויקטים... ⏳<br />
                האתר מאוחסן בשרת חינמי שנכנס למצב שינה כשאין בו תנועה,<br />
                ולכן הטעינה הראשונה עשויה לקחת עד חצי דקה. תודה על הסבלנות!</p>
            </div>
          )
        )}
      </ul>
      <footer className="main-footer">
        <p style={{
          margin: 0, color: 'black',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
        }}>© {new Date().getFullYear()} טליה כהן</p>
      </footer>
    </div>
  );
}

export default App;