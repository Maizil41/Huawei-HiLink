# This is free software, licensed under the Apache License, Version 2.0
#
# Copyright (C) 2025 Maizil <https://github.com/maizil41>

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI support for Huawei HiLink modem.
LUCI_DEPENDS:=+luci +openssl-util
LUCI_DESCRIPTION:=This package contains LuCI configuration pages for Huawei modem.
LUCI_MAINTAINER:=Maizil41 <https://github.com/maizil41>

PKG_VERSION:=1.8
PKG_RELEASE:=1
PKG_LICENSE:=Apache-2.0
PKG_ARCH:=all

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
