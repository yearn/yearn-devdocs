# Contributing to Yearn Dev Docs

Thanks for taking the time to contribute to the Yearn Dev Docs!

The following is a set of guidelines for contributing to Yearn's Dev Docs, which are hosted on [GitHub](https://github.com/yearn/yearn-devdocs).


## Links

- [Yearn Dev Docs Website](https://yearn.github.io/yearn-devdocs/)
- [Yearn Finance on GitHub](https://github.com/yearn/)
- [Twitter](https://twitter.com/iearnfinance)
- [Discord](https://discord.yearn.finance/)
- [Discourse](https://gov.yearn.finance/)


## High Level Contributing Workflow 

_Adapted and condensed from [GitHub-Forking by Chaser324](https://gist.github.com/Chaser324/ce0505fbed06b947d962)._

### Create a Fork

Go to the [Yearn Dev Docs GitHub page](https://github.com/yearn/yearn-devdocs) and click the "Fork" button. Then clone your fork to your local machine.

```shell
$ git clone git@github.com:USERNAME/yearn-devdocs.git
```

### Keep Your Fork Up to Date

If you plan to be an active, regular contributor please keep your fork up to date. The easiest way to do so is to add the original repo as a remote and merge in changes from `master`.

```shell
$ git remote add upstream https://github.com/yearn/yearn-devdocs
```

To update your fork with the latest upstream changes, fetch the upstream repo's branches and latest commits to bring them into your repository:

```shell
$ git fetch upstream
```

Now checkout your fork's `master` branch and merge in the upstream's `master` branch:

```shell
$ git checkout master
$ git merge upstream/master
```

To ensure that upstream merges are simple fast-forwards, it is best not to commit directly to your fork's `master` branch. 


### Doing Your Work

#### Create a Branch

Whenever you begin work on a new page of documentation or a new round of edits to an existing page of documentation, it is important that you create a new branch. This keeps your changes organized and separated from the `master` branch so that you can easily submit and manage multiple pull requests for every document change you complete.

To create a new branch and start working on it, first checkout the `master` branch so that your new branch comes from `master`. Then checkout your new branch.

```shell
$ git checkout master
$ git checkout -b newdocedit
```

Now make all those great additions and edits to your copy of Yearn's Dev Docs.


### Submitting a Pull Request

Before submitting your pull request, check to see if there have been any new commits to the upstream `master` branch. If there have been new commits, you should rebase your development branch so that merging will be a simple fast-forward.

Fetch upstream `master` and merge with your repo's `master` branch:

```shell
$ git fetch upstream
$ git checkout master
$ git merge upstream/master
```

If there were any new commits, rebase your development branch:

```shell
$ git checkout newdocedit
$ git rebase master
```

If you have made many smaller commits to your development branch, it may be desirable to squash them into a smaller set of larger commits. This can be achieved with an interactive rebase.

Rebase all commits on your development branch:

```shell
$ git checkout 
$ git rebase -i master
```

This will open up a text editor where you can specify which commits to squash.


#### Submitting

Once you've committed and pushed all of your changes to GitHub, go to the page for your fork on GitHub, select your development branch, and click the pull request button. If you need to make any adjustments to your pull request, just push the updates to GitHub. Your pull request will automatically track the changes on your development branch and update.