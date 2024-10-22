import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function submission(roundNumber) {
  try {
    console.log(`Making submission for round ${roundNumber}`);

    // Fetch the stored game data from namespace storage
    const gamesData = await namespaceWrapper.storeGet("gamesData");

    if (!gamesData) {
      console.error("No game data found in storage.");
      return null;
    }

    // Convert the game data to a string for submission
    const gameDataString = JSON.stringify(gamesData);

    // Ensure the data is under 512 bytes (truncate if necessary)
    const truncatedData = gameDataString.substring(0, 512);

    console.log("Data prepared for submission:", truncatedData);

    // Return the prepared data for submission
    return truncatedData;
  } catch (error) {
    console.error("Error in submission:", error);
  }
}
