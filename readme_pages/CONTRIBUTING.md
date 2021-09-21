# Contributing

## Running/Development
1. iOS:
```bash
$ react-native run-ios
```

2. Android:
```bash
$ react-native run-android
```

## Running Tests
```bash
$ yarn test
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
├──assets
├──components
├──constants
├──predefinedComponents
```

## Code Style
* Make sure you are using linter with linting rules defined in ESLint config (.eslinrc)
* Name branch according to your ticket following this pattern: RNS-XX-short_description
* Imports and exports inside `index.js` files eg. `screens/index.js`, `components/index.js` should be alfabetically
* Style names in `ComponentName.styles.js` should be ordered alfabetically
* Please use commit lint and follow commit naming convention (https://www.conventionalcommits.org/en/v1.0.0/)
