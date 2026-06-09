#!/bin/bash

# 个人网站本地启动脚本
# 自动安装依赖并启动开发服务器，浏览器将自动打开

cd "$(dirname "$0")/app"

# 检查 Node.js 是否已安装
if ! command -v node &> /dev/null; then
  echo "错误: 未检测到 Node.js，请先安装 Node.js (https://nodejs.org)"
  exit 1
fi

# 如果 node_modules 不存在，则自动安装依赖
if [ ! -d "node_modules" ]; then
  echo "首次运行，正在安装依赖（可能需要几分钟）..."
  npm install
fi

echo "正在启动开发服务器，浏览器将自动打开..."
echo "提示: 按住 Shift 并点击页面左上角 Logo，可进入管理员登录"
echo "按 Ctrl+C 停止服务器"
echo ""

npm run dev
