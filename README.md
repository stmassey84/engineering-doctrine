# engineering-portfolio

[https://portfolio.stevemassey.net/](https://portfolio.stevemassey.net/)

## Run locally

`npm run start`

## Build

`npm run build`

## Deploy

### Local

`cd terraform; terraform apply`

### Github/Remote

1. When a Pull Request is created or changed the `pre-deploy.yml` workflow is triggered. This workflow runs `terraform plan` and adds the output to a PR comment.
2. When a Pull Request is merged or there are changes to `main`, the `deploy.yml` workflow is triggered. This workflow runs `terraform apply`.

## Testing

### Local

`npm run test`

### Github/Remote

When a Pull Request is created or changed the `test.yaml` workflow is triggered.

## Linting

### Local

`npm run lint`

### Github/Remote

When a Pull Request is created or changed the `lint.yml` workflow is triggered.

## TODO:

1. Add serverless backend to illustrate fast, ephemeral API design
2. Add more unit tests to increase coverage
