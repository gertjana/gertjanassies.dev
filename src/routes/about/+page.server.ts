import { incrementPageView } from '$lib/server/redis';

export const load = async () => {
  let pageviews = await incrementPageView("about");
  return {};
};