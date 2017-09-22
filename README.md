# Full-stack Apollo + Next.js

Two things (should branch to separate)
    - proof-of-concept of full-stack for MT Direct Next (v4)
    - proof-of-concept of moving parts for either reusable half-stack (a) boilerplate or (b) framework

Features
- GraphQL/Apollo
    - Organizes our domain models (Domain Driven Development)
    - (mostly?) transparent bridge for data between front-end and back-end, allowing you to declare what data you need from the model
    - Realtime
    - Efficient batching and cacheing
    - New direction of meteor (wildly popular full-stack framework) authors (apollo = modular framework)
- ReactJS
    - declarative & idiomatic view layer, all in JS (no new templating language semantics)
    - Best ecosystem for UI components today
- Next.js (the UI framework)
    - Bundles many powerful libraries (e.g. Webpack, Babel) into 1 full-stack minimal-configuration framework
    - Simple, easy to use, well-documented, well supported
    - Server-side rendering
- Extensible API server (e.g. add ad-hoc Remote Procedure Calls) & UI Server (e.g. add ad-hoc file upload handler)

Choose your own
- Database and or ORM
- CSS/Style framework (recommend semantic-ui-react?)
- Localization (recommend i18next?)

Swap out
- API server framework (e.g. express -> micro)
- Test framework(s)

## Notes

- nodemon isn't watching shared `util/` folder (see nodemon.json)

## TODO

- authentication & authorization

- Use all the goodies from apollo-universal-starter-kit
- Go through http://dev.apollodata.com to fine-tune everything
- `recompose`?
- Splitting things out (in respect to both file/folder structure & repo/package structure)
    - API (GraphQL+RPC server app), UI (Next.js app), and shared code (running multiple semver-major API versions would be amazing for a fwe reasons)
        - enable cors
    - Different projects/features/functions
- add mocking & test framework(s)
    - use apollo-test-utils & graphql-tools
    - Jest, enzyme & (for snapshot testing) enzyme-to-json
- add babel config file, webpack config file, next.config.js (easy)
- add eslint + prettier (easy)
- add inline documentation framework? (easy)
