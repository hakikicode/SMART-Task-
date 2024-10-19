import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function executeTask(roundNumber) {
  try {
    console.log(`Executing task for round ${roundNumber}`);

    // Fetch existing games data (could also include new data fetching logic here)
    let gamesData = await namespaceWrapper.storeGet("gamesData");

    // Example validation or update logic
    gamesData = gamesData.map(game => ({
      ...game,
      score: game.score + Math.floor(Math.random() * 10), // Simulate score updates
    }));

    // Store updated games data
    await namespaceWrapper.storeSet("gamesData", gamesData);
    console.log("Game data updated successfully");

  } catch (error) {
    console.error("TASK EXECUTION ERROR:", error);
  }
}
