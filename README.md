# Safe-CLI-Agent 插件市场

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Safe-CLI-Agent 官方插件仓库。浏览、安装、管理你的 Agent 插件。

## 插件列表

| 插件 | 类型 | 版本 | 描述 |
|------|------|------|------|
| [kali](plugins/kali) | exec | 1.0.0 | Kali Linux 渗透测试环境 |
| [ctf_lab](plugins/ctf_lab) | compose | 1.0.0 | CTF 安全靶场环境 (3 个 flag) |
| [crypto_tls](plugins/crypto_tls) | compose | 1.0.0 | SEED Labs TLS 实验 |

## 安装方式

### 方式 1：前端导入（推荐）

1. 下载插件目录的 ZIP 包
2. 打开 Safe-CLI-Agent → 设置 → 插件配置 → 导入插件 (.zip)
3. 重启服务

### 方式 2：手动安装

将插件目录复制到 `config/plugins/` 下，重启服务。

## 插件目录规范

每个插件是 `plugins/` 下的一个自包含文件夹：

```
plugins/my_plugin/
├── plugin.yaml              ← 必填：插件定义
├── docker-compose.yml       ← compose 插件需要
├── handler.py               ← local 插件需要
└── README.md                ← 可选：插件说明
```

### plugin.yaml 格式

```yaml
plugins:
  - name: "my_plugin"
    version: "1.0.0"
    author: "your_name"
    type: "exec"  # exec / command / compose / local
    description: "插件描述"
    # ... 其他字段见 plugin-guide.md
```

## 提交插件

1. Fork 本仓库
2. 在 `plugins/` 下创建你的插件目录
3. 更新 `registry.json`
4. 提交 PR

详见 [插件配置指南](https://github.com/wu222222/cli-agent/blob/main/plugin-guide.md)。

## 版本管理

- 每个插件在 `plugin.yaml` 中声明 `version` 字段
- `registry.json` 记录所有插件的最新版本
- 使用 [语义化版本](https://semver.org/lang/zh-CN/)：`主版本.次版本.修订版本`
