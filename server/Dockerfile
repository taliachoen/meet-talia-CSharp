# שלב 1: שלב בנייה (Build stage)
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# העתק קבצי csproj והורד תלויות (restore)
COPY *.csproj ./
RUN dotnet restore

# העתק את שאר הקוד ובנה את הפרויקט במצב Release
COPY . ./
RUN dotnet publish -c Release -o out

# שלב 2: שלב הריצה (Runtime stage)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# העתק את התוצר מהשלב הקודם
COPY --from=build /app/out ./

# חשוף פורט (התאם ל־Render)
EXPOSE 5000

# הרצת האפליקציה
ENTRYPOINT ["dotnet", "MeetTalia.dll"]
