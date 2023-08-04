# medium-lite
To create a back-end analogue of the Medium service, we used the following technology stack:
- NestJS - a framework for building server applications on Node.js
- TypeScript - a strongly typed programming language
- Sequelize - ORM for working with databases (we used PostgreSQL in this project)

Entities we used in the project:
  user
   - id: number - unique user ID
   - email: string - user's email
   - password: number - user password
   - posts: Post[] - array of posts written by the user

 post
   - id: number - unique post ID
   - title: string - post title
   - content: string - post content
   - author: User - post author

### Backend features:
- Authorization - the user can authorize by passing his email and password. In case of successful authorization, the server returns a JWT token, which the user can use to access other functions.
- Post creation - The user can create a new post by passing in the title, content, and their JWT token. The server binds the author to the post and saves it to the database.
- List of user posts (+ pagination) - the user can get a list of his posts with the possibility of pagination. To do this, it passes its JWT token and page number.
- List of users (+ pagination) - the user can get a list of all users with the possibility of pagination. To do this, it passes its JWT token and page number.
- Getting a post by id - the user can get a post by its unique identifier. To do this, it passes its JWT token and post id.

Each request implies validation of the passed parameters, error handling and a clear response in case of errors.
Also, we implemented the calculation of the reading time of the post, as in the Medium service. For this, we used an average reading speed of 250 words per minute. The server calculates the post reading time and returns it along with the rest of the post data.

Additionally, we have added a rating in posts and a user rating, which is calculated based on the rating of his posts.

### To start the project you need:
- Install dependencies with command: npm install
- Create PostgreSQL database and set up connection in .env file
- Start the server with the command: npm run start
