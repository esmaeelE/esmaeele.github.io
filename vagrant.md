---
title: "Run Multiple Debian VMs with Vagrant and VirtualBox"
description: "Step-by-step guide to set up 3 Debian virtual machines using Vagrant with working SSH access."
---

# Run Multiple Debian VMs with Vagrant and VirtualBox

This guide shows how to set up **3 Debian virtual machines** with working `vagrant ssh` using **VirtualBox** as the provider. This configuration ensures SSH works reliably on Debian.

---

## 1️⃣ Vagrantfile

Save this as `Vagrantfile` in your project directory:

```
Vagrant.configure("2") do |config|
  # Only this Debian box works reliably with Vagrant SSH + VirtualBox
  config.vm.box = "generic/debian12"

  # ========== VM 1 ==========
  config.vm.define "debian1" do |vm|
    vm.vm.hostname = "debian1"
    vm.vm.network "private_network", ip: "192.168.56.150"

    vm.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
      vb.cpus = 1
    end

    # This block is required to be able to SSH into guest machines
    vm.vm.provision "shell", inline: <<-SHELL
      chmod 700 /home/vagrant/.ssh
      chmod 600 /home/vagrant/.ssh/authorized_keys
      chown -R vagrant:vagrant /home/vagrant/.ssh
    SHELL
  end

  # ========== VM 2 ==========
  config.vm.define "debian2" do |vm|
    vm.vm.hostname = "debian2"
    vm.vm.network "private_network", ip: "192.168.56.151"

    vm.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
      vb.cpus = 1
    end

    # This block is required to be able to SSH into guest machines
    vm.vm.provision "shell", inline: <<-SHELL
      chmod 700 /home/vagrant/.ssh
      chmod 600 /home/vagrant/.ssh/authorized_keys
      chown -R vagrant:vagrant /home/vagrant/.ssh
    SHELL
  end

  # ========== VM 3 ==========
  config.vm.define "debian3" do |vm|
    vm.vm.hostname = "debian3"
    vm.vm.network "private_network", ip: "192.168.56.152"

    vm.vm.provider "virtualbox" do |vb|
      vb.memory = 1024
      vb.cpus = 1
    end

    # This block is required to be able to SSH into guest machines
    vm.vm.provision "shell", inline: <<-SHELL
      chmod 700 /home/vagrant/.ssh
      chmod 600 /home/vagrant/.ssh/authorized_keys
      chown -R vagrant:vagrant /home/vagrant/.ssh
    SHELL
  end
end
```

---

## 2️⃣ Usage Instructions

1. **Destroy any previous VMs and remove old state:**

```
vagrant destroy -f
rm -rf .vagrant
```
2. **Start all 3 VMs:**

```
vagrant up
```

3. **SSH into each VM:**

```
vagrant ssh debian1
vagrant ssh debian2
vagrant ssh debian3
```
4. **Stop all VMs:**

```
vagrant halt
```

5. **Remove all VMs permanently:**

```
vagrant destroy -f
```


---

## 3️⃣ Notes

- Use **generic/debian12**; other boxes (like `debian/bookworm64`) may leave `authorized_keys` empty and break SSH.  
- The **shell provisioner block** is essential on Debian to set correct SSH permissions. Without it, `vagrant ssh` will fail.  
- Each VM uses a **private network** for predictable IPs.  
- Works with **VirtualBox 7.x** and Vagrant AppImage on Linux, macOS, and Windows.  

---
