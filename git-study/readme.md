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

- 系统配置：`/etc/gitconfig` 配置命令：`git config --system`
- 用户配置：`~/.gitconfig`或`~~/.config/git/config` 配置命令：`git config --global`
- 项目配置：`.git/config` 默认选项，也可以用`git config --local`指定

```bash
# 配置用户信息
git config --global user.name "你的姓名"
git config --global user.email "你的邮箱"

# 查看配置
git config --list
# 或
git config --list --show-origin

# 指定文本编辑器
git config --global core.editor emacs #以emacs为例
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
git status -s 					# 简洁格式

# 添加文件到暂存区
git add <文件名>          # 添加单个文件
git add .               # 添加所有文件

# 提交更改
git commit -m "提交信息"
git commit -a 					# 直接提交所有修改

# 查看提交历史
git log
git log --oneline       # 简洁格式
```
#### 1.4.1 format常用选项

| 选项 | 说明                                           |
| ---- | ---------------------------------------------- |
| %H   | 提交的完整哈希值                               |
| %h   | 提交的简写哈希值                               |
| %T   | 树的完整哈希值                                 |
| %t   | 树的简写哈希值                                 |
| %P   | 父提交的完整哈希值                             |
| %p   | 父提交的简写哈希值                             |
| %an  | 作者名字                                       |
| %ae  | 作者的邮箱                                     |
| %ad  | 作者的修订日期（可以用--date=选项 来定制格式） |
| %ar  | 作者修订日期，按多久以前的方式显示             |
| %cn  | 提交者的名字                                   |
| %ce  | 提交者的邮箱                                   |
| %cd  | 提交日期                                       |
| %cr  | 提交日期（距今多长时间）                       |
| %s   | 提交说明                                       |

```bash
$ git log --pretty=format:"%h - %an, %ar : %s"
a367cbc - herff, 11 minutes ago : mod README file
a383fe1 - herff, 12 minutes ago : Add README file
(END)
```

当 `oneline` 或 `format` 与另一个 `log` 选项 `--graph` 结合使用时尤其有用。 这个选项添加了一些 ASCII 字符串 来形象地展示你的分支、合并历史:

```bash
  $ git log --pretty=format:"%h %s" --graph
  * 2d3acf9 ignore errors from SIGCHLD on trap
  *  5e3ee11 Merge branch 'master' of git://github.com/dustin/grit
  |\
  | * 420eac9 Added a method for getting the current branch.
  * | 30e367c timeout code and tests
  * | 5a09431 add timeout protection to grit
  * | e1193f8 support for heads with slashes in them
  |/
  * d6016bc require time for xmlschema
  *  11d191e Merge branch 'defunkt' into local
```

#### 1.4.2 Git log 选项

| 选项            | 说明                                                         |
| --------------- | ------------------------------------------------------------ |
| **-P**          | 按补丁格式显示每个提交引入的差异                             |
| **--stat**      | 显示每次提交的文件修改统计信息                               |
| --shorstat      | 显示 --stat 中最后的行数修改、添加、移除、统计               |
| --name-only     | 仅在提交信息后显示已修改的文件清单                           |
| --name-status   | 显示新增、修改、删除的文件清单。                             |
| --abbrev-commit | 仅显示 SHA-1 校验和所有 40 个字符中的前几个字符。            |
| --relative-date | 使用较短的相对时间而不是完整格式显示日期(比如“2 weeks ago”)。 |
| **--graph**     | 在日志旁以 ASCII 图形显示分支与合并历史。                    |
| **--pretty**    | 使用其他格式显示历史提交信息。可用的选项包括 oneline、short、full、fuller 和 format(用来定义自己的格式)。 |
| **--oneline**   | --pretty=oneline --abbrev-commit合用的简写。                 |

#### 1.4.3 限制log 输出

| 选项            | 说明                  |
| ----------------- | ---------------------------------------- |
| - \<n\>              | 仅显示最近的 n 条提交。                  |
| --since, --after  | 仅显示指定时间之后的提交。               |
| --until, --before | 仅显示指定时间之前的提交。               |
| --author          | 仅显示作者匹配指定字符串的提交。         |
| --committer       | 仅显示提交者匹配指定字符串的提交。       |
| --grep            | 仅显示提交说明中包含指定字符串的提交。   |
| -S                | 仅显示添加或删除内容匹配指定字符串的提交 |

#### 1.4.4 隐藏合并提交

按照你代码仓库的工作流程，记录中可能有为数不少的合并提交，它们所包含的信息通常并不多。 为了避免显示的合并提交弄乱历史记录，可以为 log 加上 `--no-merges` 选项。

### 1.5 文件操作

```bash
# 查看文件差异
git diff                # 工作区与暂存区的差异
git diff --staged       # 暂存区与最后提交的差异，(--staged和--cached是同义词)

# 撤销更改
git checkout -- <文件名>  # 撤销工作区更改
git reset HEAD <文件名>   # 取消暂存
git reset --hard HEAD    # 重置到最后提交状态

# 删除文件
git rm <文件名>
git rm --cached <文件名>  # 仅从Git中删除，保留本地文件

# 移动文件
git mv file_from file_to	# 重命名文件
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
git remote show origin

# 添加远程仓库
git remote add <短别名> <仓库URL>
# 示例，这里不用https是因为现在只支持在终端ssh认证,方便后面push
git remote add origin git@github.com:hlcc/Code-a-way.git

# 推送到远程仓库
git push origin <分支名>
git push -u origin main  # 设置上游分支

# 当你想分享你的项目时，必须将其推送到上游。 这个命令很简单:git push <remote> <branch>。 当你想要将 master 分支推送到 origin 服务器时(再次说明，克隆时通常会自动帮你设置好那两个名字)， 那么运行这个命令就可以将你所做的备份到服务器:
git push origin master

# 从远程仓库拉取
git fetch origin         # 获取更新但不合并
git pull origin <分支名>  # 获取并合并
```

> [!IMPORTANT]
>
> 如果你使用 `clone` 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，`git fetch origin`会抓取克隆(或上一次抓取)后新推送的所有工作。必须注意`git fetch`命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。当准备好时你必须手动将其合并入你的 工作。
>
> 如果你的当前分支设置了跟踪远程分支， 那么可以用 `git pull `命令来自动抓取后**合并该远程分支到当前分支**。默认情况下，`git clone` 命令会自动设置本地 `master` 分支跟踪克隆的远程仓库的 `master` 分支(或其它名字的默认分支)。 运行 `git pull` 通常会从最初克隆的服务器上抓取数据并自动尝试合并到当前所在的分支。



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