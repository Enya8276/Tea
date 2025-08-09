# 🚀 茶叶网站项目启动指南

## 📋 项目概述
我们已经为您创建了一个完整的茶叶商业网站项目，包含：
- ✅ 数据库设计 (Supabase)
- ✅ 前端框架 (Next.js 14)
- ✅ UI组件库 (Tailwind CSS)
- ✅ 状态管理 (Zustand)
- ✅ 动画效果 (Framer Motion)

## 🛠️ 安装和启动

### 1. 安装依赖
```bash
npm install
```

### 2. 创建环境变量文件
在项目根目录创建 `.env.local` 文件：
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://szukwpthlofuyegmhppx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dWt3cHRobG9mdXllZ21ocHB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDc5OTgsImV4cCI6MjA2OTk4Mzk5OH0.4pJcnZtkbNm00e8aO2g9BT-1Lp_g9aI7cNSUavHRNR4

# Service Role Key (for server-side operations)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6dWt3cHRobG9mdXllZ21ocHB4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDQwNzk5OCwiZXhwIjoyMDY5OTgzOTk4fQ.Ts-Y-vzIV38S6PDU4MNMTP-cwEsJy2K4rrwDt_xBJh4

# Site Configuration
NEXT_PUBLIC_SITE_NAME=茶韵雅集
NEXT_PUBLIC_SITE_DESCRIPTION=传承千年茶文化，品味东方茶韵
```

### 3. 初始化数据库
在 Supabase Dashboard 中执行以下SQL脚本：
1. 运行 `tea-website-schema.sql` 创建表结构
2. 运行 `sample-data.sql` 添加示例数据

### 4. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看网站

## 📁 项目结构

```
tea-culture-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── layout/           # 布局组件
│   ├── home/             # 首页组件
│   └── supabase-provider.tsx
├── lib/                  # 工具库
│   └── supabase.ts       # Supabase配置
├── tea-website-schema.sql # 数据库结构
├── sample-data.sql       # 示例数据
└── package.json          # 项目配置
```

## 🎨 已完成的组件

### 布局组件
- ✅ Header (导航栏)
- ✅ Footer (页脚)
- ✅ ThemeProvider (主题切换)
- ✅ SupabaseProvider (数据库连接)

### 首页组件
- ✅ Hero (英雄区域)
- ✅ TeaCategories (六大茶类)
- ✅ 其他组件待完成...

## 🔄 下一步开发

### 第二阶段：完成首页组件
- [ ] TeawareShowcase (茶具展示)
- [ ] CultureSection (茶文化介绍)
- [ ] BrewingTips (泡茶技巧)
- [ ] FeaturedProducts (推荐产品)

### 第三阶段：产品页面
- [ ] 茶叶列表页
- [ ] 茶叶详情页
- [ ] 茶具列表页
- [ ] 茶具详情页

### 第四阶段：用户功能
- [ ] 用户注册/登录
- [ ] 购物车功能
- [ ] 订单管理
- [ ] 个人中心

## 🎯 特色功能

1. **响应式设计** - 适配各种设备
2. **深色模式** - 支持主题切换
3. **动画效果** - 使用Framer Motion
4. **国际化** - 中英文支持
5. **茶文化主题** - 专业的茶叶配色方案

## 🚀 部署

### Vercel部署
1. 连接GitHub仓库
2. 配置环境变量
3. 自动部署

### 自定义域名
- 配置DNS解析
- 在Vercel中绑定域名

## 📞 技术支持

- **项目负责人**: Enya8276
- **数据库**: Supabase
- **前端框架**: Next.js
- **UI框架**: Tailwind CSS

---

*开始您的茶叶网站开发之旅吧！* 🍃 