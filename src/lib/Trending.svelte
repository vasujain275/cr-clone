<script>
  import AnimeCard from "./AnimeCard.svelte";
  var mediaArray = [];
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
        extraLarge
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

  let seasonUpper = season.charAt(0) + season.toLowerCase().slice(1);

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
    mediaArray = data.data.Page.media;
  }

  function handleError(error) {
    alert("Error, check console");
    console.error(error);
  }
</script>

<h2
  class="text-[28px] leading-[36px] text-left tracking-normal text-white mr-20 ml-20 mt-5 px-2 py-2"
>
  Trending {seasonUpper}
  {currentYear}
</h2>

<p
  class="text-[16px] leading-[24px] text left tracking-normal text-[#a0a0a0] mr-20 ml-20 mt-2 px-2 py-2"
>
  Find the best new and countinuing simulcasts here!
</p>

<div class="mt-4 ml-20 mr-20 grid sm:grid-cols-5 gap-5">
  {#each mediaArray as anime}
    <AnimeCard
      coverImage={anime.coverImage.extraLarge}
      animeName={anime.title.english || anime.title.romaji}
    />
  {/each}
</div>
