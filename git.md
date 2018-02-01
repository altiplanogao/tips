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

# Branch
## List
```
# lists available branches
git branch

# lists all branches including the remote branches
git branch -a

# lists branches in the remote repositories
git branch -r

# The -v option lists more information about the branches.
```
## Create new Branch
```
# syntax: git branch <name> <hash>
# <hash> in the above is optional
git branch testing
```
## Checkout Branch
```
# switch to your new branch
git checkout testing

# create branch and switch to it
git checkout -b bugreport12

# creates a new branch based on the master branch
# without the last commit
git checkout -b mybranch master~1
```
## Rename Branch
```
# rename branch
git branch -m [old_name] [new_name]
```
## Delete Branch
```
# delete branch testing
git branch -d testing
# force delete testing
git branch -D testing
# check if branch has been deleted
git branch
```
## Push branch changes to remote repo 
This creates the target branch in the remote repository if it does not yet exist.
```
# push current branch to a branch called "testing" to remote repository
git push origin testing

# make new branch
git branch anewbranch
# some changes
echo "More news for you" >> test01
git commit -a -m "a new commit in a feature branch"
# push anewbranch to the master in the origin
git push origin anewbranch:master
```
## Remote tracking branches
```
# delete remote branch from origin
git branch -d -r origin/[remote_branch]

# delete branch in a remote repository
git push [remote] --delete [branch]


```
### Tracking branches
Branches can track another branch. This is called to have an upstream branch and such branches can be referred to as tracking branches.
```
# setup a tracking branch called newbrach
# which tracks origin/newbranch
git checkout -b newbranch origin/newbranch
```
Instead of using the git checkout command you can also use the git branch command.
```
# origin/master used as example, but can be replaced

# create branch based on remote branch
git branch [new_branch] origin/master

# use --track,
# default when the start point is a remote-tracking branch
git branch --track [new_branch] origin/master
```
To see the tracking branches for a remote repository (short: remote) you can use the following command.
```
# show all remote and tracking branches for origin
git remote show origin
```
# Stash
# Revert
## Remove staged changes
```
# remove test02 from the staging area
git reset test02
```
## Remove unstaged changes
```
# delete a file
rm test01

# revert the deletion
git checkout -- test01

# note git checkout test01 also works but using
# two - ensures that Git understands that test01
# is a path and not a parameter

# change a file
echo "override" > test01

# restore the file
git checkout -- test01
```
# Reset
```
                             (HEAD)
 [Commit 1]<---[Commit 2]<---[Commit 3]
                                        git reset HEAD~1
                                        
               (HEAD)
 [Commit 1]<---[Commit 2]<---[Commit 3]

```
Reset updates:

| Reset | Branch pointer | Working tree | Staging area |
|-----|----|----|----|
| soft | Yes | No | No |
| mixed (default) | Yes | No | Yes |
| hard | Yes | Yes | Yes |

# git revert
```
# revert a commit
git revert commit_id
```
# Rebase
You can rebase your current local branch onto a remote-tracking branch. The following commands demonstrate that.

```
# assume you want to rebase master based on the latest fetch
# therefore check it out
git checkout master

# update your remote-tracking branch
git fetch

# rebase your master onto origin/master
git rebase origin/master
```

```
                                 (master)
 [Commit 1]<---[Commit 2]<---+---[Commit 4]
                             |
                             |
                             +---[Commit 3]
                                 (branch_1)
                                 (HEAD)

            git checkout branch_1
            git rebase master
            
                             (master)
 [Commit 1]<---[Commit 2]<---[Commit 4]
                                |
                                |
                                +---[Commit 3']
                                    (branch_1)
                                    (HEAD)
```
## abort rebase
```
# abort rebase and recreate the situation before the rebase
git rebase --abort
```

# Sketch
Stash
merge
fetch != pull

Avoid merge commits for pulling

By default, "git pull == git fetch + git merge". You can configure to "get pull == git fetch + git rebase" via the following setting.
```
git config --global branch.autosetuprebase always
```

Allow rebasing with uncommited changes
```
git config --global rebase.autoStash true
```
