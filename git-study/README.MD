# Git 学习笔记

基于 Pro Git 文档的完整 Git 命令学习指南

## 目录

- [Git 专业术语解释](#git-专业术语解释)
- [1. Git 基础配置](#1-git-基础配置)
- [2. 仓库管理](#2-仓库管理)
- [3. 文件状态管理](#3-文件状态管理)
- [4. 提交管理](#4-提交管理)
- [5. 分支管理](#5-分支管理)
- [6. 远程仓库](#6-远程仓库)
- [7. 标签管理](#7-标签管理)
- [8. 历史查看](#8-历史查看)
- [9. 撤销操作](#9-撤销操作)
- [10. 合并与变基](#10-合并与变基)
- [11. 储藏功能](#11-储藏功能)
- [12. 高级功能](#12-高级功能)
- [常用工作流程](#常用工作流程)
- [配置文件示例](#配置文件示例)
- [故障排除](#故障排除)

---

## Git 专业术语解释

### 基础概念

**工作目录（Working Directory）**
- 你当前正在工作的目录，包含项目文件的实际副本
- 这里的文件可以被编辑、修改和删除
- 是你能直接看到和操作的文件系统中的目录

**暂存区（Staging Area / Index）**
- 也称为索引（Index），是一个临时存储区域
- 用于存放下次提交时要包含的文件快照
- 通过 `git add` 命令将文件从工作目录添加到暂存区
- 可以选择性地暂存文件的部分更改

**仓库（Repository）**
- Git 存储项目历史记录和元数据的地方
- 包含所有提交、分支、标签等信息
- 分为本地仓库和远程仓库

**裸仓库（Bare Repository）**
- 没有工作目录的 Git 仓库
- 只包含 Git 数据，不包含项目文件的检出副本
- 通常用作远程仓库，供多人协作时推送和拉取代码
- 使用 `git init --bare` 创建

### 版本控制概念

**HEAD**
- 指向当前分支最新提交的指针
- 可以理解为"你现在在哪里"的标记
- `HEAD~1` 表示当前提交的父提交，`HEAD~2` 表示祖父提交
- `HEAD^` 也表示父提交，`HEAD^^` 表示祖父提交

**提交（Commit）**
- 项目在某个时间点的快照
- 包含文件内容、作者信息、时间戳和提交信息
- 每个提交都有唯一的哈希值（SHA-1）标识

**分支（Branch）**
- 指向特定提交的可移动指针
- 允许并行开发不同的功能
- 默认分支通常是 `main` 或 `master`

**标签（Tag）**
- 指向特定提交的固定引用
- 通常用于标记发布版本
- 分为轻量标签和带注释的标签

### 操作概念

**变基（Rebase）**
- 将一系列提交移动到新的基础提交上
- 可以创建更线性、清晰的提交历史
- 与合并（merge）不同，变基会重写提交历史
- 使用 `git rebase` 命令执行

**快进合并（Fast-forward）**
- 当目标分支是当前分支的直接后继时发生的合并
- 不会创建新的合并提交，只是移动分支指针
- 保持线性的提交历史

**三路合并（Three-way Merge）**
- 当两个分支有分歧时进行的合并
- 会创建一个新的合并提交，有两个父提交
- 合并提交包含两个分支的更改

**冲突（Conflict）**
- 当 Git 无法自动合并两个分支的更改时发生
- 需要手动解决冲突后才能完成合并
- 通常发生在同一文件的同一部分被不同分支修改时

### 远程操作概念

**远程仓库（Remote Repository）**
- 托管在网络上的 Git 仓库
- 用于团队协作和代码备份
- 常见的远程仓库服务有 GitHub、GitLab、Bitbucket 等

**克隆（Clone）**
- 从远程仓库创建本地副本的过程
- 包含完整的项目历史和所有分支信息

**推送（Push）**
- 将本地提交上传到远程仓库
- 更新远程仓库的分支指针

**拉取（Pull）**
- 从远程仓库获取最新更改并合并到当前分支
- 相当于 `git fetch` + `git merge` 的组合

**获取（Fetch）**
- 从远程仓库下载最新的提交和分支信息
- 不会自动合并到当前分支，需要手动合并

### 其他重要概念

**储藏（Stash）**
- 临时保存工作目录和暂存区的更改
- 允许快速切换分支而不丢失未完成的工作
- 使用 `git stash` 命令管理

**子模块（Submodule）**
- 在一个 Git 仓库中包含另一个 Git 仓库
- 用于管理项目依赖或共享代码库

**钩子（Hook）**
- Git 在特定事件发生时自动执行的脚本
- 可用于自动化测试、代码检查、部署等任务

---

## 1. Git 基础配置

### 1.1 git config

配置 Git 的用户信息和行为设置。

**语法：**
```bash
git config [--global|--system|--local] <key> <value>
```

**常用选项：**
- `--global`: 全局配置（用户级别）
- `--system`: 系统配置（系统级别）
- `--local`: 本地配置（仓库级别，默认）
- `--list`: 列出所有配置
- `--unset`: 删除配置项

**示例：**
```bash
# 设置用户名和邮箱（全局）
git config --global user.name "张三"
git config --global user.email "zhangsan@example.com"

# 设置默认编辑器
git config --global core.editor vim

# 设置默认分支名
git config --global init.defaultBranch main

# 查看所有配置
git config --list

# 查看特定配置
git config user.name

# 删除配置
git config --global --unset user.name
```

---

## 2. 仓库管理

### 2.1 git init

初始化一个新的 Git 仓库。

**语法：**
```bash
git init [directory]
```

**常用选项：**
- `--bare`: 创建裸仓库（无工作目录）
- `--template=<template_directory>`: 使用模板目录
- `--initial-branch=<branch-name>`: 设置初始分支名

**示例：**
```bash
# 在当前目录初始化仓库
git init

# 在指定目录初始化仓库
git init my-project

# 创建裸仓库
git init --bare my-repo.git

# 指定初始分支名
git init --initial-branch=main
```

### 2.2 git clone

克隆远程仓库到本地。

**语法：**
```bash
git clone <repository> [directory]
```

**常用选项：**
- `--depth <depth>`: 浅克隆，只获取指定深度的历史
- `--branch <branch>`: 克隆指定分支
- `--single-branch`: 只克隆指定分支
- `--recursive`: 递归克隆子模块

**示例：**
```bash
# 克隆仓库
git clone https://github.com/user/repo.git

# 克隆到指定目录
git clone https://github.com/user/repo.git my-repo

# 浅克隆（只获取最近10次提交）
git clone --depth 10 https://github.com/user/repo.git

# 克隆指定分支
git clone --branch develop https://github.com/user/repo.git

# 克隆包含子模块
git clone --recursive https://github.com/user/repo.git
```

---

## 3. 文件状态管理

### 3.1 git status

查看工作目录和暂存区的状态。

**语法：**
```bash
git status [options]
```

**常用选项：**
- `-s, --short`: 简洁输出格式
- `-b, --branch`: 显示分支信息
- `--porcelain`: 机器可读格式
- `--ignored`: 显示被忽略的文件

**示例：**
```bash
# 查看状态
git status

# 简洁格式
git status -s

# 显示分支信息
git status -b

# 显示被忽略的文件
git status --ignored
```

### 3.2 git add

将文件添加到暂存区（Staging Area）。

**什么是暂存区？**
暂存区是 Git 的一个重要概念，它是工作目录和仓库之间的缓冲区。当你修改文件后，需要先将更改添加到暂存区，然后才能提交到仓库。这种设计允许你精确控制每次提交包含哪些更改。

**语法：**
```bash
git add <pathspec>...
```

**常用选项：**
- `-A, --all`: 添加所有文件（包括删除的文件）
- `-u, --update`: 只添加已跟踪的文件
- `-p, --patch`: 交互式添加
- `-n, --dry-run`: 预览操作，不实际执行
- `-f, --force`: 强制添加被忽略的文件

**示例：**
```bash
# 添加单个文件
git add file.txt

# 添加多个文件
git add file1.txt file2.txt

# 添加所有文件
git add .
git add --all

# 只添加已跟踪的文件
git add -u

# 交互式添加
git add -p

# 添加目录
git add src/

# 预览添加操作
git add -n .
```

### 3.3 git rm

从工作目录和暂存区删除文件。

**语法：**
```bash
git rm <file>...
```

**常用选项：**
- `-f, --force`: 强制删除
- `-r`: 递归删除目录
- `--cached`: 只从暂存区删除，保留工作目录文件
- `-n, --dry-run`: 预览操作

**示例：**
```bash
# 删除文件
git rm file.txt

# 删除目录
git rm -r directory/

# 只从暂存区删除
git rm --cached file.txt

# 强制删除
git rm -f file.txt

# 预览删除操作
git rm -n file.txt
```

### 3.4 git mv

移动或重命名文件。

**语法：**
```bash
git mv <source> <destination>
```

**示例：**
```bash
# 重命名文件
git mv old_name.txt new_name.txt

# 移动文件到目录
git mv file.txt directory/

# 移动并重命名
git mv src/old.txt dest/new.txt
```
---

## 4. 提交管理

### 4.1 git commit

提交暂存区的更改。

**语法：**
```bash
git commit [options]
```

**常用选项：**
- `-m <message>`: 指定提交信息
- `-a, --all`: 自动暂存已跟踪文件的更改
- `--amend`: 修改最后一次提交
- `-v, --verbose`: 显示详细的差异信息
- `-s, --signoff`: 添加签名
- `--no-edit`: 不编辑提交信息

**示例：**
```bash
# 提交并指定信息
git commit -m "添加新功能"

# 自动暂存并提交
git commit -am "修复bug"

# 修改最后一次提交
git commit --amend -m "修正提交信息"

# 修改最后一次提交但不改变信息
git commit --amend --no-edit

# 详细提交
git commit -v

# 添加签名
git commit -s -m "提交信息"
```

---

## 5. 分支管理

### 5.1 git branch

管理分支。

**语法：**
```bash
git branch [options] [branch-name]
```

**常用选项：**
- `-a, --all`: 显示所有分支（本地和远程）
- `-r, --remotes`: 显示远程分支
- `-d, --delete`: 删除分支
- `-D`: 强制删除分支
- `-m, --move`: 重命名分支
- `-c, --copy`: 复制分支
- `-v, --verbose`: 显示详细信息
- `--merged`: 显示已合并的分支
- `--no-merged`: 显示未合并的分支

**示例：**
```bash
# 列出本地分支
git branch

# 列出所有分支
git branch -a

# 创建新分支
git branch feature-branch

# 删除分支
git branch -d feature-branch

# 强制删除分支
git branch -D feature-branch

# 重命名分支
git branch -m old-name new-name

# 显示详细信息
git branch -v

# 显示已合并的分支
git branch --merged

# 显示未合并的分支
git branch --no-merged
```

### 5.2 git checkout

切换分支或恢复文件。

**语法：**
```bash
git checkout [options] <branch|commit|file>
```

**常用选项：**
- `-b`: 创建并切换到新分支
- `-B`: 强制创建并切换到新分支
- `-t, --track`: 设置跟踪关系
- `-f, --force`: 强制切换
- `--`: 分隔符，后面跟文件路径

**示例：**
```bash
# 切换分支
git checkout main

# 创建并切换到新分支
git checkout -b feature-branch

# 基于远程分支创建本地分支
git checkout -b local-branch origin/remote-branch

# 切换到特定提交
git checkout abc1234

# 恢复文件到最后提交状态
git checkout -- file.txt

# 恢复目录下所有文件
git checkout -- .

# 强制切换分支
git checkout -f branch-name
```

### 5.3 git switch

切换分支（Git 2.23+ 新命令）。

**语法：**
```bash
git switch [options] <branch>
```

**常用选项：**
- `-c, --create`: 创建并切换到新分支
- `-C, --force-create`: 强制创建并切换到新分支
- `-d, --detach`: 分离HEAD状态
- `-f, --force`: 强制切换

**示例：**
```bash
# 切换分支
git switch main

# 创建并切换到新分支
git switch -c feature-branch

# 切换到远程分支
git switch -c local-branch origin/remote-branch

# 分离HEAD状态
git switch --detach HEAD~2
```

### 5.4 git restore

恢复文件（Git 2.23+ 新命令）。

**语法：**
```bash
git restore [options] <pathspec>
```

**常用选项：**
- `-s, --source`: 指定恢复源
- `-S, --staged`: 恢复暂存区
- `-W, --worktree`: 恢复工作目录

**示例：**
```bash
# 恢复工作目录文件
git restore file.txt

# 恢复暂存区文件
git restore --staged file.txt

# 从特定提交恢复
git restore --source=HEAD~2 file.txt

# 恢复所有文件
git restore .
```

---

## 6. 远程仓库

### 6.1 git remote

管理远程仓库。

**语法：**
```bash
git remote [options] [command]
```

**常用选项和命令：**
- `add <name> <url>`: 添加远程仓库
- `remove <name>`: 删除远程仓库
- `rename <old> <new>`: 重命名远程仓库
- `set-url <name> <url>`: 修改远程仓库URL
- `show <name>`: 显示远程仓库详细信息
- `-v, --verbose`: 显示详细信息

**示例：**
```bash
# 列出远程仓库
git remote
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 删除远程仓库
git remote remove origin

# 重命名远程仓库
git remote rename origin upstream

# 修改远程仓库URL
git remote set-url origin https://github.com/user/new-repo.git

# 显示远程仓库详细信息
git remote show origin
```

### 6.2 git fetch

从远程仓库获取数据。

**语法：**
```bash
git fetch [options] [repository] [refspec]
```

**常用选项：**
- `--all`: 获取所有远程仓库
- `--prune`: 删除远程已删除的分支引用
- `--depth <depth>`: 浅获取
- `--tags`: 获取标签
- `--no-tags`: 不获取标签

**示例：**
```bash
# 获取默认远程仓库数据
git fetch

# 获取指定远程仓库
git fetch origin

# 获取所有远程仓库
git fetch --all

# 获取并清理远程分支引用
git fetch --prune

# 获取指定分支
git fetch origin main

# 获取标签
git fetch --tags
```

### 6.3 git pull

从远程仓库获取并合并数据。

**语法：**
```bash
git pull [options] [repository] [refspec]
```

**常用选项：**
- `--rebase`: 使用变基而不是合并
- `--no-rebase`: 使用合并（默认）
- `--ff-only`: 只允许快进合并
- `--no-ff`: 禁用快进合并
- `--squash`: 压缩合并

**示例：**
```bash
# 拉取并合并
git pull

# 拉取指定远程仓库和分支
git pull origin main

# 使用变基
git pull --rebase

# 只允许快进合并
git pull --ff-only

# 拉取所有分支
git pull --all
```

### 6.4 git push

推送数据到远程仓库。

**语法：**
```bash
git push [options] [repository] [refspec]
```

**常用选项：**
- `-u, --set-upstream`: 设置上游分支
- `--all`: 推送所有分支
- `--tags`: 推送标签
- `--force`: 强制推送
- `--force-with-lease`: 安全的强制推送
- `--delete`: 删除远程分支

**示例：**
```bash
# 推送当前分支
git push

# 推送并设置上游分支
git push -u origin main

# 推送指定分支
git push origin feature-branch

# 推送所有分支
git push --all

# 推送标签
git push --tags

# 强制推送
git push --force

# 安全的强制推送
git push --force-with-lease

# 删除远程分支
git push origin --delete feature-branch
```

---

## 7. 标签管理

### 7.1 git tag

管理标签。

**语法：**
```bash
git tag [options] [tagname] [commit]
```

**常用选项：**
- `-a, --annotate`: 创建带注释的标签
- `-m <message>`: 指定标签信息
- `-d, --delete`: 删除标签
- `-l, --list`: 列出标签
- `-f, --force`: 强制创建标签
- `-s, --sign`: 创建GPG签名标签

**示例：**
```bash
# 列出所有标签
git tag
git tag -l

# 列出匹配模式的标签
git tag -l "v1.*"

# 创建轻量标签
git tag v1.0

# 创建带注释的标签
git tag -a v1.0 -m "版本 1.0"

# 为特定提交创建标签
git tag -a v0.9 abc1234 -m "版本 0.9"

# 删除标签
git tag -d v1.0

# 推送标签到远程
git push origin v1.0

# 推送所有标签
git push origin --tags

# 删除远程标签
git push origin --delete v1.0
```

---

## 8. 历史查看

### 8.1 git log

查看提交历史。

**语法：**
```bash
git log [options] [revision range] [path]
```

**常用选项：**
- `--oneline`: 单行显示
- `--graph`: 图形化显示
- `--all`: 显示所有分支
- `--decorate`: 显示分支和标签
- `-p, --patch`: 显示差异
- `--stat`: 显示统计信息
- `--shortstat`: 显示简短统计
- `--pretty=<format>`: 自定义格式
- `--since=<date>`: 指定开始日期
- `--until=<date>`: 指定结束日期
- `--author=<pattern>`: 按作者过滤
- `--grep=<pattern>`: 按提交信息过滤
- `-n <number>`: 限制显示数量

**示例：**
```bash
# 查看提交历史
git log

# 单行显示
git log --oneline

# 图形化显示
git log --graph --oneline --all

# 显示差异
git log -p

# 显示统计信息
git log --stat

# 自定义格式
git log --pretty=format:"%h - %an, %ar : %s"

**--pretty=<format> 格式选项详解：**
- `%H`: 完整的提交哈希值
- `%h`: 简短的提交哈希值
- `%T`: 完整的树哈希值
- `%t`: 简短的树哈希值
- `%P`: 完整的父提交哈希值
- `%p`: 简短的父提交哈希值
- `%an`: 作者姓名
- `%ae`: 作者邮箱
- `%ad`: 作者日期（可用 --date= 选项定制格式）
- `%ar`: 作者日期，相对格式（如 "2 weeks ago"）
- `%cn`: 提交者姓名
- `%ce`: 提交者邮箱
- `%cd`: 提交日期
- `%cr`: 提交日期，相对格式
- `%s`: 提交信息标题
- `%b`: 提交信息正文
- `%f`: 提交信息标题，适合文件名
- `%d`: 引用名（如分支、标签）
- `%n`: 换行符
- `%x00`: 空字符
- `%%`: 百分号字面值

**格式示例：**
```bash
# 显示简短哈希、作者和标题
git log --pretty=format:"%h %an: %s"

# 显示详细信息
git log --pretty=format:"%H%n作者: %an <%ae>%n日期: %ad%n%n%s%n%b" --date=short

# 单行格式，包含分支信息
git log --pretty=format:"%h %d %s (%cr) <%an>" --graph
```

```bash
# 按时间过滤
git log --since="2023-01-01" --until="2023-12-31"

# 按作者过滤
git log --author="张三"

# 按提交信息过滤
git log --grep="修复"

# 限制显示数量
git log -10

# 查看特定文件的历史
git log -- file.txt
```

### 8.2 git show

显示提交详细信息。

**语法：**
```bash
git show [options] [object]
```

**常用选项：**
- `--stat`: 显示统计信息
- `--name-only`: 只显示文件名
- `--name-status`: 显示文件名和状态
- `--pretty=<format>`: 自定义格式

**示例：**
```bash
# 显示最新提交
git show

# 显示特定提交
git show abc1234

# 显示统计信息
git show --stat

# 只显示文件名
git show --name-only

# 显示标签信息
git show v1.0
```

### 8.3 git diff

显示差异。

**语法：**
```bash
git diff [options] [commit] [commit] [path]
```

**常用选项：**
- `--cached`: 比较暂存区和最后提交
- `--staged`: 同 --cached
- `--name-only`: 只显示文件名
- `--name-status`: 显示文件名和状态
- `--stat`: 显示统计信息
- `--word-diff`: 按单词显示差异

**示例：**
```bash
# 比较工作目录和暂存区
git diff

# 比较暂存区和最后提交
git diff --cached

# 比较工作目录和最后提交
git diff HEAD

# 比较两个提交
git diff abc1234 def5678

# 比较两个分支
git diff main feature-branch

# 比较特定文件
git diff file.txt

# 只显示文件名
git diff --name-only

# 显示统计信息
git diff --stat
```

---

## 9. 撤销操作

### 9.1 git reset

重置当前分支到指定状态。

**语法：**
```bash
git reset [options] [commit]
```

**常用选项：**
- `--soft`: 只移动HEAD指针，保留暂存区和工作目录的内容
- `--mixed`: 移动HEAD指针并重置暂存区，但保留工作目录（默认模式）
- `--hard`: 移动HEAD指针并重置暂存区和工作目录，**危险操作，会丢失未提交的更改**
- `--keep`: 重置但保留本地更改

**HEAD指针说明：**
- `HEAD`: 当前分支的最新提交
- `HEAD~1` 或 `HEAD^`: 当前提交的父提交（上一个提交）
- `HEAD~2`: 当前提交的祖父提交（上两个提交）
- `HEAD~n`: 当前提交往前数第n个提交

**示例：**
```bash
# 软重置到上一个提交
git reset --soft HEAD~1

# 混合重置到上一个提交
git reset HEAD~1
git reset --mixed HEAD~1

# 硬重置到上一个提交
git reset --hard HEAD~1

# 重置到特定提交
git reset --hard abc1234

# 重置特定文件
git reset file.txt

# 重置暂存区
git reset
```

### 9.2 git revert

创建新提交来撤销之前的提交。

**语法：**
```bash
git revert [options] <commit>
```

**常用选项：**
- `-n, --no-commit`: 不自动提交
- `-m <parent-number>`: 指定合并提交的父提交
- `--no-edit`: 不编辑提交信息

**示例：**
```bash
# 撤销最后一个提交
git revert HEAD

# 撤销特定提交
git revert abc1234

# 撤销但不自动提交
git revert -n HEAD

# 撤销合并提交
git revert -m 1 abc1234

# 撤销多个提交
git revert HEAD~3..HEAD
```

### 9.3 git clean

清理未跟踪的文件。

**语法：**
```bash
git clean [options]
```

**常用选项：**
- `-f, --force`: 强制删除
- `-d`: 删除目录
- `-n, --dry-run`: 预览操作
- `-i, --interactive`: 交互式清理
- `-x`: 删除被忽略的文件
- `-X`: 只删除被忽略的文件

**示例：**
```bash
# 预览清理操作
git clean -n

# 清理未跟踪的文件
git clean -f

# 清理未跟踪的文件和目录
git clean -fd

# 交互式清理
git clean -i

# 清理包括被忽略的文件
git clean -fx
```

---

## 10. 合并与变基

### 10.1 git merge

合并分支。

**语法：**
```bash
git merge [options] <commit>
```

**常用选项：**
- `--no-ff`: 禁用快进合并，强制创建合并提交
- `--ff-only`: 只允许快进合并，如果不能快进则失败
- `--squash`: 压缩合并，将目标分支的所有提交压缩成一个提交
- `-m <message>`: 指定合并信息
- `--abort`: 中止合并操作
- `--continue`: 解决冲突后继续合并

**快进合并（Fast-forward）说明：**
当目标分支是当前分支的直接后继时，Git 默认会进行快进合并。这种合并不会创建新的合并提交，只是简单地移动分支指针。如果你想保留分支的合并历史，可以使用 `--no-ff` 选项强制创建合并提交。

**示例：**
```bash
# 合并分支
git merge feature-branch

# 禁用快进合并
git merge --no-ff feature-branch

# 只允许快进合并
git merge --ff-only feature-branch

# 压缩合并
git merge --squash feature-branch

# 指定合并信息
git merge -m "合并功能分支" feature-branch

# 中止合并
git merge --abort

# 继续合并
git merge --continue
```

### 10.2 git rebase

变基操作（Rebase）- 将一系列提交移动到新的基础提交上。

**什么是变基？**
变基是将当前分支的提交"重新播放"到另一个分支的最新提交之上。与合并不同，变基会重写提交历史，创建一个更线性、清晰的项目历史。

**变基 vs 合并的区别：**

- **合并（merge）**：保留原有的分支结构，创建合并提交
- **变基（rebase）**：重写提交历史，将提交移动到新的基础上，不创建合并提交

**注意事项：**

- 不要对已经推送到公共仓库的提交进行变基
- 变基会改变提交的哈希值，因为它实际上是重新创建提交

**语法：**

```bash
git rebase [options] [upstream] [branch]
```

**常用选项：**
- `-i, --interactive`: 交互式变基
- `--onto <newbase>`: 指定新基点
- `--continue`: 继续变基
- `--abort`: 中止变基
- `--skip`: 跳过当前提交
- `--root`: 变基到根提交

**示例：**
```bash
# 变基到主分支
git rebase main

# 交互式变基
git rebase -i HEAD~3

# 变基到指定基点
git rebase --onto main feature-base feature-branch

# 继续变基
git rebase --continue

# 中止变基
git rebase --abort

# 跳过当前提交
git rebase --skip
```

---

## 11. 储藏功能

### 11.1 git stash

储藏（Stash）当前工作 - 临时保存工作目录和暂存区的更改。

**什么是储藏？**
储藏是 Git 提供的一个功能，用于临时保存当前工作目录和暂存区中的更改，而不需要创建提交。这在你需要快速切换分支但当前工作还没完成时非常有用。储藏的内容可以在任何时候重新应用到工作目录中。

**使用场景：**
- 需要紧急切换到其他分支处理问题
- 当前工作进行到一半，还不适合提交
- 需要拉取远程更新，但本地有未提交的更改

**语法：**
```bash
git stash [options] [command]
```

**常用命令和选项：**
- `push`: 储藏更改（默认）
- `pop`: 应用并删除最新储藏
- `apply`: 应用储藏但不删除
- `list`: 列出所有储藏
- `show`: 显示储藏内容
- `drop`: 删除储藏
- `clear`: 清空所有储藏
- `-u, --include-untracked`: 包含未跟踪文件
- `-a, --all`: 包含所有文件
- `-m <message>`: 指定储藏信息

**示例：**
```bash
# 储藏当前更改
git stash
git stash push

# 储藏并指定信息
git stash push -m "临时储藏"

# 储藏包含未跟踪文件
git stash -u

# 储藏所有文件
git stash -a

# 列出储藏
git stash list

# 应用最新储藏
git stash pop

# 应用指定储藏
git stash apply stash@{1}

# 显示储藏内容
git stash show
git stash show -p

# 删除储藏
git stash drop stash@{1}

# 清空所有储藏
git stash clear
```

---

## 12. 高级功能

### 12.1 git cherry-pick

挑选提交。

**语法：**
```bash
git cherry-pick [options] <commit>
```

**常用选项：**
- `-n, --no-commit`: 不自动提交
- `-x`: 添加原提交信息
- `--continue`: 继续挑选
- `--abort`: 中止挑选
- `--skip`: 跳过当前提交

**示例：**
```bash
# 挑选单个提交
git cherry-pick abc1234

# 挑选多个提交
git cherry-pick abc1234 def5678

# 挑选提交范围
git cherry-pick abc1234..def5678

# 挑选但不提交
git cherry-pick -n abc1234

# 继续挑选
git cherry-pick --continue

# 中止挑选
git cherry-pick --abort
```

### 12.2 git bisect

二分查找问题提交。

**语法：**
```bash
git bisect <command> [options]
```

**常用命令：**
- `start`: 开始二分查找
- `bad`: 标记当前提交为坏的
- `good`: 标记当前提交为好的
- `reset`: 结束二分查找
- `skip`: 跳过当前提交

**示例：**
```bash
# 开始二分查找
git bisect start

# 标记当前提交为坏的
git bisect bad

# 标记特定提交为好的
git bisect good abc1234

# 跳过当前提交
git bisect skip

# 结束二分查找
git bisect reset
```

### 12.3 git blame

查看文件每行的最后修改信息。

**语法：**
```bash
git blame [options] <file>
```

**常用选项：**
- `-L <start>,<end>`: 指定行范围
- `-w`: 忽略空白字符
- `-M`: 检测移动的行
- `-C`: 检测复制的行

**示例：**
```bash
# 查看文件blame信息
git blame file.txt

# 查看指定行范围
git blame -L 10,20 file.txt

# 忽略空白字符
git blame -w file.txt
```

### 12.4 git archive

创建归档文件。

**语法：**
```bash
git archive [options] <tree-ish>
```

**常用选项：**
- `--format=<format>`: 指定格式（tar, zip等）
- `--output=<file>`: 指定输出文件
- `--prefix=<prefix>`: 添加路径前缀

**示例：**
```bash
# 创建tar归档
git archive --format=tar --output=project.tar HEAD

# 创建zip归档
git archive --format=zip --output=project.zip HEAD

# 添加前缀
git archive --prefix=project/ --format=tar HEAD
```

### 12.5 git submodule

管理子模块。

**语法：**
```bash
git submodule [options] <command>
```

**常用命令：**
- `add <repository> <path>`: 添加子模块
- `init`: 初始化子模块
- `update`: 更新子模块
- `sync`: 同步子模块URL
- `foreach <command>`: 在每个子模块执行命令

**示例：**
```bash
# 添加子模块
git submodule add https://github.com/user/repo.git lib/repo

# 初始化子模块
git submodule init

# 更新子模块
git submodule update

# 初始化并更新
git submodule update --init --recursive

# 在所有子模块执行命令
git submodule foreach git pull origin main
```

---

## 常用工作流程

### 基本工作流程
```bash
# 1. 克隆仓库
git clone https://github.com/user/repo.git
cd repo

# 2. 创建功能分支
git checkout -b feature-branch

# 3. 进行开发
# 编辑文件...

# 4. 添加和提交更改
git add .
git commit -m "添加新功能"

# 5. 推送分支
git push -u origin feature-branch

# 6. 合并到主分支
git checkout main
git merge feature-branch

# 7. 推送主分支
git push origin main

# 8. 删除功能分支
git branch -d feature-branch
git push origin --delete feature-branch
```

### 协作工作流程
```bash
# 1. 获取最新更改
git fetch origin
git pull origin main

# 2. 创建功能分支
git checkout -b feature-branch

# 3. 开发和提交
git add .
git commit -m "实现功能"

# 4. 变基到最新主分支
git fetch origin
git rebase origin/main

# 5. 推送分支
git push -u origin feature-branch

# 6. 创建Pull Request/Merge Request
# 在GitHub/GitLab等平台创建PR/MR

# 7. 合并后清理
git checkout main
git pull origin main
git branch -d feature-branch
```

---

## 配置文件示例

### .gitignore 文件
```bash
# 编译输出
*.o
*.exe
*.dll
*.so
*.dylib

# 依赖目录
node_modules/
vendor/

# 日志文件
*.log
logs/

# 临时文件
*.tmp
*.temp
.DS_Store
Thumbs.db

# IDE文件
.vscode/
.idea/
*.swp
*.swo

# 环境配置
.env
.env.local
```

### .gitconfig 全局配置示例
```ini
[user]
    name = 张三
    email = zhangsan@example.com

[core]
    editor = vim
    autocrlf = input
    quotepath = false
    ignorecase = false ;关闭勿略大小写

[init]
    defaultBranch = main

[pull]
    rebase = false

[push]
    default = simple

[alias]
    st = status
    co = checkout
    br = branch
    ci = commit
    lg = log --oneline --graph --all
    unstage = reset HEAD --
    last = log -1 HEAD
```

---

## 故障排除

### 常见问题和解决方案

1. **合并冲突**
```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add <resolved-file>
git commit
```

2. **撤销最后一次提交**
```bash
# 保留更改
git reset --soft HEAD~1

# 丢弃更改
git reset --hard HEAD~1
```

3. **恢复删除的文件**
```bash
# 从最后提交恢复
git checkout HEAD -- <file>

# 从特定提交恢复
git checkout <commit> -- <file>
```

4. **清理本地分支**
```bash
# 删除已合并的分支
git branch --merged | grep -v "\*\|main\|develop" | xargs -n 1 git branch -d

# 清理远程跟踪分支
git remote prune origin
```

---

这份学习笔记涵盖了 Git 的核心命令和功能，每个命令都包含了详细的选项说明和实用示例。建议按照目录结构逐步学习，并在实际项目中练习这些命令。