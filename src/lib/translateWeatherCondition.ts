const translateWeatherCondition = (conditionText: string): string => {
    const conditions: { [key: string]: string } = 
        { 
            "Sunny": "Cerah", 
            "Clear": "Cerah", 
            "Partly Cloudy": "Cerah Berawan", 
            "Cloudy": "Berawan", "Overcast": 
            "Mendung", "Mist": "Berkabut", 
            "Patchy Rain Possible": "Kemungkinan Hujan Lokal",
            "Patchy Rain Nearby": "Hujan Lokal",
            "Patchy Snow Possible": "Kemungkinan Salju Lokal", 
            "Patchy Sleet Possible": "Kemungkinan Hujan Es Lokal", 
            "Patchy Freezing Drizzle Possible": "Kemungkinan Gerimis Beku Lokal", 
            "Thundery Outbreaks Possible": "Kemungkinan Badai Petir", 
            "Blowing Snow": "Badai Salju", 
            "Blizzard": "Badai Salju", 
            "Fog": "Kabut", 
            "Freezing Fog": "Kabut Beku", 
            "Patchy Light Drizzle": "Gerimis Ringan", 
            "Light Drizzle": "Gerimis Ringan", 
            "Freezing Drizzle": "Gerimis Beku", 
            "Heavy Freezing Drizzle": "Gerimis Beku Tebal", 
            "Patchy Light Rain": "Hujan Ringan Lokal", 
            "Light Rain": "Hujan Ringan", 
            "Moderate Rain At Times": "Terkadang Hujan Sedang", 
            "Moderate Rain": "Hujan Sedang", 
            "Heavy Rain At Times": 
            "Terkadang Hujan Lebat", "Heavy Rain": "Hujan Lebat", "Light Freezing Rain": "Hujan Beku Ringan", "Moderate Or Heavy Freezing Rain": "Hujan Beku Sedang atau Lebat", "Light Sleet": "Hujan Es Ringan", "Moderate Or Heavy Sleet": "Hujan Es Sedang atau Lebat", "Patchy Light Snow": "Salju Ringan Lokal", "Light Snow": "Salju Ringan", "Patchy Moderate Snow": "Salju Sedang Lokal", "Moderate Snow": "Salju Sedang", "Patchy Heavy Snow": "Salju Lebat Lokal", "Heavy Snow": "Salju Lebat", "Ice Pellets": "Butiran Es", "Light Rain Shower": "Hujan Deras Ringan", "Moderate Or Heavy Rain Shower": "Hujan Deras Sedang atau Lebat", "Torrential Rain Shower": "Hujan Deras Sangat Lebat", "Light Sleet Showers": "Hujan Es Ringan", "Moderate Or Heavy Sleet Showers": "Hujan Es Sedang atau Lebat", "Light Snow Showers": "Hujan Salju Ringan", "Moderate Or Heavy Snow Showers": "Hujan Salju Sedang atau Lebat", "Light Showers Of Ice Pellets": "Hujan Butiran Es Ringan", "Moderate Or Heavy Showers Of Ice Pellets": "Hujan Butiran Es Sedang atau Lebat", "Patchy Light Rain With Thunder": "Hujan Ringan Lokal dengan Petir", "Moderate Or Heavy Rain With Thunder": "Hujan Sedang atau Lebat dengan Petir", "Patchy Light Snow With Thunder": "Salju Ringan Lokal dengan Petir", "Moderate Or Heavy Snow With Thunder": "Salju Sedang atau Lebat dengan Petir", };
    const foundKey = Object.keys(conditions).find(key => key.toLowerCase() === conditionText.toLowerCase());
    return foundKey ? conditions[foundKey] : conditionText;
};

export default translateWeatherCondition