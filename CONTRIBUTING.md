# Contributing

## Rules

Please observe the following ground-rules when making contributions:

- All contributions must be made by opening a pull request into `main`.
- Use `yarn fmt` to reformat the files that you've made changes to. Unformatted
  files will be rejected.
- Please ensure that your contribution is free of typos. Use a spellchecker to
  verify correct punctuation.
- Follow the style guide below whenever possible.
- Please add a description to the pull request describing _what_ you're changing
  or which issues you're resolving and _how_. Add background information
  whenever possible.
- Please link all issues and other GitHub items that are related to the changes
  that you're making.
- Commit summaries must use the imperative, i.e. "Fix typo" instead of "Fixed
  typo" or "Fixes typo"
- Avoid force pushes when a pull request is in review.
- A pull request may only be merged when it has received at least one approval
  from a member of [zeitgeistpm] and GitHub Actions have passed successfully.
  Whenever possible, the author should execute the merge.
- Comments in a review should be resolved by the author.
- Please use _squash and merge_ to merge pull requests. Feel free to remove
  trivial items like "Fix typo", etc. from the commit summary.

## Style Guide

- When using enumerated lists, start each item with `1.`; markdown will
  automatically number each item correctly:

  ```markdown
  1. First item
  1. Second item
  1. Third item
  ```

- Protect `:::` blocks with `<!-- prettier-ignore -->` to prevent awkward
  reformatting:

  ```markdown
  <!-- prettier-ignore -->
  :::info
  This is very important!
  :::
  ```
