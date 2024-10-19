import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function distributeRewards(roundNumber) {
  try {
    console.log(`Distributing rewards for round ${roundNumber}`);

    // Fetch audit result
    const auditPassed = await namespaceWrapper.storeGet(`audit_${roundNumber}`);

    if (auditPassed) {
      // Example reward distribution logic
      console.log("Audit passed, distributing rewards...");

      const gamesData = await namespaceWrapper.storeGet("gamesData");

      // Example logic: reward based on total score
      const totalScore = gamesData.reduce((acc, game) => acc + game.score, 0);

      // Distribute rewards based on the score
      const rewardAmount = totalScore * 10; // Arbitrary reward formula
      console.log(`Rewards distributed: ${rewardAmount} SMART tokens`);

      return rewardAmount;
    } else {
      console.log("Audit failed, no rewards distributed");
      return 0;
    }
  } catch (error) {
    console.error("REWARD DISTRIBUTION ERROR:", error);
  }
}
