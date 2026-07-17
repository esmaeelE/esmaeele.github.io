+++
title = "Docker Commands"
date = 2026-07-07
description = "Essential Docker commands for container management"

[taxonomies]
tags = ["Docker", "Commands"]
categories = ["Cheat Sheet"]
+++

# Docker Commands

Essential Docker commands for daily use.

## Images

```bash
docker images
docker pull <image>
docker build -t <name> .
docker rmi <image>
docker image prune -a
```

## Containers

```bash
docker ps
docker ps -a
docker run -d --name <name> -p 8080:80 <image>
docker stop <container>
docker start <container>
docker rm <container>
docker container prune
```

## Volumes

```bash
docker volume ls
docker volume create <name>
docker volume rm <name>
docker run -v <volume>:/data <image>
```

## Networks

```bash
docker network ls
docker network create <name>
docker network rm <name>
docker network inspect <name>
```

## Logs & Debug

```bash
docker logs <container> -f
docker exec -it <container> /bin/sh
docker stats
docker inspect <container>
```

## Cleanup

```bash
docker system df
docker system prune -a
docker volume prune
```
