# Contributing

## Running/Development
1. iOS:
```sh
yarn example ios
```

2. Android:
```sh
yarn example android
```

## Running Tests
```sh
yarn test
```

## Creating new Pull Request
* remember to add appropriate title, ticket, description
* adding video or screenshot is very beneficial but it's not mandatory
* additionally please remember to add appropriate Pull Request title from following:
  * `[RNS-XX] short description` - for normal feature branches
* remember one pull request should always address one issue or feature

## Code structure
```
src/
├──constants
├──hooks
├──predefinedComponents
├──primitiveComponents
```

## Code Style
* Make sure you are using linter with linting rules defined in ESLint config (.eslintrc.js)
* Name branch according to your ticket following this pattern: RNS-XX-short_description
* Imports and exports inside `index.tsx` files eg. `screens/index.tsx`, `components/index.tsx` should be sorted alfabetically
* Style names should be ordered alfabetically
* Please use commit lint and follow commit naming convention (https://www.conventionalcommits.org/en/v1.0.0/)
