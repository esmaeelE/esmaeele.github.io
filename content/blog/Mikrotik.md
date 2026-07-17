+++
title = "Networking Lab with MikroTik RouterOS"
description = "Running MikroTik RouterOS in VirtualBox to practice core networking concepts, with a reverse-proxied WebUI and SSH access from the host."
date = 2026-06-20

[taxonomies]
tags = ["DevOps", "Networking"]
categories = ["Lab"]
+++

# Networking Lab with MikroTik RouterOS

MikroTik RouterOS is a good, low-cost way to get hands-on with networking concepts without buying
physical hardware. This post covers running it as a VM, exposing its WebUI and SSH through a
reverse proxy, and connecting to it from the host machine.

## Prerequisites

| Component | Version |
|-----------|---------|
| Host OS | Debian GNU/Linux (stable) |
| Hypervisor | VirtualBox |
| RouterOS | MikroTik x86 ISO |

Download the ISO from the [MikroTik website](https://mikrotik.com/).

---

## 1. Create the VM

In VirtualBox, create a new VM with type **Other/Unknown (64-bit)**.

- Enable **VT-x** in system settings
- Attach `mikrotik-7.10.1.iso` to the CD drive
- Boot and press `i` then `Enter` to install

---

## 2. First Boot

Log in to the console:

```text
user: admin
password: (empty)
```

Request an IP from the internal DHCP server:

```bash
/ip dhcp-client add interface=ether1 disabled=no
/ip address print
```

Expected output:

```text
[admin@MikroTik] > ip/address/print
Flags: D - DYNAMIC
Columns: ADDRESS, NETWORK, INTERFACE
#   ADDRESS           NETWORK      INTERFACE
0 D 10.0.2.15/24      10.0.2.0     ether1
```

---

## 3. Port Forwarding

VirtualBox's NAT network can forward ports from the host to the guest.

| Service | Host IP | Host Port | Guest IP | Guest Port |
|---------|---------|-----------|----------|------------|
| SSH | 127.0.0.1 | 9090 | 10.0.2.15 | 22 |
| WebUI | 127.0.0.1 | 8080 | 10.0.2.15 | 80 |

Traffic hitting `localhost:9090` and `localhost:8080` now redirects to the guest.

---

## 4. Access Methods

### Option A: Nginx Reverse Proxy

Create `/etc/nginx/conf.d/local_proxy.conf`:

```text
server {
    listen 80;
    server_name webfig.ir;

    location / {
        proxy_pass http://127.0.0.1:8080/;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

Add to `/etc/hosts`:

```text
127.0.0.1       webfig.ir
```

Now `http://webfig.ir` reaches the MikroTik WebUI.

### Option B: SimpleProxy (No Nginx)

```bash
sudo apt install simpleproxy
sudo simpleproxy -L webfig.ir:80 -R 127.0.0.1:8080
```

### Option C: SSH

```bash
ssh -p 9090 admin@127.0.0.1
```

Add to `~/.ssh/config` for convenience:

```text
Host mikrotik
    HostName 127.0.0.1
    User admin
    Port 9090
    KexAlgorithms diffie-hellman-group-exchange-sha256
```

Then just:

```bash
ssh mikrotik
```

### Option D: Winbox via Wine

```bash
sudo apt install wine
wine winbox64.exe
```

---

## References

- [AskUbuntu: Port forwarding](https://askubuntu.com/a/1001801/678872)
- [SimpleProxy manpage](https://manpages.ubuntu.com/manpages/lunar/en/man1/simpleproxy.1.html)
- [Baeldung: Mapping hostnames/ports](https://www.baeldung.com/linux/mapping-hostnames-ports)
- [SuperUser: MikroTik SSH](https://superuser.com/a/1670774/1787481)
