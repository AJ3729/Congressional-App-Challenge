<h1 align="center">🌿 CanopyNYC: Mapping the Lungs of Our City</h1>

<p align="center">
  <b>A data-driven environmental dashboard visualizing tree canopy, air quality, and heat across New York City.</b><br>
  <i>Congressional App Challenge 2025 — NY-12 District Submission</i>
</p>

<hr>

<h2>📘 Overview</h2>

<p><b>CanopyNYC</b> empowers New Yorkers to explore how environmental factors vary across neighborhoods — from tree coverage and air quality to surface temperature.
Using real open data from the <a href="https://data.cityofnewyork.us/">NYC Open Data portal</a>, the <a href="https://www.airnowapi.org/">EPA AirNow API</a>, and NASA’s POWER climate dataset, the app visualizes the intersection of nature and health in our urban landscape.</p>

<blockquote>🧩 <b>Goal:</b> Make environmental inequities visible and actionable through interactive, real-time data visualization.</blockquote>

<hr>

<h2>🌳 Core Features</h2>

<table>
<tr><th>Feature</th><th>Description</th><th>Data Source</th></tr>
<tr><td><b>Tree Canopy Map</b></td><td>Choropleth map showing % tree cover by neighborhood</td><td>NYC Tree Canopy Coverage Dataset</td></tr>
<tr><td><b>Air Quality Index (AQI)</b></td><td>Real-time AQI overlay with pollutant breakdown</td><td>EPA AirNow API / NYC DOHMH Air Quality Data</td></tr>
<tr><td><b>Heat Island Layer</b></td><td>Surface temperature visualization using satellite data</td><td>NASA POWER API / Landsat 8</td></tr>
<tr><td><b>Neighborhood Scorecard</b></td><td>Combined “Environmental Health Score” per ZIP or NTA</td><td>Computed from all sources</td></tr>
<tr><td><b>Compare Mode</b></td><td>Side-by-side charts for two neighborhoods</td><td>Flask + Chart.js</td></tr>
<tr><td><b>(Optional)</b> User Reports</td><td>Submit missing trees, poor air areas, or heat hotspots</td><td>SQLite crowdsourced table</td></tr>
</table>

<hr>

<h2>🧠 Technical Architecture</h2>

<pre>
root/
│
├── data/
│   ├── canopy_data.csv              # Tree canopy % by NTA
│   ├── air_quality.csv              # NYCCAS PM2.5 & NO2 data
│   ├── nasa_temp.csv                # NASA POWER temperature output
│   └── merged.geojson               # Final merged dataset for map rendering
│
├── scripts/
│   ├── get_canopy.py                # Downloads and cleans NYC canopy data
│   ├── get_airquality.py            # Pulls EPA/NYCCAS data
│   ├── get_temperature.py           # Queries NASA POWER API
│   └── merge_geo.py                 # Combines all sources into GeoJSON
│
├── app/
│   ├── templates/
│   │   ├── index.html               # Main map interface
│   │   ├── compare.html             # Comparison dashboard
│   │   └── about.html               # Info + data explanation
│   ├── static/
│   │   ├── css/                     # Custom styles
│   │   ├── js/                      # Leaflet, Chart.js scripts
│   │   └── images/                  # Map icons & logos
│   ├── app.py                       # Flask backend
│   ├── models.py                    # Optional crowdsourced data model
│   └── database.db                  # SQLite (optional)
│
└── README.md
</pre>

<hr>

<h2>⚙️ Tech Stack</h2>

<table>
<tr><th>Layer</th><th>Tools & Libraries</th></tr>
<tr><td><b>Backend</b></td><td>Python 3.12, Flask, Pandas, GeoPandas</td></tr>
<tr><td><b>Frontend</b></td><td>HTML5, CSS3, JavaScript, Leaflet.js, Chart.js</td></tr>
<tr><td><b>Data APIs</b></td><td>NYC Open Data, EPA AirNow, NASA POWER</td></tr>
<tr><td><b>Visualization</b></td><td>Leaflet choropleth + Chart.js bar/line charts</td></tr>
<tr><td><b>Database (optional)</b></td><td>SQLite (for user submissions)</td></tr>
<tr><td><b>Hosting</b></td><td>Render / Replit / GitHub Pages + Flask backend</td></tr>
</table>

