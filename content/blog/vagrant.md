+++
title = "Run Multiple Debian VMs with Vagrant and VirtualBox"
description = "Step-by-step guide to set up 3 Debian virtual machines using Vagrant with working SSH access."
date = 2026-06-20

[taxonomies]
tags = ["DevOps", "Virtualization"]
categories = ["Guide"]
+++

# Run Multiple Debian VMs with Vagrant and VirtualBox

This guide sets up **3 Debian virtual machines** with working `vagrant ssh`, using **VirtualBox**
as the provider. The box choice and shell provisioner below are what makes SSH work reliably on
Debian — both trip people up if skipped.

---

## 1. Vagrantfile

Save this as `Vagrantfile` in your project directory. It defines the 3 VMs in a loop rather than
repeating the same block three times:

```ruby
Vagrant.configure("2") do |config|
  # Only this Debian box works reliably with Vagrant SSH + VirtualBox
  config.vm.box = "generic/debian12"

  (1..3).each do |i|
    config.vm.define "debian#{i}" do |vm|
      vm.vm.hostname = "debian#{i}"
      vm.vm.network "private_network", ip: "192.168.56.#{149 + i}"

      vm.vm.provider "virtualbox" do |vb|
        vb.memory = 1024
        vb.cpus = 1
      end

      # Required to be able to SSH into the guest machines
      vm.vm.provision "shell", inline: <<-SHELL
        chmod 700 /home/vagrant/.ssh
        chmod 600 /home/vagrant/.ssh/authorized_keys
        chown -R vagrant:vagrant /home/vagrant/.ssh
      SHELL
    end
  end
end
```

This produces `debian1`, `debian2`, `debian3` on `192.168.56.150`, `.151`, `.152` respectively —
same result as writing out three separate blocks, less to maintain.

---

## 2. Usage

**Destroy any previous VMs and clear old state:**

```bash
vagrant destroy -f
rm -rf .vagrant
```

**Start all 3 VMs:**

```bash
vagrant up
```

**SSH into each VM:**

```bash
vagrant ssh debian1
vagrant ssh debian2
vagrant ssh debian3
```

**Stop all VMs:**

```bash
vagrant halt
```

**Remove all VMs permanently:**

```bash
vagrant destroy -f
```

---

## 3. Notes

- Use **`generic/debian12`** — other boxes (like `debian/bookworm64`) can leave `authorized_keys`
  empty and break SSH.
- The **shell provisioner block** is required on Debian to set correct SSH permissions; without it,
  `vagrant ssh` fails.
- Each VM uses a **private network** for predictable IPs.
- Tested with **VirtualBox 7.x** and the Vagrant AppImage on Linux, macOS, and Windows.
