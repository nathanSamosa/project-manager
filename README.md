# Fullstack Team Project

This is the second of the fullstack team projects. However, this time you have free choice as to what you want to build. Perhaps the most challenging task, then, is deciding, as a team, exactly what that is!

## Learning Objectives

- Use agile ceremonies including stand-ups, retrospectives, sprint planning and stakeholder demos to develop software as a team
- Design and build a full-stack architecture that has a frontend application consuming data from a backend API
- Use a source code management tool to integrate work in one codebase with multiple contributors
- Explain and build a CI/CD pipeline for a software development project
- Use a CI server that runs automated tests against requested changes before accepting the change
- Continuously deploy code to a production environment 

## Project Requirements

- Must have Continuous Integration to run code linting
- Must continuously deploy the main branch when changes are merged in
- Must contain a well thought out entity relationship diagram and application design built via user stories
- Must be a full-stack application with a [ReactJS](https://reactjs.org/) frontend consuming data from an [ElephantSQL](https://www.elephantsql.com/) database that is exposed to the client via an API built using [Express](https://expressjs.com/) and [Prisma](https://www.prisma.io/)
- Must not expose sensitive information
- Must not contain hard coded URL’s (routes are fine, `http://localhost` is not)
- Commit messages must be consistent and meaningful
  - Keep them in present tense (✅ `add, remove, update` ❌ `added, removed, updated`)
  - Keep them short and descriptive ( `change hashing library`, `add password to user model` )
  - [Here are some good guidelines](https://reflectoring.io/meaningful-commit-messages/) but don’t go overboard, the above two bullet points are enough

## Assessment

- Students will work on feature branches and create pull requests to merge in to the `main` branch upon teacher approval. The team must discuss and provide feedback on the implementation in the PR before a teacher provides their feedback and final approval. [See pull-requests.md for the process.](./PR-PROCESS.md)
- Stakeholder demo’s at the end of each sprint (3 days)
  - Did you plan effectively for the current sprint?
  - Did you perform daily standups?
  - Can you accurately explain the work you’ve completed?
  - Did you complete all of the tasks in the sprint?
- End of project retrospectives

## Getting started

1. Choose, as a team, the application you want to build
2. Complete your sprint planning stage
3. Read the setup instructions below

## Setting up

- One team member must fork this repository and ensure each team member has access to contribute to the fork
- Other team members will *clone* that fork. All work will be pushed to the single forked repository. At the end of the project, you can fork the fork so everybody has the finished project in their personal github accounts

## Running the app

- Add `NODE_ENV="development"` to your .env file
- Type `npm run devstart` to run the app
- Type `npm run lint` to run the linter if you wish to check your code quality

## Extension

Add some unit testing to both your project and your CI/CD pipeline.

There are examples of unit tests in this repository. They are also included in this repo's CI/CD pipeline - see the [PR](.github/workflows/pull_request.yml) and [Deploy](.github/workflows/main.yml) GitHub Action workflows.
