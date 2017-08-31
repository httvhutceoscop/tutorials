Mercurial has two nice commands: incoming and outgoing changes.
Those commands allow to see the commits which are pushed but not fetched and the commits which are not pushed.

By default, thoses commands does not exists in git. But it's really simple to use git's aliases to do it :

**Outgoing**

```
git log --pretty=oneline --abbrev-commit --graph @{u}..

or

git log --pretty=oneline --abbrev-commit --graph @{u}.. --stat
```

**Incoming**

```
git fetch && git log --pretty=oneline --abbrev-commit --graph ..@{u}
```

Add this to your alias section in ~/.gitconfig if you want :

```
out = log --pretty=oneline --abbrev-commit --graph @{u}..
in = !git fetch && git log --pretty=oneline --abbrev-commit --graph ..@{u}
```

# Ref
https://coderwall.com/p/fowimq/git-outgoing-incoming-changes
