import { getClient, incrementPageView } from "$src/lib/server/redis";

export const load = async () => {
  await incrementPageView(getClient(), "todo");
  return {};
}
