import {beforeEach, describe, expect, it } from 'vitest';
import { incrementPageView, incrementPageReads, incrementLikes, getPageStat, getPageStats, updateReadingTime } from '$lib/server/redis';
import Redis  from 'ioredis-mock';
import { getClient } from '$lib/server/redis';

describe("the persistence layer should", () => {
    const mocked_redis = new Redis();
  
    const test_pagestat = { slug: "test", views: 10, reads: 3, likes: 1, time: 6 };
    
    const expected_non_existent_stat = { slug: "non-existent", views: 1, reads: 0, likes: 0, time: 0 };
    const expected_increased_pageviews = { slug: "test", views: 11, reads: 3, likes: 1, time: 6 };
    const expected_increased_pagereads = { slug: "test", views: 10, reads: 4, likes: 1, time: 6 };
    const expected_increased_likes = { slug: "test", views: 10, reads: 3, likes: 2, time: 6 };
    const expected_reading_time = { slug: "test", views: 10, reads: 3, likes: 1, time: 3 };
    const expected_stats = [test_pagestat, expected_non_existent_stat];

    const content = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In luctus ornare est ac dignissim. Pellentesque consequat leo eget dolor pellentesque, lacinia fringilla libero tincidunt. Nulla aliquam dui dui, id tristique felis eleifend quis. Sed ac aliquet tellus. Nunc congue tempor dolor, quis consectetur eros. Mauris tincidunt magna purus, vel semper lorem vulputate ac. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris rhoncus metus libero, ut accumsan sem dapibus vitae. Suspendisse imperdiet eu diam quis vestibulum. Nulla purus tellus, cursus ac quam sit amet, rhoncus elementum nulla. Integer accumsan, tellus ut pretium egestas, ligula lectus maximus tellus, at feugiat diam ligula sit amet felis. Aliquam consequat magna tortor, et pulvinar lectus dapibus ut.
    Proin in urna ac nulla vestibulum porttitor eget sed nunc. Mauris ultrices ullamcorper consequat. Nulla a sagittis nisi. Cras nunc libero, interdum sit amet ligula nec, mollis laoreet lacus. Ut ipsum arcu, condimentum vitae varius eu, dictum ut arcu. Pellentesque eget nisi erat. Nunc efficitur tincidunt arcu nec volutpat. Nulla lacinia, justo ut iaculis vestibulum, purus risus vestibulum mi, sit amet rutrum risus quam at risus.
    Donec malesuada elit in dolor maximus pulvinar ac nec odio. In sollicitudin a urna vel vulputate. Quisque molestie, massa vel vulputate lobortis, enim lectus vestibulum erat, ac interdum tortor libero nec mi. Mauris vestibulum, diam ac sollicitudin convallis, arcu neque bibendum sem, in iaculis orci ex sed nibh. Pellentesque vel feugiat sem. Aliquam sit amet magna tortor. Vivamus varius ipsum et ante ullamcorper, eu vehicula felis vestibulum. Fusce placerat mauris et elit elementum dignissim. Nunc sed fermentum tortor, pulvinar lobortis urna. Praesent mattis metus eu est sagittis hendrerit. Praesent efficitur pulvinar felis, a aliquet nisi faucibus ac. Vestibulum blandit quis nisi sit amet vehicula. Sed efficitur libero et fringilla ultricies.
    Nulla a velit volutpat, pharetra diam a, blandit enim. Sed vel eros volutpat, molestie elit vitae, ultricies orci. Nunc nunc dui, ultrices non ligula ut, ullamcorper viverra nulla. Sed odio magna, dapibus consequat nunc eu, sollicitudin porta nunc. Integer volutpat tempus mi at fringilla. Ut quis tortor ut mi congue lacinia. Sed ut ex vitae risus sollicitudin gravida. Curabitur in arcu ac sem posuere facilisis. Curabitur condimentum mollis arcu, quis feugiat erat porta dignissim. Nulla vel sagittis odio. Nulla facilisi. Sed sollicitudin elit in eros tempus consectetur. Aliquam fermentum suscipit massa faucibus ultricies.  
    `

    beforeEach(() => {
      mocked_redis.set("dev:post:test:page_stats", JSON.stringify(test_pagestat));
    });

    it("returns a client when asked for one", async () => {
      const client = await getClient();
      expect(client).toBeUndefined();

      process.env['REDIS_CONNECTION'] = "redis://localhost:6379";

      const client2 = await getClient();
      expect(client2).toBeDefined();

    })

    it("increase the pageviews when incrementPageView() is called", async () => {
      const new_stats = await incrementPageView(mocked_redis, "test");
      expect(new_stats).toStrictEqual(expected_increased_pageviews);
    })
    
    it("increase the pagereads when incrementPageReads() is called", async () => {
      const new_stats = await incrementPageReads(mocked_redis, "test");
      expect(new_stats).toStrictEqual(expected_increased_pagereads);
    })

    it("increase the likes when incrementLikes() is called", async () => {
      const new_stats = await incrementLikes(mocked_redis, "test");
      expect(new_stats).toStrictEqual(expected_increased_likes);
    })

    it("create a new pagestat when incrementPageview() is called with a slug that doesn't exist", async () => {
      const new_stats = await incrementPageView(mocked_redis, "non-existent");
      expect(new_stats).toStrictEqual(expected_non_existent_stat);
    })

    it("calculates reading time when updateReadintTime() is called", async () => {
      const new_stats = await updateReadingTime(mocked_redis, "test", content);
      expect(new_stats).toStrictEqual(expected_reading_time);
    })

    it("return the PageStat when provided a slug", async () => {
      const new_stat = await getPageStat(mocked_redis, "test");
      expect(new_stat).toStrictEqual(test_pagestat);
    })

    it("return undefined when provided a slug that doesn't exist", async () => {
      const new_stat = await getPageStat(mocked_redis, "out-of-this-world");
      expect(new_stat).toBe(undefined);
    })

    it("return an array of PageStats", async () => {
      const stats = await getPageStats(mocked_redis);
      expect(stats).toStrictEqual(expected_stats);
    })
  });

