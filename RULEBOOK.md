# Rulebook for React and React Native

- [**Rules**](#rules)

  - [**TSlint Prettier**](#tslint-prettier)
  - [**Functional components**](#functional-components)
  - [**Object destructuring**](#object-destructuring)
  - [**Naming convention**](#naming-convention)
  - [**ES6 features**](#es6-features)
  - [**Static typing**](#static-typing)
  - [**Other rules**](#other-rules)

- [**GIT**](#git)

  - [**Branching strategy**](#branching-strategy)
  - [**Functional components**](#functional-components)
  - [**Object destructuring**](#object-destructuring)
  - [**Naming convention**](#naming-convention)

- [**Project structure**](#project-structure)

## Rules

##### TSlint Prettier

Every project has to have **prettier** and **tslint** included. Also we have to have implemented **husky** to take care of our pre-commit hooks. We have to take care of that, so every developer follows certain guidelines, to make sure of coding standards and similarity in our code.

For enabling auto save you have to edit your editors settings.

```
Basic settings for VSCode... <ROOT_DIR>/.vscode/settings.json
{
  "editor.formatOnSave": true
}

```

In every moment you can check your code with:

```
yarn lint
```

##### Functional components

We give preference to functional components before class based components. Use class based components only in case when lifecycle methods can be user to boost performance of the app. Never use class based components for some simple render!

```javascript
// BAD
export default class Button extends React.Component {
  componentDidMount() {}

  render(props) {
    return <button onClick={props.onClick}>Click me!</button>;
  }
}

// GOOD
export default ({ onClick }) => {
  useEffect(() => {}, []);

  return <button onClick={onClick}>Click me!</button>;
};
```

##### Object destructuring

Preference of object destructuring especially in functional components. In some cases destructuring is not needed because variable is used only once.

```javascript
// BAD
export default (props: ButtonProps) => {};

// GOOD
export default ({ onClick, children }: ButtonProps) => {};
```

##### Naming convention

Try to write your components as easier for understanding as it’s possible.
Every type of files should have separate file with appropriate suffix. It should be ComponentName.{type}.{ts|tsx|scss}. Types could be container, component, type, hook, style, gql etc. So if you use Redux, move your connect() to its own file called ComponentName.container.js

Every component should have an index file that is a root of the component. It is used just to export proper file that we need.
Example:

- If you have redux you will have Component.component.tsx that will be imported in Component.container.ts. Then we use index.ts to export that connected container.
- If we don't have container, we have just Component.component, then we use index.ts just to export that Component.component.tsx.
- In cases for common components we can just directly write code to index.tsx and automatically use it as export file.

```
│── Weather
        ├── Components
        │        └── Graph
        │               ├── index.tsx
        │               └── Graph.style.scss
        ├── index.ts
        ├── Weather.component.ts
        ├── Weather.type.ts
        ├── Weather.hook.ts
        ├── Weather.container.ts
        └── Weather.style.scss
```

##### ES6 features

Use ES6 features (object destructuring, spread operator, Array.map etc.) - all that stuff let us to make our code easier to read and maintain. Don’t use for loop in your code.
Instead of using for(let i < 0; i < n; i++) use array methods (forEach, map, reduce, etc...)

##### Static typing

Don’t use **any, Object, Function** types. Object and Function types don’t tell us what do we actually expect to be in this variable. Also TypeScript compiler does not know what fields can be in Object type and what function signature hides behind Function type.

Any is the most dangerous type for development because TypeScript stops his type checking for variable with Any type.

When **any** can be used:

- Developer should spend a lot of time (let’s say 30 minutes) to understand what type should be used there instead of any
- Some library is written pretty strange, without type-definitions, and developer works with this library calls’ results

If you decide to use Any, you should make a comment above it, which will explain why you prefer to use Any here.

##### Other rules

- **Freeze npm packages version (remove ^ symbols from package.json, use --save-exact flag when install a packages)**
  We have to make sure that project can be maintained even after 1 year of development. We aren't interesting in update packages in that case, because some breaking changes can go with new version of some package. To avoid unnecessary code rewriting, we have to freeze versions of all the packages.

- **Imports order**
  Every import should have its order. Normally it is order by type and alphabetically, mostly tslint will take care of that and warn you if it is on consistent.
  Example:

```
    import React from 'react';                                   // First you have to write imports for NPM packages
                                                                 // One empty line
    import Weather from 'screens/Weather';                       // Then you can write your local absolute imports
    import Weather from '../library/constants/Url.constants.ts';  // Then you can write your local relative imports
                                                                 // One empty line
    import './App.scss';                                         // Then you can write your styles import
                                                                 // One empty line

    const App = () => {}
```

- **If your component defines some big function in it (or a lot of small functions), move these functions into utils folder in your component’s folder**
  Try to always split a medium and big components into small parts. It makes code easier to read and maintain.

- **Create reusable components**
  If 2 of your components has the same JSX, you can move that JSX to its own component and use it everywhere.

- **Create reusable hooks and utils**
  Same as in rule above. If you have same logic in 2+ components, move it to its own file and use everywhere.

- **Split components by Pure / Impure**
  If you have some logic and big render function in your component, you can split it into 2 components: first one will do all the logic and render the second one, which will just accept all the callbacks and variables through props and do the rendering.

## GIT

Mostly tslint and pre-commit hooks will take care of some stuff for you, but you also have to take care that you don't have too much commented code in the repository. It is good to keep code clean and remove unnecessary comments. If you commented out some lines of the code, remove it and if you need it later, it can be restored through git.

##### Branching strategy

Every branch should follow pattern in naming.

- **feature/JIRA_STORY_SHORT_CODE** - if your branch contains some feature or improvement - **feature/ZM-114**
- **bug/JIRA_STORY_SHORT_CODE** - if your branch is used for fixing bugs - **bug/ZM-115**
- **hotfix/JIRA_STORY_SHORT_CODE** - if your branch is used for creating hotfixes - **hotfix/ZM-116**

##### Commit messages

All the commits in your branch should contain branch’s name in the start. Commits should contain proper description, not just some random words. From commit message you and other developers should be able to come to conclusion what was changed. If they are not sure, there is JIRA story short code to see more details.

- Wrong commit messages:

  - “update config.js”
  - “add dropdown with timezones on dashboard page”

- Wrong commit messages:\*\*
  - “feature/ZM-114 - added hourly and daily charts to weather screen”
  - “hotfix/ZM-116 - update config.js”

## Project structure

```
├── public
├── src
│   ├── core
│   │   ├── axios
│   │   │     └── index.ts
│   │   ├── routes
│   │   │     └── index.ts
│   │   ├── MainReducer.ts
│   │   └── Store.ts
│   ├── library
│   │   ├── common
│   │   │   ├── actions
│   │   │   │   └── Authentication.action.ts
│   │   │   ├── components
│   │   │   │   └──Button
│   │   │   │       └──index.tsx
│   │   │   ├── constants
│   │   │   │   ├── Identifier.constants.ts
│   │   │   │   └── Url.constants.ts
│   │   │   └── reducers
│   │   │         └── Authentication.reducer.ts
│   │   ├── types
│   │   └── utilities
│   │         ├── index.ts
│   │         ├── Storage.ts
│   │         └── String.ts
│   ├── resources
│   ├── screens
│   │   ├── Home
│   │   ├── Login
│   │   └── Weather
│   │       ├── index.ts
│   │       ├── Weather.action.ts
│   │       ├── Weather.component.ts
│   │       ├── Weather.container.ts
│   │       ├── Weather.reducer.ts
│   │       ├── Weather.style.scss
│   │       └── Weather.type.ts
│   ├── App.tsx
│   ├── index.scss
│   ├── index.tsx
│   ├── react-app-end.d.ts.tsx
│   ├── serviceWorker.ts
│   └── setupTests.ts
├── .env
├── .env.dev
├── .env.prod
├── .env.test
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
├── RULEBOOK.md
├── tsconfig.json
├── tslint.json
└── yarn.lock
```
