import "server-only";
import { cacheLife, cacheTag } from "next/cache";

const BASE_URL = "https://dummyjson.com";

export class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    // "use cache";

    // // Cache the API response for the configured lifetime
    // cacheLife("hours");

    // // Tag cached product responses for future revalidation
    // cacheTag("products");

    const response = await fetch(`${BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`,
      );
    }

    return (await response.json()) as T;
  }
}

export const apiClient = new ApiClient();
