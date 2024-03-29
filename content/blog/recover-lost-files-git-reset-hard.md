---
title: "How to recover lost files after a git reset --hard"
date: 2022-12-27 11:30:20
featureImage: images/single-blog/git-reset/github-reset.png
postImage: images/single-blog/git-reset/github-reset.png
categories: software-engineering
tags: [git]
author: Anh Chu
toc: Table of Contents
---

While working on a recent project, I accidentally committed some files. Instead of using `git reset --soft <prev-commit-id>` to unstage them, I used `git reset --hard HEAD` and all of my new changes gone with the wind. After panicking for a few minutes, I determined to learn how `git reset` works and how I can revert the damages. 


### 1. What is git reset (hard vs soft)

{{< image image="images/single-blog/git-reset/git-reset.png" >}}

`git reset --hard` resets the current branch tip, and also deletes any changes in the working directory and staging area (although files under `git stash` will not be affected). It resets index entries to a specified commit, or the HEAD location. `git reset --hard` should be used with caution, since it can lead to losing work in your staging area and working directory.

Below is the demonstration of what happened to a new file `test2.txt` after a `git reset --hard`

```shell
  $ git status
  On branch master
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
          test2.txt

  $ git add test2.txt
  On branch master
  Changes to be committed:
    (use "git restore --staged <file>..." to unstage)
          new file:   test2.txt

  $ git commit -m "Add test2"
  [master 2d7949d] Add test2
  1 file changed, 10 insertions(+)
  create mode 100644 test2.txt

  $ git reset --hard 6122c04
  HEAD is now at 6122c04 add test
```

After doing the `get reset --hard` to commit id 6122c04, the file test2 will be removed from the working directory

On the contrary, `git reset --soft` revert your commit without removing your files from the working directory. After that you can unstage the files you don't want to commit

```shell
  $ git status
  On branch master
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
          test2.txt

  $ git add test2.txt
  On branch master
  Changes to be committed:
    (use "git restore --staged <file>..." to unstage)
          new file:   test2.txt

  $ git commit -m "Add test2"
  [master 2d7949d] Add test2
  1 file changed, 10 insertions(+)
  create mode 100644 test2.txt

  $ git reset --soft 6122c04

  $ git status
  On branch master
  Changes to be committed:
    (use "git restore --staged <file>..." to unstage)
          new file:   test2.txt

  $ git restore --staged test2.txt 

  $ git status
  On branch master
  Untracked files:
    (use "git add <file>..." to include in what will be committed)
          test2.txt

```


### 2. Recover files after `git reset --hard` in 3 scenarios

#### Scenario 1: Changes committed

If you do a `git reset --hard` after `git add` and `git commit`

1. retrace the commit that you need to recover
    
    `git reflog`

2. switch to the commit you want to recover, now your repo will be in 'detached HEAD' state
    
    `git checkout <commit-id>`

3. to fix the detached HEAD state, create a new branch and merge the branch back to master

    `git branch <new-branch> <commit-id>`

    `git checkout master`

    `git merge <new-branch>`

#### Scenario 2: Changes staged but not yet committed

If you do a `git reset --hard` after `git add` but before `git commit`

1. Use `git fsck` to check dangling blob hash id (blob that has no commits associated to it). This will help us retrieve the content of the files that were staged but not yet committed

2. `git show <dangling blob id> > recover.txt` to send the content of the blob to a file

3. Another option is to use `git fsck --lost-found` to move all the dangling blobs to lost-found directory. Then, `cd .git/lost-found/other` to check all the dangling blob content

#### Scenario 3: Changes not staged nor committed

If you do a `git reset --hard` after `git add` and `git commit`, your new changes before staging will still be in your directory. 




