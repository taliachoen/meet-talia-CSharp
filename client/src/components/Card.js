import React, { useState } from 'react';
import '../css/Card.css';
import { createPortal } from "react-dom";

const Card = ({ project, variant }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [roleData, setRoleData] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const aiOptions = [
    "אני מחפשת מפתחת שבתחילת דרכה אבל שרוצה ללמוד ולהתפתח בתחום ותתן את כולה בשביל זה",
    "אני מחפשת מפתחת שמביאה איתה חשיבה יצירתית ויכולת עבודה בצוות",
    "אני מחפשת מפתחת שאוהבת אתגרים טכנולוגיים ולא מפחדת ללמוד דברים חדשים",
    "אני מחפשת מפתחת עם יחסי אנוש מעולים, אחריות ורצון להשפיע"
  ];

  if (!project && variant !== 'cv') return null;


  const handleOptionClick = async (optionText) => {
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/ai/analyze-fit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: optionText,
          requirements: optionText
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
              מאז שאני זוכרת את עצמי, אהבתי ליצור, לפתור בעיות ולגלות עולמות חדשים. עולם הפיתוח מאפשר לי לשלב יצירתיות, חשיבה לוגית והשפעה אמיתית על אנשים. אני מאמינה שכל פרויקט הוא הזדמנות לצמוח וללמוד  – וזה מה שמניע אותי כל יום מחדש.
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
              onClick={() => setIsFormVisible(true)}
              type="button"
              style={isFormVisible ? { display: 'none' } : {}}
            >
              מה הבינה המלאכותית אומרת עליי?
            </button>
            {isFormVisible && createPortal(
              <div className="modal-overlay" onClick={() => setIsFormVisible(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <button className="close-btn" onClick={() => setIsFormVisible(false)}>✖</button>
                  <h3 style={{ textAlign: "center", marginTop: "65px" }}>? אומר עלי CHATGPT מה</h3>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "24px 0"
                  }}>
                    <img src="/images/AI/1.png" alt="AI תיאור 1" style={{ maxWidth: "650px", width: "100vw", borderRadius: "18px" }} />
                    <img src="/images/AI/2.png" alt="AI תיאור 2" style={{ maxWidth: "650px", width: "100vw", borderRadius: "18px" }} />
                  </div>
                  <h4 className="ai-invite">
                    🤔 בואו תישאלו את הבינה המלאכותית בעצמכם
                  </h4>
                  <form className="ai-form" onSubmit={e => e.preventDefault()}>
                    <div className="ai-options">
                      {aiOptions.map((option, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className="ai-option-btn"
                          disabled={loading}
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    {loading && (
                      <div className="spinner" style={{ margin: "20px auto" }}></div>
                    )}

                  {response && <p className="response">{response}</p>}
                    <p className="ai-warning">
                      😊  כל מתכנת יודע: אף פעם לא סומכים על הבינה מלאכותית בעיניים עצומות
                    </p>
                  </form>
                  <div className="ai-form-actions">
                    <button
                      className="ai-cancel-btn"
                      type="button"
                      onClick={() => setIsFormVisible(false)}
                      disabled={loading}
                    >
                      סגור
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
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

          <p></p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="view-link"
          >
            הצגת הפרויקט
          </a>
          {(project.screenshots?.length > 0) && (
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setShowGallery(true)}
              className="view-link"
            >
              הצצה לפרויקט
            </button>
          )}

          {showGallery && createPortal(
            <div className="modal-overlay" onClick={() => setShowGallery(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={() => setShowGallery(false)}>✖</button>
                <h3> {project.name} גלריית פרויקט</h3>
                {/* תמונות */}
                {project.screenshots && project.screenshots.length > 0 && (
                  <div className="project-gallery">
                    {project.screenshots.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={project.name + ' screenshot ' + (i + 1)}
                        style={{ maxWidth: "100%", marginBottom: "8px", borderRadius: "8px" }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>,
            document.body
          )}

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





//  <div className="ai-section">
//             <button
//               className={`ai-toggle-btn${isFormVisible ? ' active' : ''}`}
//               onClick={() => setIsFormVisible(!isFormVisible)}
//               type="button"
//               style={isFormVisible ? { display: 'none' } : {}}
//             >
//               מה הבינה המלאכותית אומרת עליי?
//             </button>
//             {isFormVisible && (
//               <form className="ai-form" onSubmit={handleFormSubmit}>
//                 <p className="ai-warning">
//                   שימו לב, אמנם 0הבינה המלאכותית חכמה  🤖<br />
//                   אבל כל מתכנת יודע: אף פעם לא סומכים עליה בעיניים עצומות! 😊<br />
//                   קחו את זה לתשומת ליבכם – ותהנו לפחות מהרעיון 😉
//                 </p>
//                 <textarea
//                   className="ai-textarea"
//                   placeholder="תארו את סוג התפקיד או הדרישות הרצויות (למשל: אני צריכה מפתחת רצינית, אחראית ונחמדה כאחד)"
//                   value={roleData}
//                   onChange={(e) => setRoleData(e.target.value)}
//                   rows="4"
//                   disabled={loading}
//                 />
//                 <div className="ai-form-actions">
//                   <button className="ai-submit-btn" type="submit" disabled={loading}>
//                     שליחה
//                   </button>
//                   <button
//                     className="close-btn"
//                     type="button"
//                     onClick={() => setIsFormVisible(false)}
//                     disabled={loading}
//                   >
//                     ביטול
//                   </button>
//                 </div>
//               </form>
//             )}
//             {loading && (
//               <div className="spinner" style={{ margin: "20px auto" }}></div>
//             )}
//             {response && <p className="response">{response}</p>}
//           </div>