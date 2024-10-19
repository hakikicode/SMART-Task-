import { namespaceWrapper } from "@_koii/namespace-wrapper";

export async function auditTask(roundNumber) {
  try {
    console.log(`Auditing task for round ${roundNumber}`);

    // Fetch the stored game data
    const storedData = await namespaceWrapper.storeGet("gamesData");

    // Fetch the submitted game data
    const submittedData = await namespaceWrapper.storeGet("submission");

    // Perform audit (compare submitted data with stored data)
    const isValid = JSON.stringify(storedData) === JSON.stringify(submittedData);

    console.log(`Audit result for round ${roundNumber}: ${isValid ? "Passed" : "Failed"}`);
    return isValid;

  } catch (error) {
    console.error("AUDIT ERROR:", error);
  }
}
