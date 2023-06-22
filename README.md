# Pokédex Web App Documentation
## Overview

The Pokédex Web App is a web application built using ReactJS that allows users to explore and retrieve information about Pokémon characters using the PokéAPI. It provides features such as searching for Pokémon, browsing through different categories, accessing detailed information, bookmarking favorite Pokémon, and more.

## Getting Started

To get started with the Pokédex Web App, follow the steps below

1. Clone the repository from GitHub: 
```bash
git clone https://github.com/aleric-cusher/pokemon-app.git
```
2. Install dependencies:
```bash
cd pokemon-app
npm install
```
Start the development server:
```bash 
npm run dev
```
Access the app in your browser at http://localhost:5173


## Folder Structure

The folder structure of the Pokédex Web App is as follows:

```
Pokédex Web App
|
│   index.html
│   package-lock.json
│   package.json
│   readme.md
│   tree.txt
│   vite.config.js
│           
├───public
└───src
    │   App.css
    │   App.jsx
    │   index.css
    │   main.jsx
    │   
    ├───assets
    │       legendaryIcon.png
    │       mythicalIcon.png
    │       
    ├───components
    │   │   ListingComponent.jsx
    │   │   PaginationComponent.jsx
    │   │   PokemonCard.jsx
    │   │   SearchBar.jsx
    │   │   StatBar.jsx
    │   │   
    │   └───global
    │           ErrorPopup.jsx
    │           TopBar.jsx
    │           
    ├───contexts
    │       BookmarkContext.jsx
    │       DataContext.jsx
    │       ErrorContext.jsx
    │       
    ├───pages
    │       BookmarksPage.jsx
    │       DetailsPage.jsx
    │       HomePage.jsx
    │       SearchPage.jsx
    │       
    └───utils
            pokemonColors.jsx
            pokemonShuffler.jsx
    
```

The public folder contains the HTML template (index.html) for the web app.
The src folder contains the main source code of the application.
The components folder holds the different components used in the app, such as the homepage, search page, listing page, details page, bookmarks page, and more.
The App.js file is the main entry point of the application, where the routing and navigation logic is defined.
The index.js file renders the root component (App.js) into the DOM.

## Features
### Homepage

The homepage serves as the entry point of the Pokédex Web App. It provides a brief introduction to the app and its features. Users can click on the "Search Pokémon" button to navigate to the search page or click on the "View Bookmarks" button to access their bookmarked Pokémon.

### Search Page

The search page allows users to search for Pokémon by their name. Upon entering a Pokémon name and clicking the search button, the app makes an API call to retrieve the search results from the PokéAPI. The search results display the matching Pokémon, and users can click on a Pokémon to view its details.

### Listing Page

The listing page displays all the Pokémon returned by the API. It presents the Pokémon in a grid format, showing their images and titles. As the user scrolls, the app dynamically loads more Pokémon using the infinite scroll functionality. Users can apply filters to narrow down the results based on abilities, characteristics, group, habitat, location, species, and more.

### Details Page

The details page provides in-depth information about a selected Pokémon. It displays various details obtained from the API, including abilities, characteristics, types, stats, evolution chain, and more. Users can bookmark their favorite Pokémon by clicking on the bookmark icon, and the app saves the bookmark locally on the device. Bookmarked Pokémon are shown with a pre-filled bookmark icon, and users can remove them from bookmarks by clicking on the same icon.

### Bookmarks Page

The bookmarks page shows all the Pokémon that users have bookmarked. The bookmarked Pokémon data is stored locally browser's local storage. Users can remove Pokémon from bookmarks, allowing them to manage their favorite Pokémons easily.

## Technologies Used

The Pokédex Web App is built using the following technologies:

>ReactJS: A JavaScript library for building user interfaces.

>React Router: A routing library for handling navigation and routing in the app.

>Material-UI: A UI component library that provides pre-designed, customizable components.

>PokéAPI: A public API that provides Pokémon-related data.

## Images and Videos

### HomePage
![Homepage](<extra/Screenshot 2023-06-19 211428.png>)

### SearchPage
![Alt text](<extra/Screenshot 2023-06-19 211500.png>)

### Search
![Alt text](<extra/Screenshot 2023-06-19 211517.png>)

### BookmarksPage
![Alt text](<extra/Screenshot 2023-06-19 211603.png>)

### DetailsPage
![Alt text](<extra/Screenshot 2023-06-19 212911.png>)
![Alt text](<extra/Screenshot 2023-06-19 at 21-29-24 Pokédex.png>)

### Video
<video src="extra/website_video.mp4" controls title="Pokedex"></video>
## Conclusion

The Pokédex Web App offers users an immersive experience to explore the world of Pokémon. With its intuitive interface, users can search for Pokémon, browse through categories, access detailed information, and bookmark their favorite Pokémon. The app provides a seamless and engaging experience for Pokémon enthusiasts and fans.
