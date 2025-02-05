

Decided to go with Next,js framework with tailwindcss and Jest testing framework, I knew that it would be a bit of a challenge seeing that I have just started on a next.js project
internally.

The builds and setup were quite straight forward and I was developing shortly. Of course nextjs uses its file structure 
for routing, had to look into how to check if the user's id is still valid to allow access made a reusable function seeing that most
of the components required auth to either login, update, and get

broke down components for more modularity and easier management.

Did have some challenges making a get call to the DB, but a few tutorials later data was officially pulling through

Added utils to hold all firebase related configuration as well as certain function to Register a new user and login with an existing user

Pain points/ Challenges: 
Getting Data from the Firestore took a little longer than I had planned
Had some issues with Hydration where it conflicts between the SSR and client side Rendering

Was struggling to mock out the firebase onAuth and initializeApp functions for my unit tests

