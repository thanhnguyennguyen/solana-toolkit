# Solana Toolkit

Solana Toolkit aims to provide Solana developers with some utilities

# Usage
 - `Inspector` : inspect encoded message to Solana message / transaction
 
  ```typescript
  import { inspectMessage } from `solana-toolkit`
  ```
  - `prettyLog` : beatify program logs like [Solscan](https://solscan.io/tx/2E9GJHVkNpJpGk3FRMZa9ZvjwihqWYxrCYetYGrQTDqivsk2BZBoZpSxZcWz1XHWjEjHSYSi2zbTbNQA2VssZX9T)

  ```typescript
  import { prettyProgramLogs } from `solana-toolkit`
  ```

# Contribution

## Getting Started

```bash

# Install dependencies
yarn install

# Now you can run various yarn commands:
yarn cli
yarn lint
yarn test
yarn build
...
```

* Take a look at all the scripts in [`package.json`](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/package.json)
* For publishing to npm, use `yarn publish` (or `npm publish`)

## esbuild

[esbuild](https://esbuild.github.io/) is an extremely fast bundler that supports a [large part of the TypeScript syntax](https://esbuild.github.io/content-types/#typescript). This project uses it to bundle for browsers (and Node.js if you want).

```bash
# Build for browsers
yarn esbuild-browser:dev
yarn esbuild-browser:watch

# Build the cli for node
yarn esbuild-node:dev
yarn esbuild-node:watch
```

You can generate a full clean build with `yarn build-all` (which uses both `tsc` and `esbuild`).

* `package.json` includes `scripts` for various esbuild commands: [see here](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/package.json#L23)
* `esbuild` has a `--global-name=xyz` flag, to store the exports from the entry point in a global variable. See also the [esbuild "Global name" docs](https://esbuild.github.io/api/#global-name).
* Read more about the esbuild setup [here](https://www.metachris.com/2021/04/starting-a-typescript-project-in-2021/#esbuild).
* esbuild for the browser uses the IIFE (immediately-invoked function expression) format, which executes the bundled code on load (see also https://github.com/evanw/esbuild/issues/29)


## Tests with Jest

You can write [Jest tests](https://jestjs.io/docs/getting-started) [like this](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/src/main.test.ts):



Run the tests with `yarn test`, no separate compile step is necessary.

* See also the [Jest documentation](https://jestjs.io/docs/getting-started).
* The tests can be automatically run in CI (GitHub Actions, GitLab CI): [`.github/workflows/lint-and-test.yml`](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/.github/workflows/lint-and-test.yml), [`.gitlab-ci.yml`](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/.gitlab-ci.yml)
* Take a look at other modern test runners such as [ava](https://github.com/avajs/ava), [uvu](https://github.com/lukeed/uvu) and [tape](https://github.com/substack/tape)

## Documentation, published with CI

You can auto-generate API documentation from the TyoeScript source files using [TypeDoc](https://typedoc.org/guides/doccomments/). The generated documentation can be published to GitHub / GitLab pages through the CI.

Generate the documentation, using `src/main.ts` as entrypoint (configured in package.json):

```bash
yarn docs
```

The resulting HTML is saved in `docs/`.

You can publish the documentation through CI:
* [GitHub pages](https://pages.github.com/): See [`.github/workflows/deploy-gh-pages.yml`](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/.github/workflows/deploy-gh-pages.yml)
* [GitLab pages](https://docs.gitlab.com/ee/user/project/pages/): [`.gitlab-ci.yml`](https://github.com/thanhnguyennguyen/solana-toolkit/blob/master/.gitlab-ci.yml)


## Feedback

Reach out with feedback and ideas:

* [Create a new issue](https://github.com/thanhnguyennguyen/solana-toolkit/issues)
