<h1 align="center">Samosa Project manger</h1>

<div align="center">
  <strong>An in-browser appliation that provides tools to manage and track the progress of personal projects</strong>
</div>

## Preview

<img src="./public/fluidUI.png" alt="development UX" width="1000px"/>
<img src="./public/ERD.png" alt="development ERD" width="1000px"/>

<br />

<img src="./public/landing.png" alt="landing page" width="1000px"/>
<img src="./public/home.png" alt="home page" width="1000px"/>
<img src="./public/kanban.gif" alt="kanban page" width="1000px"/>

<br />

## Table of Contents

-   [Objectives](#Objectives)
-   [Features](#Features)
-   [Next steps](#Next-steps)
-   [Installation](#installation)

## Objectives

-   Build an independant full-stack application using **React**, **Node.js**, **Express** and **PostgreSQL**.
-   Integrate fliud **drag and drop** functionality by updating local and server data simultaneously.
-   Practice the vue.js _State, Getters, Mutations, Actions_ model within the React.

## Next steps

-  Adjust colour scheme for a more professional look and a more intuitive display of data
-  Clean up schema and backend to remove redundant controllers and models

## Installation

`npm install`

create a `.env` file containing:
- `DATABASE_URL` and `DATABASE_SHADOW` url from your private SQL.
- `NODE_ENV="development"`
- `REACT_APP_SERVER_URL=http://localhost:4000`
- `SECRET=[your-secret]`

run the client and server concurrently with `npm run devstart`
