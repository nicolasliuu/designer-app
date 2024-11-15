import PromptGenerator from "@/types/PromptGenerator";
import * as fal from "@fal-ai/serverless-client";

/** @hideconstructor */
export default class ImageGenerator {
  /**
   * @param {string} description
   * @param {string} model
   * @throws {Error}
   */
  static async createFrom(description, model = "fal-ai/flux/schnell") {
    if (
      !description ||
      typeof description !== "string" ||
      description.trim() === ""
    ) {
      throw new Error(
        "Invalid description: Description must be a non-empty string",
      );
    }

    const prePrompt = PromptGenerator.ASSETS.IMAGE();
    const fullPrompt = `${prePrompt}\n${description}`;

    try {
      const result = await fal.subscribe(model, {
        input: {
          prompt: fullPrompt,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        },
      });

      return {
        images: result.images.map((img) => ({
          url: img.url,
          content_type: img.content_type,
        })),
        timings: result.timings,
        seed: result.seed,
        has_nsfw_concepts: result.has_nsfw_concepts,
        prompt: result.prompt,
      };
    } catch (error) {
      console.error("Error generating GarmentImage:", error);
      if (error.message.includes("Invalid prompt")) {
        throw new Error(
          "Invalid prompt: The generated prompt was rejected by the API",
        );
      }
      throw error;
    }
  }
}
