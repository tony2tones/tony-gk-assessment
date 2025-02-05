# Development Notes

## Framework and Libraries Chosen
For this project, I decided to use the **Next.js** framework, paired with **TailwindCSS** for styling, and **Jest** for testing. Given that I have just started working on a Next.js project internally, I knew this would present some challenges, but I was eager to tackle them.

### Setup and Initial Development
The setup process was relatively straightforward. With Next.js handling file-based routing, I could focus on building out the core functionality without worrying too much about complex routing setup. I quickly got up and running with the Next.js build, and development began smoothly.

One of the early challenges was managing user authentication, particularly ensuring that only authenticated users could access certain parts of the app. To address this, I created a reusable function to check if the user's ID is still valid, as most of the components required authentication to allow actions like logging in, updating, or retrieving data.

### Modular Approach
To improve modularity and make the project more maintainable, I broke down the components into smaller, reusable pieces. This approach helped with both readability and management as I scaled the project.

### Data Fetching with Firebase
The biggest hurdle during development was retrieving data from Firestore. Initially, I ran into some challenges with making successful GET calls to the database. However, after consulting a few tutorials and reading through the documentation, I was able to implement a working solution, and data was successfully pulling through.

### Firebase Integration
To manage Firebase authentication and configuration, I created a utility file that handles all Firebase-related setup, including functions to register a new user and log in with an existing one. This utility encapsulates the logic for initializing Firebase and simplifies the authentication flow within the app.

---

## Pain Points & Challenges

### 1. Retrieving Data from Firestore
Fetching data from Firestore took a bit longer than I anticipated, as I initially encountered issues with asynchronous data fetching and the Firestore query structure. However, after diving deeper into Firebase's SDK and testing different approaches, I was able to resolve the issues and integrate data fetching seamlessly.

### 2. Hydration Issues
I ran into issues with **hydration** where there was a conflict between **Server-Side Rendering (SSR)** and **Client-Side Rendering (CSR)**. This resulted in a mismatch between the HTML generated on the server and the one expected by the client. To fix this, I had to review how Next.js handles SSR and CSR and implement conditional rendering based on whether the page is being rendered on the server or the client.

### 3. Mocking Firebase in Unit Tests
Mocking Firebase functions such as `onAuth` and `initializeApp` for my unit tests proved challenging. Jest doesn't naturally support Firebase's methods, so I had to explore different solutions and find a way to mock these functions effectively for testing. Eventually, I used Jest's `mockImplementation` to simulate Firebase functionality, allowing the tests to run without requiring real Firebase interactions.

### 3. Odd styling render behaviour
Unfortunately, I encountered an issue with TailwindCSS where the styles would reset or behave unexpectedly when I opened the dev tools. Specifically, I noticed that upon opening the dev tools, a hot-reloader would trigger and cause certain styles to "clear," though not the global styles. Some default styles seemed to take precedence, which affected the appearance of my components.

I tried troubleshooting the issue by revisiting the TailwindCSS setup, but was unable to fully resolve it. After some investigation, I discovered that this issue might be linked to how hot-reloading interacts with Tailwind's styles during development. Though the issue went away at some point, it has unfortunately returned.

This was a frustrating challenge, and I wasn't able to pinpoint a permanent fix, but I suspect it could be related to the build or caching behavior.

---

## Conclusion
Overall, the project has been a great learning experience. Despite the initial challenges with Firebase and SSR hydration, I was able to work through them and build a functioning app with user authentication and data fetching. The decision to go with Next.js and TailwindCSS helped streamline development, and using Jest for unit testing ensured that my app was robust and maintainable.

I'm looking forward to continuing to refine this project and implement more advanced features!
