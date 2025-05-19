🟣 MeetTaliaAPI – פרויקט צד שרת ב-ASP.NET Core

# Meet Talia – אתר תדמית מודרני
שרת API אישי המבוסס על ASP.NET Core 8, המספק מידע אישי, פרויקטים, יצירת קשר, ושירות AI לניתוח התאמה למשרות.

## 🚀 תכונות עיקריות
- /about – מחזיר מידע אישי בפורמט JSON
- /projects – מחזיר רשימת פרויקטים
- /contact – פרטי יצירת קשר
- /api/ai/analyze-fit – שירות POST לניתוח התאמה על בסיס GPT

## 🛠️ טכנולוגיות
- ASP.NET Core 8
- C#
- REST API
- JSON
- OpenAI GPT-3.5 API

## 📁 מבנה הפרויקט
MeetTaliaAPI/
├── Controllers/
├── Data/
│   ├── about.json
│   ├── projects.json
│   └── contact.json
├── appsettings.json
├── Program.cs

## ⚙️ התקנה והרצה
### שלב 1: שכפול הפרויקט
git clone https://github.com/your-username/MeetTaliaAPI.git
cd MeetTaliaAPI

### שלב 2: הגדרת OpenAI API Key
יצירת appsettings.json:
{
  "OpenAI": {
    "ApiKey": "YOUR_OPENAI_API_KEY"
  }
}

### שלב 3: הרצת השרת
dotnet run --project server


## 🎨 עיצוב
- צבעים: כחול, תכלת, לבן, אפור בהיר
- פונט: Heebo / Segoe UI
- כפתורים עגולים ואפקטים עדינים

## 🤖 בינה מלאכותית
- טופס ניתוח התאמה למשרה בעזרת GPT באמצעות API

© 2025 – טליה כהן

