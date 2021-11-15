function cleanDataArray(array, countryOrWorld) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = {};
    newArray[i].country = countryOrWorld;
    newArray[i].position = i + 1;
    newArray[i].name = array[i].name;
  }
  return newArray;
}

function correctCountryName(country) {
  switch (country) {
    case "United States of America":
      return "United States";
    case "Russia":
      return "Russian Federation";
    case "Syria":
      return "Syrian Arab Republic";
    case "Libya":
      return "Libyan Arab Jamahiriya";
    case "W. Sahara":
      return "Western Sahara";
    case "Eq. Guinea":
      return "Equatorial Guinea";
    case "Tanzania":
      return "Tanzania, United Republic of";
    case "Central African Rep.":
      return "Central African Republic";
    case "Czechia":
      return "Czech Republic";
    case "Bosnia and Herz.":
      return "Bosnia and Herzegovina";
    case "Dominican Rep.":
      return "Dominican Republic";
    case "Somaliland":
      return "Somalia";
    case "Vietnam":
      return "Viet Nam";
    case "Laos":
      return "Lao People's Democratic Republic";
    case "South Korea":
      return "Korea, Republic of";
    default:
      return country;
  }
  // Cant find the right name for Kosovo, North Korea, Dem. Rep. Congo and Iran
}

// USING THE LAST.FM API
// Fetches the most popular songs of a country
export function getPopularTracksCountry(country) {
  country = correctCountryName(country);
  return axios
    .request(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&limit=50&api_key=424df88f98fb9a993131121f6457c381&format=json`
    )
    .then(function (response) {
      return cleanDataArray(response.data.tracks.track, country);
    })
    .catch(function (error) {
      console.error(error);
      return [];
    });
}

// Fetches the most popular artists of a country
export function getPopularArtistsCountry(country) {
  country = correctCountryName(country);
  return axios
    .request(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&limit=50&api_key=424df88f98fb9a993131121f6457c381&format=json`
    )
    .then(function (response) {
      return cleanDataArray(response.data.topartists.artist, country);
    })
    .catch(function (error) {
      console.error(error);
      return [];
    });
}

// Fetches the most popular songs of the world
export function getPopularTracksWorld() {
  return axios
    .request(
      `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&limit=1000&api_key=424df88f98fb9a993131121f6457c381&format=json`
    )
    .then(function (response) {
      let tracks = response.data.tracks.track;
      // sorts the songs on the amount of listeners
      tracks.sort((a, b) => {
        return b.listeners - a.listeners;
      });
      return cleanDataArray(tracks.slice(0, 50), "world");
    })
    .catch(function (error) {
      console.error(error);
      return [];
    });
}

// Fetches the most popular artists of the world
export function getPopularArtistsWorld() {
  return axios
    .request(
      `http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&limit=1000&api_key=424df88f98fb9a993131121f6457c381&format=json`
    )
    .then(function (response) {
      let artists = response.data.artists.artist;
      // sorts the songs on the amount of listeners
      artists.sort((a, b) => {
        return b.listeners - a.listeners;
      });
      return cleanDataArray(artists.slice(0, 50), "world");
    })
    .catch(function (error) {
      console.error(error);
      return [];
    });
}
