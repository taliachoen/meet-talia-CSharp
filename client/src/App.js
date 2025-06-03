import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import './css/App.css';
import personalData from './data/personalData';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [activePage, setActivePage] = useState('about');
  console.log("process.env.REACT_APP_API_BASE_URL", process.env.REACT_APP_API_BASE_URL);

  useEffect(() => {
    let url = '';
    if (activePage === 'about') {
      setData([personalData]);
      return;
    } else if (activePage === 'projects') {
      url = `${process.env.REACT_APP_API_BASE_URL}/projects`;
    } else if (activePage === 'contact') {
      url = `${process.env.REACT_APP_API_BASE_URL}/contact`;
    }

    if (url) {
      axios.get(url)
        .then(response => {
          setData(response.data);
          setError('');
        })
        .catch(err => {
          console.error("error", err);
          setError('אירעה שגיאה בעת שליפת הנתונים מהשרת');
          console.error(err);
        });
    }
  }, [activePage]);

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
        {activePage === 'cv' ? (
          <li>
            <Card variant="cv" />
          </li>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>
              <Card project={item} variant={activePage} />
            </li>
          ))
        ) : (
          <p>אנא המתינו רגע, הנתונים מתארגנים... <br />
            הם רוצים להיראות במיטבם על המסך שלך! <br />
            עוד שנייה – והם כאן! 🎉</p>
        )}
      </ul>
    </div>
  );
}

export default App;