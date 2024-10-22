import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function audit(roundNumber) {
  try {
    console.log(`Auditing task for round ${roundNumber}`);

    // Fetch the stored game data from namespace storage
    const storedData = await namespaceWrapper.storeGet("gamesData");

    if (!storedData) {
      console.error("No game data found for auditing.");
      return false; // Audit failed
    }

    // Fetch the submitted game data for this round
    const submittedData = await namespaceWrapper.storeGet("submission");

    if (!submittedData) {
      console.error("No submission data found for this round.");
      return false; // Audit failed
    }

    // Compare the stored data with the submitted data
    const isValid = JSON.stringify(storedData) === JSON.stringify(submittedData);

    console.log(`Audit result for round ${roundNumber}: ${isValid ? "Passed" : "Failed"}`);
    
    return isValid; // Return true if the audit passes, false if it fails
  } catch (error) {
    console.error("Error in audit task:", error);
    return false; // Audit failed
  }
}
