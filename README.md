# Items Manager

Simple web app to manage items.

This project is made with:

-   React
-   Custom design system (built fuuly from scratch)
-   Typescript
-   MobX for global state
-   SASS

> For this project I decided to use only SASS for styling. Normally, in my day to day FE tasks I also use JSX and styles components.

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

In the project directory, you can run to following command to run the project.

```
yarn start
```

> I should include a `.env.example` file for the user to copy it to a new file `.env` with the appropriate env variables data. However, this project does not require any sensitive data from user so I'm gonna make an exception and serve the `.env` file. (which I do not do normally :D)

<br />

Once your app is running, it will be available at [http://localhost:3000](http://localhost:3000)

## Styling

For this project I had to create a design system from scratch using figma. Once finished, I proceeded to create all the atomic UI components using react + SASS.

Apart from the components styling, every view / design element has it's own SASS file and the main app has global styles reset rules applied to it.

This app was developed have responsiveness in mind.

## Testing

### `yarn test:unit`

> in development...

### `yarn test:integration`

> in development...

## Notes

-   Localization support was not added, but it would have been nice.
-   The search algorithms that are used are not the best. I would've loved to use a fuzzy search but I don't have enough time to implement it form scratch.
-   If this project belogned to a client, I would clarify multiples tings about the requirements:
    -   What is there workflow to determine how to implement a good search bar.
    -   How do they would like to search the price (absolute values, a range or both)
    -   etc...
