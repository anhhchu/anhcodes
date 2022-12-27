COMMIT_MSG=$1

# updating public directory
hugo -t portio

# stage all changes
git add -A 

# commit changes
git commit -m $COMMIT_MSG

# push changes to remote
git push origin master