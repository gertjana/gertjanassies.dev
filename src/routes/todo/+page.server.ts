import { incrementPageView } from "$src/lib/server/redis";

export const load = async () => {
  await incrementPageView("todo");
  return {};
}