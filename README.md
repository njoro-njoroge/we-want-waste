# Acknowledgement

Challenge by WeWantWaste. Developed by Njoroge as part of a frontend evaluation task

This project is a redesign of the "Choose Your Skip Size" page for [WeWantWaste.co.uk](https://wewantwaste.co.uk). The original functionality is preserved, but the design has been completely modernized with a focus on

1. mobile responsiveness,
2. user experience,
3. clean React code.

## My Approach

1. Problem & Goals
   Original page: Functional but outdated design, unclear selection states, and limited mobile optimization.

**Problem & Goals**
Original page: Functional but outdated design, unclear selection states, and limited mobile optimization.

**My focus**
-Preserve core functionality while modernizing the UI.
-Prioritize mobile-first responsiveness.
-Improve accessibility (keyboard navigation, ARIA labels).
-Keep code modular and maintainable.

**Image Handling**
Since the skip data response from the provided API did not include image URLs, I used locally stored images inside assets/images/skips/ and dynamically mapped them based on the skip size.

**THE HELP FUNCTION USED**

<pre>
 ```js export const getSkipImage = (size) => { return new URL(`../assets/images/skips/${size}.jpg`, import.meta.url).href; }; ```
  </pre>

## Features

- Modern and clean UI using **React** and **Tailwind CSS**
- Fully **responsive** layout for mobile and desktop
- Accessible skip selection using buttons and keyboard support
- Dynamic data fetching from the provided API endpoint
- Highlights selected skip and maintains accessibility standards

## Tech Stack

- **React 19** – For building the user interface
- **Tailwind CSS** – For utility-first responsive styling
- **Axios** – For handling API requests
- **Vite** – As the development build tool

### 1. Getting Started

```bash
git clone https://github.com/njoro-njoroge/we-want-waste
```

### 2. Install Dependencies

npm install

### 3. Run Development Server

npm run dev

**Live Demo**
You can try the live version of this redesign here:
https://codesandbox.io/p/sandbox/github/njoro-njoroge/we-want-waste
