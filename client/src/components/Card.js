import React, { useState } from 'react';
import '../css/Card.css';

const Card = ({ project, variant }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [roleData, setRoleData] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  if (!project && variant !== 'cv') return null;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ai/analyze-fit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobDescription: roleData,
          requirements: roleData
        })
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.result);
      } else {
        setResponse(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setResponse('❌ Failed to connect to AI server');
    }
    setLoading(false);
  };

  switch (variant) {
    case 'about':
      return (
        <div className="card card-about">
          <h2>{project.name}</h2>
          <p><strong>תפקיד:</strong> {project.title}</p>
          <p><strong>הפוקוס שלי:</strong> {project.focus}</p>
          <p><strong>השכלה:</strong> {project.education}</p>
          <p><strong>שפות וטכנולוגיות:</strong> {project.languages?.join(', ')}</p>
          <p><strong>מיקום:</strong> {project.location}</p>
          <p><strong>אודות:</strong> {project.about}</p>
          {project.email && <p><strong>אימייל:</strong> {project.email}</p>}

          <div className="about-personal">
            <h3>קצת עליי</h3>
            <p>
              מאז שאני זוכרת את עצמי, אהבתי ליצור, לפתור בעיות ולגלות עולמות חדשים. עולם הפיתוח מאפשר לי לשלב יצירתיות, חשיבה לוגית והשפעה אמיתית על אנשים. אני מאמינה שכל פרויקט הוא הזדמנות לצמוח, ללמוד ולשמח אחרים – וזה מה שמניע אותי כל יום מחדש.
            </p>
          </div>

          <div className="about-values">
            <h4>הערכים שמובילים אותי:</h4>
            <ul>
              <li>🌟 אמינות ושקיפות</li>
              <li>🔥 מוטיבציה רבה</li>
              <li>🤝 עבודת צוות ושיתוף פעולה</li>
              <li>🚀 למידה מתמדת</li>
              <li>❤️ תשוקה אמיתית לעשייה</li>
            </ul>
          </div>

          <div className="ai-section">
            <button
              className={`ai-toggle-btn${isFormVisible ? ' active' : ''}`}
              onClick={() => setIsFormVisible(!isFormVisible)}
              type="button"
              style={isFormVisible ? { display: 'none' } : {}}
            >
              מה הבינה המלאכותית אומרת עליי?
            </button>
            {isFormVisible && (
              <form className="ai-form" onSubmit={handleFormSubmit}>
                <textarea
                  className="ai-textarea"
                  placeholder="תארו את סוג התפקיד או הדרישות הרצויות (למשל: אני צריכה מפתחת רצינית, אחראית ונחמדה כאחד)"
                  value={roleData}
                  onChange={(e) => setRoleData(e.target.value)}
                  rows="4"
                  disabled={loading}
                />
                <div className="ai-form-actions">
                  <button className="ai-submit-btn" type="submit" disabled={loading}>
                    שליחה
                  </button>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={() => setIsFormVisible(false)}
                    disabled={loading}
                  >
                    ביטול
                  </button>
                </div>
              </form>
            )}
            {loading && (
              <div className="spinner" style={{ margin: "20px auto" }}></div>
            )}
            {response && <p className="response">{response}</p>}
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="card card-contact">
          <h3>תודה שפנית אליי! אחזור אלייך בהקדם.</h3>
          {project.email && (
            <p>
              <strong>אימייל:</strong>{' '}
              <a href={`mailto:${project.email}`}>{project.email}</a>
            </p>
          )}
          {project.phone && (
            <p>
              <strong>טלפון:</strong>{' '}
              <a href={`tel:${project.phone}`}>{project.phone}</a>
            </p>
          )}
          {project.github && (
            <p>
              <strong>גיט:</strong>{' '}
              <a href={project.github} target="_blank" rel="noopener noreferrer">
                {project.github}
              </a>
            </p>
          )}
        </div>
      );

    case 'projects':
    default:
      return (
        <div className="card card-projects">
          <h2>{project.name}</h2>
          <p>
            {(project.description || "")
              .split('\n')
              .map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
          </p>
          <p className="technologies">
            <strong>טכנלוגיות:</strong> {project.tech?.join(", ")}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="view-link"
          >
            View Project
          </a>
        </div>
      );
    case 'cv':
      return (
        <div className="card card-cv">
          <h2>קורות חיים</h2>
          <p>בחרו את הגרסה שתרצו להוריד:</p>
          <div className="cv-downloads">
            {/* <a href="/cv/talia-hebrew.pdf" download className="cv-btn">עברית PDF</a> */}
            <a href="/cv/talia-english.pdf" download className="cv-btn">קובץ PDF</a>
            {/* <a href="/cv/talia-hebrew.docx" download className="cv-btn">עברית WORD</a> */}
            <a href="/cv/talia-english.docx" download className="cv-btn">קובץ WORD</a>
            <a href="/cv/talia-english.pdf" target="_blank" rel="noopener noreferrer" className="cv-btn">
              צפייה אונליין
            </a>
          </div>
        </div>
      );
  }
};

export default Card;




// import React, { useState } from 'react';
// import '../css/Card.css';

// const Card = ({ project, variant }) => {
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [roleData, setRoleData] = useState('');
//   const [response, setResponse] = useState('');
//   if (!project && variant !== 'cv') return null;

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       // const response = await fetch('http://localhost:5202/api/ai/analyze-fit', {
//         const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ai/analyze-fit`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             jobDescription: roleData,
//             requirements: roleData
//           })
//         });

