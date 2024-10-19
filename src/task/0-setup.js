import { namespaceWrapper } from "@_koii/namespace-wrapper";
import fetch from 'node-fetch'; // Native fetch or node-fetch can be used
import cheerio from 'cheerio'; // For scraping public HTML pages (install if needed)

export async function setup() {
  try {
    console.log("Initializing task...");

    // Example game data that would be fetched or initialized
    const gamesData = [
      { id: 1, name: "SmartClickingBot", score: 50 },
      { id: 2, name: "Hamster Kombat", score: 75 },
    ];

    // List of multiple URLs (APIs or websites) to fetch game data
    const urls = [
      "https://rocket-league1.p.rapidapi.com/tournaments/%7Bregion%7D", // Public API 1
      "https://opencritic-api.p.rapidapi.com/review/game/463?skip=20&sort=newest", // Public API 2
      "https://chess-puzzles.p.rapidapi.com/?themes=%5B%22middlegame%22%2C%22advantage%22%5D&rating=1500&themesType=ALL&playerMoves=4&count=25",
      "https://github.com/leomaurodesenv/game-datasets", // Webpage 1 to scrape
      // Add more URLs here
    ];

    let allGamesData = [...gamesData];  // Start with the initial game data

    for (let url of urls) {
      try {
        console.log(`Fetching data from: ${url}`);

        // Fetch data from each URL
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
        }

        // Check if the URL returns JSON or HTML
        const contentType = response.headers.get("content-type");

        if (contentType.includes("application/json")) {
          // If it's JSON, directly parse the data
          const fetchedGamesData = await response.json();
          allGamesData = allGamesData.concat(fetchedGamesData);

        } else if (contentType.includes("text/html")) {
          // If it's HTML, scrape the webpage using cheerio
          const html = await response.text();
          const $ = cheerio.load(html);

          // Example: Scraping game name and score from the page
          $('.game').each((_index, element) => {
            const name = $(element).find('.game-name').text();
            const score = parseInt($(element).find('.game-score').text(), 10);
            allGamesData.push({ name, score });
          });

        } else {
          console.warn(`Unsupported content type from ${url}: ${contentType}`);
        }

      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }

    if (allGamesData.length === 0) {
      throw new Error("No valid game data fetched from any source");
    }

    // Store all aggregated game data in the namespace storage
    await namespaceWrapper.storeSet("gamesData", allGamesData);
    console.log("All game data fetched and stored in namespace storage");

  } catch (error) {
    console.error("SETUP ERROR:", error);
  }
}
