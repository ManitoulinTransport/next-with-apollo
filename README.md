# Full-stack Apollo + Next.js

Two things (should branch to separate)
    - proof-of-concept of full-stack for MT Direct Next (v4)
    - proof-of-concept of moving parts for either reusable half-stack (a) boilerplate or (b) framework

Features
- GraphQL/Apollo
    - Organizes and distributes our domain models
    - An implementation of GraphQL
    - (mostly?) transparent bridge for data between front-end and back-end, allowing you to declare what data you need from the model
    - enables Domain Driven Development
    - Realtime capable
    - Efficient batching and cacheing
    - (New direction authors of meteor, the wildly popular full-stack framework .. apollo == modular framework)
- ExpressJS
    - Extensibility (e.g. add ad-hoc Remote Procedure Calls) & UI Server (e.g. add ad-hoc file upload handler)
    - Best ecosystem for plugins or "middlewares"
- ReactJS
    - view layer: declarative, concise & idiomatic
    - Component-Driven Development
    - Best ecosystem for UI components today
    - Interesting community applying it (e.g. GraphQL/Apollo folks)
- Next.js
    - UI framework built on ReactJS
    - Bundles many powerful libraries (e.g. Webpack, Babel) into one minimal-configuration framework
    - Simple, easy to use, well-documented, well support

Choose your own
- Database and or ORM
- CSS/Style framework (recommend semantic-ui-react?)
- Localization (recommend i18next?)

Should be easy to swap out:
- API server framework (e.g. express -> micro)
- Test framework(s)


## TODO

- authentication & authorization
- Reactive persistent data
- MobX for LOCAL data reactivity
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
