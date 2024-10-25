Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates
Objective
Develop a real-time data processing system to monitor weather conditions and provide summarized 
insights using rollups and aggregates. The system utilizes data from the OpenWeatherMap API.

Codebase
GitHub Repository: https://github.com/kri-premlata/WeatherMonitoringApp


Build Instructions
npx create-react-app weather-monitoring-app
CHOOSE:-React, vite, javascript 
cd weather-monitoring-app
npm install axios chart.js react-chartjs-2 react-router-dom
npm run dev
npm install -g serve
serve -s buildn

bash
Copy code
git clone https://github.com/kri-premlata/WeatherMonitoringApp
cd WeatherMonitoringApp


2. Install Dependencies
npm install axios chart.js react-chartjs-2 react-router-dom


3. Set Up Environment Variables
Create a .env file in the root directory of the project and added OpenWeatherMap API key:
WEATHER_APP_API_KEY=YOUR_VITE_OPENWEATHERMAP_API_KEY


4. Start the Development Server
To start the application in development mode, use the following command:
npm run dev
Tools & Technologies
Frontend Framework: React
Styling: Tailwind CSS
State Management: React Router
Data Fetching: Axios
Data Visualization: Chart.js and React-Chartjs-2
API Integration: OpenWeatherMap API

Commands
The following commands are available to manage the application:
Start Development Server: npm run dev - Starts the development server.
Build for Production: npm run build - Builds the app for production to the build folder.
Run Tests: npm run test - Runs the test suite.
Eject Configuration: npm run eject - Ejects the configuration for advanced customization.


Dependencies
The following dependencies are required for this application:
json
Dependencies REQUIRED:-
"dependencies": {
    "axios": "^1.7.7",
    "chart.js": "^4.4.5",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.27.0"
}
Conclusion
This real-time data processing system serves as a robust solution for monitoring weather conditions,
 with capabilities for data visualization, alerting, and rollups. Please refer to the documentation
  for further details on the implementation and usage.