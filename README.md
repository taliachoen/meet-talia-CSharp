# Meet Talia – AI-Powered Developer Portfolio

An interactive portfolio site that presents my projects and CV, and includes an **AI job-fit analyzer**: a recruiter picks or pastes a job description, and the backend uses the OpenAI API to assess how well my experience matches the role.

**Live demo:** https://meet-talia-client.onrender.com/
*(hosted on a free tier – the first load may take a few seconds)*

**Tech:** React · ASP.NET Core (C#) · OpenAI API · REST · Docker · Render

<!-- Add screenshots here, e.g.: ![Home page](docs/home.png) -->

## Features

- **AI job-fit analysis** – an ASP.NET Core endpoint sends the job description and my profile to the OpenAI API and returns a written fit assessment
- **Project cards** with descriptions, tech stack, links and an image gallery modal (React Portals)
- **CV section** with downloadable Hebrew and English versions
- **Responsive design** for mobile, tablet and desktop

## Architecture

```
client/   React app (components, data files, gallery modal)
server/   ASP.NET Core Web API
  ├── Controllers/   REST endpoints (projects, AI analysis)
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
