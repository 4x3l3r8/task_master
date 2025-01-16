# Simple To do app - Techinnover

This is a simple app that tracks time to do tasks and when they are over due. It was buikt using vite, React Typescript, redux toolkit and chakra-UI.

This app can be run by cloning to your system, running the install command `npm install` then once all libraries are done installing, running `npm run dev` to start up the local server.

No backend is being used in this project but the tasks are saved in the browser's local storage to persist them between page loads.(Using this approach, I had to limit what I save to the storage cause of it's max capacity, not to quickly fill it to be able to save more tasks).

The only challenge faced here was for the images. It seemed counter-efficient to save the images to the local storage so I had to replace them with links to free images online to keep the functionality (simulating a real-life scenario where the images have to be uploaded to the image server first then the link sent to the backend server).

Extra features I would've added if given the time would be to make the date at the top of the page functional such that on click of the next and previous button, I can switch between tasks of different days
