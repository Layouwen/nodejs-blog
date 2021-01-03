#!/bin/sh

cd /e/node/nodejs-blob/logs
cp access.log $(date +%Y-%m-%d-%H)-access.log
echo "" > access.log

# 使用 linux 或 macOs 系统
# crontab -e

# 添加下面内容
# * 0 * * * sh 当前脚本的绝对路径

# 查看当前正在执行的任务
# crontab -l
