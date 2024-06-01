<script>
  var query = `
query($year: Int, $season: MediaSeason) {
  Page(page: 1, perPage: 25) {
    media(sort: TRENDING_DESC, season: $season, seasonYear: $year, type: ANIME) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
    }
  }
}
`;

  let currentTime = new Date();
  let currentYear = currentTime.getFullYear();
  let currentMonth = currentTime.getMonth() + 1;

  let season = "WINTER"; // default value

  if (currentMonth == 12 || (currentMonth >= 1 && currentMonth <= 2)) {
    season = "WINTER";
  } else if (currentMonth >= 3 && currentMonth <= 5) {
    season = "SPRING";
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    season = "SUMMER";
  } else {
    season = "FALL";
  }

  var variables = {
    year: currentYear,
    season: season,
  };

  // Define the config we'll need for our Api request
  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    console.log(data);
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }
</script>
