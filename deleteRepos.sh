#!/bin/bash
repoNames=(
    "repo1"
    "repo2"
    "repo3"
)

for i in "${repoNames[@]}"
do
    echo "$i"
    curl -X DELETE -H "Authorization: token API_TOKEN" https://api.github.com/repos/username/$i
done
