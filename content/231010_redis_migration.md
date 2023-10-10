---
title: Redis Migration
author: Gertjan Assies
date: "2023-10-10"
category: code
tags: redis, dragonflydb, tip, featured
published: true
image: "/images/migration.jpg"
summary: "Migrating from redis to dragonflydb for this blog."
---

I've read about [dragonflydb](https://dragonflydb.io) which is a drop in replacement for redis, and superfast, so to try it out I decided to migrate this blog from redis to dragonflydb.

Migration turned out to be pretty easy, that I'll document it here.

Prerequisites: the old `redis-instance` and a fresh `dragonfly-instance` one and `redis-cli` installed.

```bash
> redis-cli -h <dragonfly-instance> -p 6379

dragonfly-instance:6379> KEYS *
(empty array)

dragonfly-instance:6379> INFO replication
# Replication
role:master
connected_slaves:0
master_replid:68ffe35f52d262f9e86b7e14de8ee98020764bb6

dragonfly-instance:6379> REPLICAOF <old redis-instance> 6379
OK

dragonfly-instance:6379> INFO replication
# Replication
role:replica
master_host:<old redis-instance>
master_port:6379
master_link_status:up
master_last_io_seconds_ago:1
master_sync_in_progress:0

dragonfly-instance:6379> KEYS *
# shows all the key migrated, but for obvious reasons I've omitted them
```

Now I stop and update the server to use the new instance

and I turn off replication, this is needed as replica's are read only.

```bash
dragonfly-instance:6379> REPLICAOF NO ONE
OK
```

And now start the application again.

And that's it, the blog is now using dragonflydb instead of redis.

Now all is needed is to get millions and millions of visitors to this blog. so i can reap the benifits of the speed of dragonflydb. /s
