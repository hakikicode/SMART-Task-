import axios from 'axios';
import { load } from 'cheerio';
import { namespaceWrapper } from "@_koii/namespace-wrapper";

// Function to fetch data from public APIs
async function fetchFromAPIs() {
  try {
    console.log("Fetching game data from public APIs...");

    const api1 = await axios.get('https://barter.vg/browse/cards/json');
    const api2 = await axios.get('https://www.amiiboapi.com/api/amiibo/?name=mario');
    const api3 = await axios.get('https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/champion.json');
    const api4 = await axios.get('https://www.dnd5eapi.co/api/features');
    const api5 = await axios.get('https://www.cheapshark.com/api/1.0/deals?upperPrice=15');
    const api6 = await axios.get('https://api.atlasacademy.io/export/NA/nice_servant.json');
    const api7 = await axios.get('https://www.freetogame.com/api/games?platform=pc');
    const api8 = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
    const api9 = await axios.get('https://www.gamerpower.com/api/giveaways?platform=steam&type=loot&sort-by=popularity');

    // Combine data from multiple APIs
    const combinedApiData = {
      barterVG: api1.data,
      amiibo: api2.data,
      lolChampions: api3.data,
      dndFeatures: api4.data,
      cheapDeals: api5.data,
      atlasServants: api6.data,
      freeToGame: api7.data,
      pokemonDitto: api8.data,
      gamerPower: api9.data
    };

    return combinedApiData;
  } catch (error) {
    console.error("Error fetching from APIs:", error);
    return {};
  }
}

// Function to scrape data from websites
async function scrapeFromWebsites() {
  try {
    console.log("Scraping data from websites...");

    const website1 = await axios.get('https://github.com/leomaurodesenv/game-datasets');
    const website2 = await axios.get('https://games.crossfit.com/leaderboard/finals/2024?final=225&division=1&sort=0');
    const website3 = await axios.get('https://whatoplay.com/');
    const website4 = await axios.get('https://www.fortnite.com/ranked/leaderboard?lang=en-US');

    // Use cheerio to parse HTML and extract relevant data
    const $1 = load(website1.data);  // the HTML content to parse
    const $2 = load(website2.data);
    const $3 = load(website3.data);
    const $4 = load(website4.data);

    // Example scraping logic (you can adjust this based on the structure of each website)
    const githubData = $1('h1').text(); // Example: Scraping title from GitHub page
    const crossfitLeaderboard = $2('table tbody tr').map((i, el) => ({
      rank: $(el).find('td.rank').text(),
      name: $(el).find('td.name').text(),
      score: $(el).find('td.score').text()
    })).get();

    // Return scraped data
    return {
      githubData,
      crossfitLeaderboard,
      whatoplay: $3('h2').text(), // Adjust as per actual data structure
      fortniteLeaderboard: $4('h1').text() // Adjust as per actual data structure
    };
  } catch (error) {
    console.error("Error scraping websites:", error);
    return {};
  }
}

// Main task logic
export async function task() {
  try {
    console.log("Fetching and scraping game data from multiple sources...");

    // Fetch data from APIs and websites
    const apiData = await fetchFromAPIs();
    const scrapedData = await scrapeFromWebsites();

    // Combine API data and scraped data
    const combinedGameData = {
      ...apiData,
      ...scrapedData
    };

    console.log("Combined game data from APIs and websites:", combinedGameData);

    // Store the combined game data in the namespace storage
    await namespaceWrapper.storeSet("gamesData", combinedGameData);

    console.log("Game data stored successfully.");
  } catch (error) {
    console.error("Error in task execution:", error);
  }
}
