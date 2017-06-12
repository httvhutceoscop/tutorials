Check current branch: `hg identify -b`
        
Show log options:
    
  `hg log [OPTION]`
  
Create new branch:
    
  hg branch new-branch
  
Commit branch: 
    
  hg commit -m "descripton here"
  
Show created branches: 
    
  hg branches
  
Switch branch: 
  
  hg update branch-name
  
  hg checkout branch-name
  
Delete file:  

  del filename

Revert commit:  

  hg revert --all
  
Check status:

    hg status
        M - file modified
        i - file missing
        ? - unknown file
        A - Added
        R - Removed
    
Check different with last commit: `hg diff filename`

Schedules files to be removed from the repository. They won’t actually be removed until you commit. : 

    hg remove filename
  
Shows an revision of any file: 

    hg cat -r 0:1 filename
  
Update the working directory to a particular revision: 

    hg update -r revison-number

Create new repository:

    hg init
  
Runs a web server to make the current repository accessible over the Internet:

    hg serve
  
Make a complete copy of an entire repository:

    hg clone URL name-repository
  
Push new changes from this repository into another:

    hg push
List changes in current repository waiting to be pushed:

    hg outgoing
  
List changes in current repository will be gotten:

    hg incoming
  
Pull code:

    hg pull
  
Merge two heads:

    hg merge
  
Show the changeset that’s in the working directory:

    `hg parent`

==============================

When you’re working on a team, your workflow is going to look a lot like this:

1. If you haven’t done so in a while, get the latest version that everyone else is working off of:

    `hg pull`
  
    `hg up`
  
2. Make some changes

3. Commit them (locally)

4. Repeat steps 2-3 until you’ve got some nice code that you’re willing to inflict on everyone else

5. When you’re ready to share:

- `hg pull` to get everyone else’s changes (if there are any)
- `hg merge` to merge them into yours
- test! to make sure the merge didn’t screw anything up
- `hg commit` (the merge)
- `hg push`

