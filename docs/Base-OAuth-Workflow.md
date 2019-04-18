# OAuth (Overview)

## Basic Workflow of OAuth
--> Browser requests to our sever on a specific route (/auth/goggle)

--> Sever handles the request (/auth/google handler)

--> OAuth Provider (Google in our case) Grants Permission

--> Redirects to the custom route (/auth/google/cb*) (cb as in Call Back)

--> Receives user details from provider* (Google)

--> Lookup/Create user in our own Database* (In our case we will be using MongoDB)

--> Create Unique Cookie

--> Decode the cookie & retrive the User Information