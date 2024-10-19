import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function submission(roundNumber) {
  /**
   * Submit the task proofs for auditing
   * Must return a string of max 512 bytes to be submitted on chain
   */
  try {
    console.log(`MAKE SUBMISSION FOR ROUND ${roundNumber}`);

    // Fetch and validate the games data
    const gamesData = await namespaceWrapper.storeGet("gamesData");

    if (!gamesData || gamesData.length === 0) {
      console.error("No valid game data found");
      return null;
    }

    // Perform additional validation logic on the game data if necessary
    console.log("Game data fetched and validated:", gamesData);

    // Return validated game data
    return JSON.stringify(gamesData).substring(0, 512); // Truncate to 512 bytes if necessary
  } catch (error) {
    console.error("MAKE SUBMISSION ERROR:", error);
  }
}
