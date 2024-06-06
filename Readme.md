# Application Backend 
To run the application backend using Docker, follow these steps:
1. Run the Docker container using the following command:

    ```bash
    docker compose up -d --build
    ```

2.  - Mongo will start the container with the port 27017
    - Minio will start the container with the port 9000
    - Redis will start the container with the port 6379

--------------------------------
To run backend app follow these steps:
1. Generate file environment
    ```bash
    cp .env.example .env
    ```
2. Run migrations data to mongo database:
    ```bash
    npm run migrate
    ```
3. Run server 
    ```bash
    npm run start
    ```

That's it! Your application backend is now running.