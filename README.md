# MeetTaliaAPI

מערכת API מודרנית מבוססת ASP.NET Core ומספקת מידע אישי, פרויקטים, יצירת קשר, ושירות AI מתקדם לניתוח התאמה למשרות.

---

## תכנים עיקריים

- **/about** – מחזיר מידע אישי בפורמט JSON.
- **/projects** – מחזיר רשימת פרויקטים.
- **/contact** – מחזיר פרטי יצירת קשר.
- **/api/ai/analyze-fit** – שירות POST מתקדם: שולח תיאור משרה ודרישות, ומקבל ניתוח התאמה של טליה כהן בעזרת OpenAI (GPT).

---

## טכנולוגיות

- ASP.NET Core 8
- C#
- REST API
- OpenAI API (GPT-3.5-turbo)
- JSON

---

## התקנה והרצה

1. **שכפול הפרויקט:**
   ```bash
   git clone https://github.com/your-username/MeetTaliaAPI.git
   cd MeetTaliaAPI
   ```

2. **הגדרת מפתחות:**
   - יש להוסיף קובץ `appsettings.json` בתיקיית `server` עם המפתח של OpenAI:
     ```json
     {
       "OpenAI": {
         "ApiKey": "YOUR_OPENAI_API_KEY"
       }
     }
     ```

3. **הוספת קבצי מידע:**
   - יש לוודא שבתיקיית `Data` קיימים הקבצים:
     - `about.json`
     - `projects.json`
     - `contact.json`

4. **הרצת השרת:**
   ```bash
   dotnet run --project server
   ```

---

## מבנה הפרויקט

```
server/
│
├── Controllers/
│   └── AllControllers.cs
├── Data/
│   ├── about.json
│   ├── projects.json
│   └── contact.json
├── appsettings.json
└── ...
```
