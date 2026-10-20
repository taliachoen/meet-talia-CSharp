# Meet Talia – AI-Powered Developer Portfolio

An interactive portfolio site that presents my projects and CV, and includes an **"Ask the AI about me"** feature: a recruiter picks what they are looking for in a developer, and the backend uses the OpenAI API, together with my CV, to write a short personalized summary of how I fit.

**Live demo:** https://meet-talia-client.onrender.com/
*(hosted on a free tier – the first load may take a few seconds)*

**Tech:** React · ASP.NET Core (C#) · OpenAI API · REST · Docker · Render

<!-- Add screenshots here, e.g.: ![Home page](docs/home.png) -->

## Features

- **"Ask the AI about me"** – visitors choose one of several "I'm looking for a developer who..." prompts; an ASP.NET Core endpoint combines it with my CV into a prompt for the OpenAI API and returns a short summary in Hebrew
- **Project cards** with descriptions, tech stack, links and an image gallery modal (React Portals)
- **CV section** with downloadable Hebrew and English versions
- **Responsive design** for mobile, tablet and desktop

## Architecture

```
client/   React app (components, data files, gallery modal)
server/   ASP.NET Core Web API
  ├── Controllers/   REST endpoints (projects, AI summary)
  ├── Data/          Project data (JSON)
  └── Dockerfile     Container build for deployment
```

## Getting Started

### Prerequisites
- Node.js 18+
- .NET 9 SDK
- An OpenAI API key

### Server
```bash
cd server
dotnet restore
export OpenAI__ApiKey="<your-key>"   # or add "OpenAI": { "ApiKey": "..." } to appsettings.json (never commit it)
dotnet run
```

### Client
```bash
cd client
npm install
npm start
```

Set `REACT_APP_API_BASE_URL` in `client/.env` to the server URL.

## Author

**Talia Cohen** – Full Stack Developer
[GitHub](https://github.com/taliachoen) · taliachoen1@gmail.com
