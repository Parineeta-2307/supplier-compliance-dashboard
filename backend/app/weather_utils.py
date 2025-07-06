# weather_utils.py
import requests
import datetime

def get_weather_for_delivery(lat, lon, delivery_date, api_key):
    """
    Fetch historical weather data for a given location and date using OpenWeatherMap API.
    """
    # Convert delivery_date to UNIX timestamp
    dt = int(datetime.datetime.strptime(delivery_date, "%Y-%m-%d").timestamp())
    url = (
        f"https://api.openweathermap.org/data/2.5/onecall/timemachine"
        f"?lat={lat}&lon={lon}&dt={dt}&appid={api_key}"
    )
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def analyze_weather_impact(weather_data):
    """
    Analyze weather data to determine if adverse conditions (rain, snow) were present.
    """
    if not weather_data or "current" not in weather_data:
        return False, "No weather data available."

    weather = weather_data["current"].get("weather", [])
    for w in weather:
        if any(cond in w["main"].lower() for cond in ["rain", "snow", "storm"]):
            return True, w["main"]
    return False, "No adverse weather detected."
