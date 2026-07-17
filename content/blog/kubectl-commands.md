+++
title = "Kubectl Commands"
date = 2026-07-08
description = "Common kubectl commands for daily use"

[taxonomies]
tags = ["Kubernetes", "Commands"]
categories = ["Cheat Sheet"]
+++

# Kubectl Commands

Quick reference for common kubectl commands.

## Cluster Info

```bash
kubectl cluster-info
kubectl get nodes
kubectl get namespaces
```

## Pods

```bash
kubectl get pods -o wide
kubectl describe pod <pod-name>
kubectl logs <pod-name> -f
kubectl exec -it <pod-name> -- /bin/sh
kubectl delete pod <pod-name>
```

## Deployments

```bash
kubectl get deployments
kubectl describe deployment <name>
kubectl scale deployment <name> --replicas=3
kubectl rollout status deployment <name>
kubectl rollout history deployment <name>
kubectl rollout undo deployment <name>
```

## Services

```bash
kubectl get svc
kubectl describe svc <name>
kubectl get endpoints <name>
```

## Debugging

```bash
kubectl get events --sort-by='.lastTimestamp'
kubectl top pods
kubectl top nodes
kubectl port-forward <pod-name> 8080:80
```

## Useful Aliases

```bash
alias k=kubectl
alias kgp='kubectl get pods'
alias kgs='kubectl get svc'
alias kgd='kubectl get deployments'
alias kd='kubectl describe'
alias kx='kubectl exec -it'
```