<hr>

<h2>📡 Data Sources</h2>

<table>
<tr><th>Dataset</th><th>URL</th><th>Resolution</th></tr>
<tr><td><b>2015 NYC Street Tree Census</b></td><td><a href="https://data.cityofnewyork.us/Environment/2015-Street-Tree-Census">data.cityofnewyork.us</a></td><td>Point-level (per tree)</td></tr>
<tr><td><b>Tree Canopy Coverage (NTA)</b></td><td><a href="https://data.cityofnewyork.us/Environment/Tree-Canopy-Coverage">data.cityofnewyork.us</a></td><td>Polygon (neighborhood)</td></tr>
<tr><td><b>NYC Air Quality (NYCCAS)</b></td><td><a href="https://data.cityofnewyork.us/Environment/Air-Quality-Annual-Map">data.cityofnewyork.us</a></td><td>~100m grid</td></tr>
<tr><td><b>EPA AirNow API</b></td><td><a href="https://www.airnowapi.org/">airnowapi.org</a></td><td>Live station data</td></tr>
<tr><td><b>NASA POWER API</b></td><td><a href="https://power.larc.nasa.gov/">power.larc.nasa.gov</a></td><td>Surface temp, humidity</td></tr>
<tr><td><b>US Census ACS</b></td><td><a href="https://data.census.gov/">data.census.gov</a></td><td>Demographic overlays</td></tr>
</table>

<hr>

<h2>🧮 Data Flow</h2>

<pre>
NYC Open Data APIs
        │
        ▼
Python scripts: get_canopy, get_airquality, get_temperature
        │
        ▼
Pandas merge + GeoPandas spatial join
        │
        ▼
merged.geojson → Flask backend → Leaflet.js map + Chart.js visualizations
</pre>

<hr>

<h2>🧭 Installation</h2>

<pre>
# 1. Clone the repository
git clone https://github.com/yourusername/CanopyNYC.git
cd CanopyNYC

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run local Flask server
python app/app.py

# 4. Open in browser
http://localhost:5000
</pre>

<hr>

<h2>🎯 MVP Goals</h2>

<ul>
  <li>✅ Interactive map of NYC with canopy % and AQI overlay</li>
  <li>✅ Environmental scorecard per neighborhood</li>
  <li>✅ Comparison dashboard between any two ZIP codes</li>
  <li>✅ Real-time AQI widget (EPA AirNow)</li>
  <li>✅ Responsive, mobile-friendly UI</li>
</ul>

<hr>

<h2>🚀 Future Expansion</h2>

<ul>
  <li>🌱 <b>Tree Equity Index:</b> Compare canopy % vs median income</li>
  <li>🌳 <b>Citizen Tree Reports:</b> Upload photos or report missing trees</li>
  <li>☀️ <b>Heat Island Forecast:</b> Predict hottest blocks using regression model</li>
  <li>📱 <b>Progressive Web App:</b> Installable offline version</li>
  <li>🧩 <b>Gamification:</b> “Adopt a Tree” badges and streaks</li>
</ul>

<hr>

<h2>💡 Example Queries</h2>

<pre>
# Retrieve canopy coverage for Upper East Side
from scripts.get_canopy import get_canopy_data
df = get_canopy_data()
print(df[df['NTAName'].str.contains('Upper East')])

# Fetch real-time AQI from AirNow API
from scripts.get_airquality import get_air_quality
aq_data = get_air_quality(lat=40.7736, lon=-73.9566)
print(aq_data)
</pre>

<hr>

<h2>👥 Team & Credits</h2>

<ul>
  <li><b>Lead Developer:</b> Your Name</li>
  <li><b>District:</b> NY-12 (Manhattan)</li>
  <li><b>Languages:</b> Python, HTML, CSS, JavaScript</li>
  <li><b>Built For:</b> <a href="https://www.congressionalappchallenge.us">Congressional App Challenge 2025</a></li>
</ul>

<p align="center">🌎 <i>"The greener the city, the stronger its lungs."</i></p>
