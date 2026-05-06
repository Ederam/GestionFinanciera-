FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Gestion.sln", "./"]
COPY ["Gestion.API/Gestion.API.csproj", "Gestion.API/"]
COPY ["Gestion.Application/Gestion.Application.csproj", "Gestion.Application/"]
COPY ["Gestion.Application.UnitTests/Gestion.Application.UnitTests.csproj", "Gestion.Application.UnitTests/"]
COPY ["Gestion.Domain/Gestion.Domain.csproj", "Gestion.Domain/"]
COPY ["Gestion.Infrastructure/Gestion.Infrastructure.csproj", "Gestion.Infrastructure/"]

RUN dotnet restore "Gestion.API/Gestion.API.csproj"

COPY . .
WORKDIR "/src/Gestion.API"
RUN dotnet publish "Gestion.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENV ASPNETCORE_HTTP_PORTS=8080
ENTRYPOINT ["dotnet", "Gestion.API.dll"]
