# This is free software, licensed under the Apache License, Version 2.0
#
# Copyright (C) 2026 Maizil <https://github.com/maizil41>

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI support for System Info.
LUCI_DEPENDS:=+luci
LUCI_DESCRIPTION:=Displays system information and device statistics in real-time.
LUCI_MAINTAINER:=Maizil41 <https://github.com/maizil41>

PKG_MAINTAINER:=Maizil41 <https://github.com/maizil41>
PKG_VERSION:=1.0
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_ARCH:=all

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
