#!/bin/bash

sudo /opt/bitnami/ctlscript.sh stop apache
sudo /usr/local/bin/lego --email="riachi@gmail.com" --domains="loustic.tk" --path="/etc/lego" renew
sudo /opt/bitnami/ctlscript.sh start apache