# Circlo

Circlo is a React/Vite frontend with an Express/MongoDB backend.

## Requirements

- Node.js 18 or newer
- A MongoDB database (MongoDB Atlas or a local MongoDB server)
- A Cloudinary account for profile/company image uploads

## Setup

1. Create a MongoDB database and database user. In Atlas, add your current IP address to the project's IP access list, then choose **Connect → Drivers → Node.js** to get a connection string.
2. Create the backend environment file:

   ```sh
   cp backend/.env.example backend/.env
   ```

   Edit `backend/.env` with your MongoDB URI, a long random `SECRET_KEY`, and your Cloudinary credentials. Keep this file private; it is ignored by Git.
3. From the repository root, install all project dependencies once:

   ```sh
   npm run setup
   ```

4. Start both the backend and frontend from the repository root:

   ```sh
   npm start
   ```

   Wait for the messages confirming the server is listening and MongoDB is connected, then open the Vite URL printed in the terminal (usually `http://localhost:5173`).

The backend defaults to port `8000`, which matches the frontend API URLs. The backend only starts listening after it successfully connects to MongoDB.

## Production frontend build

From the repository root, run:

```sh
npm --prefix frontend run build
```

The backend and frontend have separate package files; `npm run setup` installs dependencies in all three project folders. `npm start` runs both development servers and stops both if either exits.

## DevOps

Run the application locally with the Docker Compose:

```sh
docker compose up --build
```

The backend is available at `http://localhost:5000` and the frontend at `http://localhost:3000`. The GitHub Actions workflow in `.github/workflows/ci-cd.yml` runs `build-test` for backend and frontend on pushes and pull requests, then runs `docker-publish` after successful tests on pushes to `main`.

Configure these GitHub repository secrets for Docker Hub publishing:

- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`
