import { namespaceWrapper, app } from "@_koii/namespace-wrapper";

export function routes() {
  app.get("/gamesData", async (_req, res) => {
    try {
      // Fetch the stored games data
      const gamesData = await namespaceWrapper.storeGet("gamesData");
      res.status(200).json({ gamesData });
    } catch (error) {
      console.error("Failed to fetch games data:", error);
      res.status(500).json({ error: "Failed to fetch games data" });
    }
  });
}
