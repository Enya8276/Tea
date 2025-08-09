# 🍃 茶韵雅集 - 茶文化电商网站

> 传承千年茶文化，品味东方茶韵

## 📖 项目简介

茶韵雅集是一个现代化的茶叶电商网站，专注于传播中国茶文化和销售优质茶叶茶具。网站融合了传统茶文化与现代电商体验，为用户提供了完整的在线购茶和学习茶文化的平台。

## ✨ 主要功能

### 🛍️ 电商功能
- **产品展示** - 茶叶和茶具的详细展示
- **购物车** - 完整的购物车管理系统
- **用户系统** - 注册、登录、个人中心
- **订单管理** - 订单历史和状态跟踪
- **结算系统** - 完整的支付流程
- **搜索功能** - 智能搜索和筛选

### 📚 文化内容
- **茶文化介绍** - 深度的茶文化知识
- **六大茶类** - 详细的茶类分类和介绍
- **泡茶技巧** - 专业的泡茶指导
- **茶具知识** - 传统茶具的介绍和使用

### 🎨 用户体验
- **响应式设计** - 支持各种设备
- **深色模式** - 护眼的深色主题
- **动画效果** - 流畅的交互体验
- **国际化** - 中英文双语支持

## 🛠️ 技术栈

### 前端技术
- **Next.js 14** - React 框架，支持 App Router
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 现代化的 CSS 框架
- **Framer Motion** - 动画库
- **Heroicons** - 图标库

### 后端服务
- **Supabase** - 数据库和认证服务
- **PostgreSQL** - 关系型数据库
- **实时功能** - Supabase 实时订阅

### 状态管理
- **React Context** - 购物车状态管理
- **React Hooks** - 组件状态管理

### 部署平台
- **Netlify** - 静态网站部署
- **GitHub** - 代码版本控制

## 🏗️ 项目结构

```
tea-culture-website/
├── app/                    # Next.js App Router 页面
│   ├── auth/              # 用户认证页面
│   ├── cart/              # 购物车页面
│   ├── checkout/          # 结算页面
│   ├── tea/               # 茶叶产品页面
│   ├── teaware/           # 茶具产品页面
│   ├── culture/           # 茶文化页面
│   ├── brewing/           # 泡茶技巧页面
│   ├── about/             # 关于我们页面
│   ├── search/            # 搜索结果页面
│   ├── profile/           # 个人中心页面
│   ├── orders/            # 订单页面
│   └── layout.tsx         # 全局布局
├── components/            # React 组件
│   ├── home/             # 首页组件
│   ├── tea/              # 茶叶相关组件
│   ├── teaware/          # 茶具相关组件
│   ├── cart/             # 购物车组件
│   ├── auth/             # 认证组件
│   ├── layout/           # 布局组件
│   └── ui/               # 通用 UI 组件
├── lib/                  # 工具库
│   └── supabase.ts       # Supabase 配置
├── public/               # 静态资源
└── styles/               # 样式文件
```

## 🚀 本地开发

### 环境要求
- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/tea-culture-website.git
cd tea-culture-website
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
创建 `.env.local` 文件：
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_NAME=茶韵雅集
NEXT_PUBLIC_SITE_DESCRIPTION=传承千年茶文化，品味东方茶韵
```

4. **初始化数据库**
执行 SQL 脚本：
- `tea-website-schema.sql` - 创建数据库表
- `sample-data.sql` - 插入示例数据

5. **启动开发服务器**
```bash
npm run dev
```

访问 `http://localhost:3000` 查看网站。

## 📦 部署指南

### Netlify 部署

1. **构建命令**: `npm run build`
2. **发布目录**: `out` (如果使用静态导出)
3. **环境变量**: 在 Netlify 后台配置相同的环境变量

### 环境变量配置
确保在生产环境中配置以下变量：
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📊 数据库设计

### 核心表结构
- **tea_categories** - 茶叶分类
- **tea_products** - 茶叶产品
- **teaware_categories** - 茶具分类
- **teaware_products** - 茶具产品
- **customers** - 客户信息
- **orders** - 订单记录
- **order_items** - 订单详情

## 🎯 特色功能

### 1. 智能搜索
- 支持中英文搜索
- 实时搜索建议
- 分类筛选

### 2. 购物体验
- 直观的购物车界面
- 实时价格计算
- 简化的结算流程

### 3. 文化传播
- 丰富的茶文化内容
- 专业的泡茶指导
- 传统茶具介绍

### 4. 用户体验
- 响应式设计
- 深色模式支持
- 流畅的动画效果

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目！

### 开发规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 代码规范
- 编写清晰的组件注释
- 保持代码整洁和可维护性

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **网站**: [茶韵雅集](https://your-website-url.netlify.app)
- **邮箱**: contact@teaculture.com
- **GitHub**: [项目仓库](https://github.com/your-username/tea-culture-website)

## 🙏 致谢

感谢所有为中国茶文化传承做出贡献的人们，以及为本项目提供技术支持的开源社区。

---

**茶韵雅集** - 让世界感受中国茶文化的魅力 🍃