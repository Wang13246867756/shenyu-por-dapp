# 知几预测平台 - 运营手册

## 🌐 线上地址
- **生产环境：** https://shenyu-por-dapp.vercel.app
- **Vercel 管理：** https://vercel.com/dashboard → shenyu-por-dapp

## 📦 仓库地址
https://github.com/Wang13246867756/shenyu-por-dapp

## ⚙️ 环境变量配置

在 Vercel 中设置以下环境变量（Settings → Environment Variables）：

| 变量名 | 说明 | 获取方式 |
|--------|------|----------|
| `VITE_WALLETCONNECT_PROJECT_ID` | WalletConnect 项目 ID | https://cloud.walletconnect.com |
| `VITE_CONTRACT_ADDRESS` | BSC 合约地址 | 部署合约后获得 |

## 🔄 更新部署流程

### 方法 1：自动部署（推荐）
1. 修改代码
2. 推送到 GitHub 仓库
3. Vercel 自动构建并部署

### 方法 2：手动部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 📝 常用命令

```bash
# 查看 Vercel 部署列表
vercel ls

# 查看部署日志
vercel logs <deployment-url>

# 回滚到上一个版本
vercel rollback
```

## 🆘 故障排查

### 钱包无法连接
- 检查 `VITE_WALLETCONNECT_PROJECT_ID` 是否正确
- 确认 WalletConnect 项目已激活

### 合约交互失败
- 检查 `VITE_CONTRACT_ADDRESS` 是否为空或错误
- 确认合约已在 BSC 主网/测试网部署
- 检查 ABI 是否与合约匹配

### 构建失败
- 检查 `package.json` 依赖是否完整
- 查看 Vercel 构建日志

## 📞 技术支持
- **Vercel 文档：** https://vercel.com/docs
- **Wagmi 文档：** https://wagmi.sh
- **WalletConnect 文档：** https://docs.walletconnect.com
