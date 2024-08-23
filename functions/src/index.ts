/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

require("dotenv").config();

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { routine } from "./main";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest(async (request, response) => {
  try {
    await routine();
    logger.info("Routine executed successfully");

    response.send("Routine executed successfully");
  } catch (error) {
    logger.error(error);

    response.status(500).send("Routine failed");
  }
});
