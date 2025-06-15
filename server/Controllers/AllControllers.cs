using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace MeetTaliaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var json = System.IO.File.ReadAllText("Data/projects.json");
            var data = JsonDocument.Parse(json);
            return Ok(data);
        }
    }

    [ApiController]
    [Route("api/ai")]
    public class AiAssistantController : ControllerBase
    {
        private readonly IConfiguration _config;
        private string? _cvCache;

        public AiAssistantController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("analyze-fit")]
        public async Task<IActionResult> AnalyzeFit([FromBody] JobRequest request)
        {
            if (
                string.IsNullOrEmpty(request.JobDescription)
                || string.IsNullOrEmpty(request.Requirements)
            )
                return Ok(
                    new { result = "לא התקבלה שאלה על משרה. אשמח לעזור בכל שאלה מקצועית או טכנית!" }
                );
            if (_cvCache == null)
            {
                var cvPath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "CV",
                    "talia-english.txt"
                );
                _cvCache = System.IO.File.Exists(cvPath) ? System.IO.File.ReadAllText(cvPath) : "";
            }
            string cvText = _cvCache ?? "לא נמצאו קורות חיים";
            string prompt = $"""
התיאור הבא הוא מה שמחפשים במועמדת:
"{request.JobDescription}"

להלן מידע מלא על טליה כהן:
• מפתחת פולסטאק מוכשרת ובעלת מוטיבציה גבוהה, עם ניסיון מעשי בפיתוח מערכות ופרויקטים מורכבים.
• ניסיון בבניית אפליקציות צד לקוח וצד שרת כולל REST APIs, לוגיקת שרת, ואבטחה.
• סיימה בהצלחה בוטקאמפ Full Stack מטעם מכון לב ואקדמיה Elevation.
• לימודים אקדמיים בהנדסת תוכנה + לימודי הוראה בתכנות מהמכללה האקדמית להנדסה בישראל.
• ניסיון בפרויקטים כגון מערכת ניהול תורים, מערכת לניהול משימות, מערכת סחר במניות בזמן אמת, ואפליקציית מסחר.
• הובילה חניכים בתנועת נוער תוך פיתוח כישורי תקשורת, אחריות ועבודת צוות.

קורות החיים המלאים של טליה כהן:
{cvText}

בהתבסס על כל המידע למעלה, כתוב ניתוח קצר (עד 3 משפטים) **בעברית**, **בסגנון ידידותי וענייני**, שמסביר **למה טליה מתאימה** למה שמחפשים בתיאור.

שימו לב:
- אל תחזרו על מילות התיאור מילה במילה.
- הדגישו את היתרונות והחוזקות האישיות של טליה בהקשר של מה שמחפשים.
- אין צורך להתייחס ישירות לדרישות משרה ספציפיות – זהו תיאור כללי.
-אל תכתוב שום מילה באנגלית
- אל תזכירו שמות של טכנולוגיות.
- התמקדו בכישורים ובתכונות הבאות:
  • רצון עז ללמוד ולהתפתח – תתן את כולה בשביל זה  
  • חשיבה יצירתית ויכולת עבודה בצוות  
  • אהבה לאתגרים טכנולוגיים ונכונות ללמוד דברים חדשים  
  • יחסי אנוש מעולים, אחריות גבוהה ורצון להשפיע

המטרה: ניסוח משכנע שמראה שטליה מביאה ערך אמיתי לצוות ולמקום עבודה.

""";

            var apiKey = _config["OpenAI:ApiKey"];
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[] { new { role = "user", content = prompt } },
            };

            var response = await client.PostAsJsonAsync(
                "https://api.openai.com/v1/chat/completions",
                requestBody
            );
            var result = await response.Content.ReadFromJsonAsync<JsonElement>();

            if (!result.TryGetProperty("choices", out var choices) || choices.GetArrayLength() == 0)
            {
                if (result.TryGetProperty("error", out var error))
                    return StatusCode(
                        500,
                        new { error = error.GetProperty("message").GetString() }
                    );

                return StatusCode(500, new { error = "שגיאה בתשובת OpenAI" });
            }

            var content = choices[0].GetProperty("message").GetProperty("content").GetString();
            return Ok(new { result = content });
        }

        public class JobRequest
        {
            public string? JobDescription { get; set; }
            public string? Requirements { get; set; }
        }
    }
}
