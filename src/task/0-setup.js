import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function setup() {
  try {
    console.log("Initializing task...");

    // Example game data that would be fetched or initialized
    const gamesData = [
      { id: 1, name: "SmartClickingBot", score: 50 },
      { id: 2, name: "Hamster Kombat", score: 75 },
    ];

    // Store initial game data in the namespace storage
    await namespaceWrapper.storeSet("gamesData", gamesData);
    console.log("Game data initialized and stored");

  } catch (error) {
    console.error("SETUP ERROR:", error);
  }
}
