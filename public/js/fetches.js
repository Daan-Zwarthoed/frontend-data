async function cleanDataArray(array, countryOrWorld) {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    newArray[i] = {};
    newArray[i].country = countryOrWorld;
    newArray[i].position = i + 1;
    newArray[i].name = array[i].name;
  }
  return newArray;
}

// Fetches the most popular songs of a country
export function getPopularTracksCountry(country) {
  return axios
    .request(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&limit=50&api_key=424df88f98fb9a993131121f6457c381&format=json`
    )
    .then(function (response) {
      return cleanDataArray(response.data.tracks.track, country);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Fetches the most popular artists of a country
export function getPopularArtistsCountry(country) {
  return axios
    .request(
      `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&limit=50&api_key=424df88f98fb9a993131121f6457c381&format=json`
    )
    .then(function (response) {
      console.log(response);
      return cleanDataArray(response.data.topartists.artist, country);
    })
    .catch(function (error) {
      console.error(error);
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
    });
}
