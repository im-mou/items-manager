<p align="center">
   <br/>
   <br/>
   <a href="http://items-manager.mohsinriaz.es" target="_blank"><img height="42px" src="./.github/assets/icon.png" /></a>
   <br/>
   <br/>

   <h3 align="center">Items Manager</h3>
   <p align="center">
  Simple web app to manage items.
   </p>
   <br/>
   <p align="center" style="align: center;">
      <a href="#">
        <img alt="npm" src="https://github.com/im-mou/items-manager/actions/workflows/ci.yml/badge.svg" />
      </a>
   </p>
</p>

<br/>
<hr />

## Overview

This project is made with:

-   React
-   Custom design system (built fully from scratch)
-   Typescript
-   MobX for global state
-   SASS

<br />

## Installation

### Prerequisites

-   Node >= v16.x
-   Yarn >= v1.22.x
-   or NPM >= v8.3.x

Run the following commands:

```
git clone https://github.com/im-mou/items-manager
cd items-manager
yarn
```

In the project directory, you can run to following command to run the app.

```
yarn start
```

> I should've included a `.env.example` file for the user to copy it to `.env` with the appropriate env variables data. However, this project does not require any sensitive data so I'm gonna make an exception and include the `.env` file directly in this repo. (which I do not normally do :D)

<br />

Once the app is running, it will be available at [http://localhost:3000](http://localhost:3000)

## Run app using docker

Wana use docker? just make sure to have docker and docker compose installed and run the following command:

```
yarn docker-start
```

Or

```
sudo docker-compose -f docker-compose.yml up
```

Once the docker container is up and running, the app will be available at [http://localhost:3000](http://localhost:3000)

<br />

## Styling

For this project I had to create a design system from scratch using Figma. Once finished, I proceeded to create all the atomic UI components using React + SASS.

Apart from the components styling, every view / design element has it's own SASS file and the main app component has global styles reset rules applied to it.

This app was developed having responsiveness in mind.

> For this project I decided to use only SASS for styling. Normally, in my day to day FE tasks I also use JSX and styled components.

## Testing

I do have hands-on experience with jest and cypress and I would've loved to test very single component that I've developed. But due to time constraint I couldn't do extensive testing.

### `yarn test:unit`

Runs the unit test that I time to write.

## Notes

-   No router was used for the app to keep it simple and to avoid using any additional external libraries other than react.
-   Localization support is not added, but it would have been nice.
-   The search algorithms that are used are not the best. I would've loved to use a fuzzy search but I don't have enough time to implement it.
-   If this project belonged to a client, I would ask to clarify multiples things about the requirements:
    -   How does the user wants to use this app to determine how to implement a good UX for searching, filtering and navegation in general.
    -   How do they would like to search the price (exact values, a range or both)
    -   etc...
-   Due to my day job, it took me way too long to create all the components, and because of that I couldn't do extensive testing. :(