//         const data = await response.json();
//         if(response.ok) {
//           setResponse(data.result);
//     } else {
//       setResponse(`❌ Error: ${data.error}`);
//     }
//   } catch (error) {
//     setResponse('❌ Failed to connect to AI server');
//   }
// };

// // if (!project) return null;

// switch (variant) {
//   case 'about':
//     return (
//       <div className="card card-about">
//         <h2>{project.name}</h2>
//         <p><strong>תפקיד:</strong> {project.title}</p>
//         <p><strong>הפוקוס שלי:</strong> {project.focus}</p>
//         <p><strong>השכלה:</strong> {project.education}</p>
//         <p><strong>שפות וטכנולוגיות:</strong> {project.languages?.join(', ')}</p>
//         <p><strong>מיקום:</strong> {project.location}</p>
//         <p><strong>אודות:</strong> {project.about}</p>
//         {project.email && <p><strong>אימייל:</strong> {project.email}</p>}

//         <div className="about-personal">
//           <h3>קצת עליי</h3>
//           <p>
//             מאז שאני זוכרת את עצמי, אהבתי ליצור, לפתור בעיות ולגלות עולמות חדשים. עולם הפיתוח מאפשר לי לשלב יצירתיות, חשיבה לוגית והשפעה אמיתית על אנשים. אני מאמינה שכל פרויקט הוא הזדמנות לצמוח, ללמוד ולשמח אחרים – וזה מה שמניע אותי כל יום מחדש.
//           </p>
//         </div>

//         <div className="about-values">
//           <h4>הערכים שמובילים אותי:</h4>
//           <ul>
//             <li>🌟 אמינות ושקיפות</li>
//             <li>💡 יצירתיות וחדשנות</li>
//             <li>🤝 שירותיות ומקצועיות</li>
//             <li>🚀 למידה מתמדת</li>
//             <li>❤️ תשוקה אמיתית לעשייה</li>
//           </ul>
//         </div>

//         <div className="ai-section">
//           <button
//             className={`ai-toggle-btn${isFormVisible ? ' active' : ''}`}
//             onClick={() => setIsFormVisible(!isFormVisible)}
//             type="button"
//             style={isFormVisible ? { display: 'none' } : {}}
//           >
//             מה הבינה המלאכותית אומרת עליי?
//           </button>
//           {isFormVisible && (
//             <form className="ai-form" onSubmit={handleFormSubmit}>
//               <textarea
//                 className="ai-textarea"
//                 placeholder="תארו את סוג התפקיד או הדרישות הרצויות (למשל: אני צריכה מפתחת רצינית, אחראית ונחמדה כאחד)"
//                 value={roleData}
//                 onChange={(e) => setRoleData(e.target.value)}
//                 rows="4"
//               />
//               <div className="ai-form-actions">
//                 <button className="ai-submit-btn" type="submit">שליחה</button>
//                 <button
//                   className="close-btn"
//                   type="button"
//                   onClick={() => setIsFormVisible(false)}
//                 >
//                   ביטול
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>

//         {response && <p className="response">{response}</p>}
//       </div>
//     );

//   case 'contact':
//     return (
//       <div className="card card-contact">
//         <h3>תודה שפנית אליי! אחזור אלייך בהקדם.</h3>
//         {project.email && (
//           <p>
//             <strong>אימייל:</strong>{' '}
//             <a href={`mailto:${project.email}`}>{project.email}</a>
//           </p>
//         )}
//         {project.phone && (
//           <p>
//             <strong>טלפון:</strong>{' '}
//             <a href={`tel:${project.phone}`}>{project.phone}</a>
//           </p>
//         )}
//         {project.github && (
//           <p>
//             <strong>גיט:</strong>{' '}
//             <a href={project.github} target="_blank" rel="noopener noreferrer">
//               {project.github}
//             </a>
//           </p>
//         )}
//       </div>
//     );

//   case 'projects':
//   default:
//     return (
//       <div className="card card-projects">
//         <h2>{project.name}</h2>

//         <p>
//           {(project.description || "")
//             .split('\n')
//             .map((line, index) => (
//               <React.Fragment key={index}>
//                 {line}
//                 <br />
//               </React.Fragment>
//             ))}
//         </p>


//         <p className="technologies">
//           <strong>טכנלוגיות:</strong> {project.tech?.join(", ")}
//         </p>

//         <a
//           href={project.link}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="view-link"
//         >
//           View Project
//         </a>
//       </div>
//     );
//   case 'cv':
//     return (
//       <div className="card card-cv">
//         <h2>קורות חיים</h2>
//         <p>בחרו את הגרסה שתרצו להוריד:</p>
//         <div className="cv-downloads">
//           {/* <a href="/cv/talia-hebrew.pdf" download className="cv-btn">עברית PDF</a> */}
//           <a href="/cv/talia-english.pdf" download className="cv-btn">קובץ PDF</a>
//           {/* <a href="/cv/talia-hebrew.docx" download className="cv-btn">עברית WORD</a> */}
//           <a href="/cv/talia-english.docx" download className="cv-btn">קובץ WORD</a>
//           <a href="/cv/talia-english.pdf" target="_blank" rel="noopener noreferrer" className="cv-btn">
//             צפייה אונליין
//           </a>
//         </div>
//       </div>
//     );
// }
// };

// export default Card;