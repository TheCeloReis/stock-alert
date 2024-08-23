import { onRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as logger from "firebase-functions/logger";
import { routine } from "./main";

export const manualReport = onRequest(async (_, response) => {
  try {
    await routine();
    logger.info("Routine executed successfully");

    response.send("Routine executed successfully");
  } catch (error) {
    logger.error(error);

    response.status(500).send("Routine failed");
  }
});

// every weekday at 8am
export const scheduledReport = onSchedule(
  {
    schedule: "0 8 * * 1-5",
    timeZone: "America/Sao_Paulo",
    retryCount: 0,
  },
  async () => {
    try {
      await routine();
      logger.info("Routine executed successfully");
    } catch (error) {
      logger.error(error);
    }
  }
);
