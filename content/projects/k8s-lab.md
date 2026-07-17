+++
title = "Kubernetes Lab Setup"
description = "Automated EKS cluster provisioning with Terraform and Helm"
date = 2026-06-15

[taxonomies]
tags = ["Kubernetes", "Terraform", "AWS"]
categories = ["Infrastructure"]
+++

# Kubernetes Lab Setup

Automated provisioning of an AWS EKS cluster for learning and testing.

## What it does

- Provisions EKS cluster with Terraform
- Installs monitoring stack (Prometheus, Grafana)
- Configures ArgoCD for GitOps
- Includes sample application for testing

## Tech Stack

| Component | Tool |
|-----------|------|
| IaC | Terraform |
| Containers | Kubernetes, Helm |
| CI/CD | ArgoCD |
| Monitoring | Prometheus, Grafana |

## Quick Start

```bash
terraform init
terraform apply
```

## Links

- [GitHub Repo](https://github.com/esmaeelE)
