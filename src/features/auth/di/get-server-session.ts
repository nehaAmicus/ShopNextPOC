import "server-only";

import { cookies } from "next/headers";
import { getCurrentUserUseCase } from "./server-container.ts";

export async function getServerSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return null;
  }

  try {
    const user = await getCurrentUserUseCase.execute(accessToken);
    return user;
  } catch (error) {
    console.error("Session validation failed:", error);
    return null;
  }
}
