# Your Memes

Welcome to the Your Memes project. This application allows you to create your own memes by adding custom texts to meme images fetched from an API. You can add as many text fields as you want, customize the font family, color, and size, and then download the resulting image. This project is built with React and hosted on a local development server.

![Meme Generator Preview](./memeGenerator/public/memeGeneratorGif.gif)

## Table of Contents 

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installing](#installing)
- [Running the App](#running-the-app)
- [Built With](#built-with)
- [Link](#link)
- [Author](#author)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

- Node.js installed on your local system.
- An API key from [Google Fonts API](https://developers.google.com/fonts/docs/getting_started).

### Installing

1. Clone the repo

```
git clone https://github.com/huseyinkaplan00/memegenerator.git
```

2. Install NPM packages

```
npm install
```

3. Create a `.env` file in the root of your project and add your Google Fonts API key:

```
REACT_APP_GOOGLE_FONTS_API_KEY=YOUR_API_KEY
```

### Running the App

After installing the project and satisfying the prerequisites, the application can be started:

```
npm run dev
```

Your application runs on `http://localhost:3000` in the browser.

## Built With

- [React](https://reactjs.org/) - The web framework used.
- [axios](https://axios-http.com/) - Promise-based HTTP client for the browser and node.js.
- [colorthief](https://lokeshdhakar.com/projects/color-thief/) - A script for grabbing the color palette from an image.
- [html2canvas](https://html2canvas.hertzen.com/) - JavaScript HTML renderer.
- [react-draggable](https://www.npmjs.com/package/react-draggable) - React component for draggable elements.
- [react-helmet](https://www.npmjs.com/package/react-helmet) - A document head manager for React.

## Link

-  [GitHub Pages](https://huseyinkaplan00.github.io/memeGenerator/)

## Author

- **Hüseyin Kaplan** - [Github](https://github.com/huseyinkaplan00/)

