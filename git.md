# File status:
* untracked: the file is not tracked by the Git repository. This means that the file never staged nor committed.
* tracked: committed and not staged
* staged: staged to be included in the next commit
* dirty / modified: the file has changed but the change is not staged

# Commit references:

Each commit has zero or more direct predecessor commits
* ^ (caret) : parent  (typically used to point to direct predecessor when there are more than one)
* ~ (tilde) : ancestor

Example:
```
                                (HEAD^1 or HEAD~1)
 [Commit 1]<---[Commit 2]<--+---[Commit 4]<------+
                            |                    |
                            |                    |
                            |   (HEAD^2)         |   (HEAD)
                            +---[Commit 3]<------+---[Merge commit]
                                
```
## Commit ranges:
A..B  : in B not in A

# Configuration:
* System: /etc/gitconfig,  git config --system
* Global: ~/.gitconfig, git config --global
* Repo: .git/config, git config --local

# Rebase
Stash
merge
fetch != pull
