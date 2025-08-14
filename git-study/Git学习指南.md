# Git学习指南

基于Pro Git教程的系统性Git学习文档，专注于实用技能和最佳实践。

## 目录

1. [Git基础](#git基础)
2. [Git分支](#git分支)
3. [GitHub使用](#github使用)
4. [自定义Git](#自定义git)

---

## Git基础

### 1.1 Git简介

Git是一个分布式版本控制系统，用于跟踪文件的变化并协调多人协作开发。

**核心概念：**
- **仓库（Repository）**：存储项目文件和版本历史的地方
- **工作区（Working Directory）**：当前正在编辑的文件
- **暂存区（Staging Area）**：准备提交的文件快照
- **提交（Commit）**：项目在某个时间点的快照

### 1.2 Git安装和配置

```bash
# 配置用户信息
git config --global user.name "你的姓名"
git config --global user.email "你的邮箱"

# 查看配置
git config --list
```

### 1.3 创建仓库

```bash
# 初始化新仓库
git init

# 克隆现有仓库
git clone <仓库URL>
```

### 1.4 基本工作流程

```bash
# 查看文件状态
git status

# 添加文件到暂存区
git add <文件名>          # 添加单个文件
git add .               # 添加所有文件

# 提交更改
git commit -m "提交信息"

# 查看提交历史
git log
git log --oneline       # 简洁格式
```

### 1.5 文件操作

```bash
# 查看文件差异
git diff                # 工作区与暂存区的差异
git diff --staged       # 暂存区与最后提交的差异

# 撤销更改
git checkout -- <文件名>  # 撤销工作区更改
git reset HEAD <文件名>   # 取消暂存
git reset --hard HEAD    # 重置到最后提交状态

# 删除文件
git rm <文件名>
git rm --cached <文件名>  # 仅从Git中删除，保留本地文件
```

### 1.6 .gitignore文件

创建`.gitignore`文件来忽略不需要版本控制的文件：

```
# 忽略所有.log文件
*.log

# 忽略node_modules目录
node_modules/

# 忽略特定文件
config.env
```

---

## Git分支

### 2.1 分支概念

分支是Git最强大的功能之一，允许你在不影响主代码的情况下开发新功能。

### 2.2 分支基本操作

```bash
# 查看分支
git branch              # 查看本地分支
git branch -r           # 查看远程分支
git branch -a           # 查看所有分支

# 创建分支
git branch <分支名>

# 切换分支
git checkout <分支名>
git switch <分支名>      # Git 2.23+新命令

# 创建并切换到新分支
git checkout -b <分支名>
git switch -c <分支名>   # Git 2.23+新命令

# 删除分支
git branch -d <分支名>   # 删除已合并的分支
git branch -D <分支名>   # 强制删除分支
```

### 2.3 分支合并

```bash
# 合并分支（Fast-forward）
git checkout main
git merge <分支名>

# 创建合并提交
git merge --no-ff <分支名>

# 变基合并
git rebase <目标分支>
```

### 2.4 解决合并冲突

当合并时出现冲突：

1. Git会标记冲突文件
2. 手动编辑冲突文件，选择保留的内容
3. 添加解决后的文件到暂存区
4. 提交合并

```bash
# 查看冲突文件
git status

# 解决冲突后
git add <冲突文件>
git commit
```

### 2.5 分支工作流

**Git Flow工作流：**
- `main`：主分支，稳定版本
- `develop`：开发分支
- `feature/*`：功能分支
- `release/*`：发布分支
- `hotfix/*`：热修复分支

**GitHub Flow工作流：**
- `main`：主分支
- `feature/*`：功能分支
- 通过Pull Request合并

---

## GitHub使用

### 3.1 远程仓库操作

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin <仓库URL>

# 推送到远程仓库
git push origin <分支名>
git push -u origin main  # 设置上游分支

# 从远程仓库拉取
git fetch origin         # 获取更新但不合并
git pull origin <分支名>  # 获取并合并
```

### 3.2 Fork和Pull Request

**贡献开源项目流程：**

1. **Fork项目**：在GitHub上点击Fork按钮
2. **克隆Fork的仓库**：
   ```bash
   git clone <你的fork仓库URL>
   ```
3. **添加上游仓库**：
   ```bash
   git remote add upstream <原始仓库URL>
   ```
4. **创建功能分支**：
   ```bash
   git checkout -b feature/new-feature
   ```
5. **开发并提交**：
   ```bash
   git add .
   git commit -m "添加新功能"
   ```
6. **推送到你的Fork**：
   ```bash
   git push origin feature/new-feature
   ```
7. **创建Pull Request**：在GitHub上创建PR

### 3.3 保持Fork同步

```bash
# 获取上游更新
git fetch upstream

# 切换到主分支
git checkout main

# 合并上游更改
git merge upstream/main

# 推送到你的Fork
git push origin main
```

### 3.4 GitHub功能

- **Issues**：问题跟踪和讨论
- **Projects**：项目管理看板
- **Actions**：CI/CD自动化
- **Releases**：版本发布管理
- **Wiki**：项目文档

---

## 自定义Git

### 4.1 Git配置

```bash
# 全局配置
git config --global core.editor "code --wait"  # 设置编辑器
git config --global init.defaultBranch main    # 设置默认分支名

# 本地配置（仅当前仓库）
git config user.name "项目特定用户名"

# 查看配置
git config --list
git config user.name
```

### 4.2 Git别名

```bash
# 设置常用别名
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# 使用别名
git co main
git st
```

### 4.3 Git钩子（Hooks）

钩子是在Git操作的特定时刻自动执行的脚本。

**常用钩子：**
- `pre-commit`：提交前执行
- `post-commit`：提交后执行
- `pre-push`：推送前执行

**示例：pre-commit钩子**

在`.git/hooks/pre-commit`文件中：

```bash
#!/bin/sh
# 运行代码检查
npm run lint
if [ $? -ne 0 ]; then
    echo "代码检查失败，请修复后再提交"
    exit 1
fi
```

### 4.4 Git属性

在`.gitattributes`文件中定义文件属性：

```
# 设置行结束符
*.txt text eol=lf

# 二进制文件
*.png binary

# 自定义合并策略
*.generated merge=ours
```

### 4.5 有用的Git命令

```bash
# 交互式暂存
git add -i

# 部分暂存文件
git add -p

# 修改最后一次提交
git commit --amend

# 查看某个文件的修改历史
git log -p <文件名>

# 查找引入bug的提交
git bisect start
git bisect bad          # 标记当前提交为坏的
git bisect good <提交>   # 标记某个提交为好的

# 暂存当前工作
git stash
git stash pop           # 恢复暂存的工作
git stash list          # 查看暂存列表

# 标签管理
git tag v1.0            # 创建轻量标签
git tag -a v1.0 -m "版本1.0"  # 创建注释标签
git push origin --tags  # 推送标签
```

---

## 最佳实践

### 提交信息规范

```
类型(范围): 简短描述

详细描述（可选）

相关Issue: #123
```

**常用类型：**
- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

### 分支命名规范

- `feature/功能名称`
- `bugfix/问题描述`
- `hotfix/紧急修复`
- `release/版本号`

### 常见问题解决

**撤销提交：**
```bash
git revert <提交哈希>     # 安全的撤销方式
git reset --hard HEAD~1  # 危险：完全删除提交
```

**修改提交历史：**
```bash
git rebase -i HEAD~3     # 交互式变基最近3个提交
```

**恢复删除的文件：**
```bash
git checkout HEAD -- <文件名>
```

---

## 总结

Git是现代软件开发不可或缺的工具。掌握以上内容，你就能够：

1. 有效管理代码版本
2. 与团队协作开发
3. 参与开源项目
4. 自定义Git以提高工作效率

记住：多练习是掌握Git的关键。从简单的个人项目开始，逐步应用更高级的功能。

**推荐学习资源：**
- [Pro Git官方文档](https://git-scm.com/book/zh/v2)
- [GitHub官方指南](https://guides.github.com/)
- [Git可视化学习](https://learngitbranching.js.org/)

---

*本文档基于Pro Git教程整理，专注于实用技能和最佳实践。*