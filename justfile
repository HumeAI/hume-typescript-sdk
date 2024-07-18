# run the CI workflow locally
local-ci:
    act -W '.github/workflows/ci.yml' --container-architecture linux/amd64 -s GITHUB_TOKEN="$(gh auth token)"
