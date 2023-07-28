import { getClient, incrementPageView } from '$lib/server/redis';

export const load = async () => {
  await incrementPageView(await getClient(), "about");
  return {};
};