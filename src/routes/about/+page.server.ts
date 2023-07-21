import { incrementPageView } from '$lib/server/redis';

export const load = async () => {
  await incrementPageView("about");
  return {};
};