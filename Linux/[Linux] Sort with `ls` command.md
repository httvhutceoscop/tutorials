# ls help
```
ls --help
```

# Sort by Name
## Sort A-Z
```
ls -1
```
## Sort Z-A
```
ls -1r
```
## Display folders first and files later
```
ls -lr --group-directories-first
```

# Sort by Last Modified
## Sort newest
```
ls -t
```
## Sort oldest
```
ls -tr
```

# Sort by File Size
## Sort largest --> smallest
```
ls -S
```
## Sort smallest --> largest
```
ls -Sr
```

# Sort by Extension
## A-Z
```
ls -X
```
## Z-A
```
ls -Xr
```

# Display long listing format (more information about files, folders)
```
ls -l
```

## Sort by column/field
Assume that the owner name is column 3, filename is column 9. Then

sort by the owner name.

```
ls -l | sort -k 3
```

sort by owner and then by the filename.

```
ls -l | sort -k 3,3 -k 9
```

## Sort with multi options
- Display: the owner, size and filename
- Sort the owner name
```
ls -lisa | awk '{print $5, $7, $11}' | sort
```

Note that the column and field numbers are a bit different in the above command output as I used other options with ls in addition to -l.