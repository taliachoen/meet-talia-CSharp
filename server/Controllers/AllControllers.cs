// פרויקט ASP.NET Core שיחליף את Node.js
// שלב ראשון: תוכן הקבצים בתיקיית Controllers

using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace MeetTaliaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AboutController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var json = System.IO.File.ReadAllText("./Data/about.json");
            var data = JsonDocument.Parse(json);
            return Ok(data);
        }
    }




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
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var json = System.IO.File.ReadAllText("Data/contact.json");
            var data = JsonDocument.Parse(json);
            return Ok(data);
        }
    }






    [ApiController]
    [Route("api/ai")]
    public class AiAssistantController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AiAssistantController(IConfiguration config)
        {
            _config = config;
        }

         private readonly ILogger<AiController> _logger;

    public AiController(ILogger<AiController> logger)
    {
        _logger = logger;
    }

        [HttpPost("analyze-fit")]
        public async Task<IActionResult> AnalyzeFit([FromBody] JobRequest request)
        {
            if (string.IsNullOrEmpty(request.JobDescription) || string.IsNullOrEmpty(request.Requirements))
                return BadRequest(new { error = "Missing job description or requirements" });

            string prompt = $"""
 את מגייסת לתפקיד חדש, וזה מה שכתבת על המשרה:
 תיאור התפקיד: {request.JobDescription}
 דרישות: {request.Requirements} 

 האם טליה כהן מתאימה? 

 מידע על טליה כהן:
 • מפתחת פול סטאק מוכשרת ובעלת מוטיבציה גבוהה, עם ניסיון מעשי בפיתוח מערכות ופרויקטים מורכבים.
 • טכנולוגיות: React, Node.js, JavaScript, TypeScript, C#, Express, MongoDB, MySQL, Next.js.
 • ניסיון בבניית אפליקציות צד לקוח וצד שרת כולל REST APIs, לוגיקת שרת, ואבטחה.
 • סיימה בהצלחה בוטקאמפ Full Stack מטעם מכון לב ואקדמיה Elevation.
 • לימודים אקדמיים בהנדסת תוכנה + לימודי הוראה בתכנות מהמכללה האקדמית להנדסה בישראל.
 • ניסיון בפרויקטים כגון מערכת ניהול תורים, מערכת לניהול משימות, מערכת סחר במניות בזמן אמת, ואפליקציית מסחר.
 • הובילה חניכים בתנועת נוער תוך פיתוח כישורי תקשורת, אחריות ועבודת צוות.

 כתבי בעברית, בצורה מקצועית, ברורה ומשכנעת, למה טליה מתאימה בדיוק למה שהמגייסת מחפשת – בהתאם לתיאור ודרישות המשרה שהיא כתבה למעלה.
 """;

            var apiKey = _config["OpenAI:ApiKey"];
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = prompt }
                }
            };

            var response = await client.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", requestBody);
            var result = await response.Content.ReadFromJsonAsync<JsonElement>();
            var content = result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();

            return Ok(new { result = content });
        }

        public class JobRequest
        {
            public string JobDescription { get; set; }
            public string Requirements { get; set; }
        }
    }
}
