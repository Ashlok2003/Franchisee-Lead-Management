# Stage 1: Build the backend
FROM node:18-bullseye AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY src/ ./src
COPY docs/ ./docs
COPY scripts/ ./scripts


# Stage 2: Run the backend
FROM node:18-bullseye

RUN apt-get update && apt-get install -y netcat-openbsd

WORKDIR /app
COPY --from=build /app /app

# COPY scripts/wait-for-db.sh .
# RUN chmod +x wait-for-db.sh

EXPOSE 5000

# CMD ["./wait-for-db.sh", "node", "src/index.js"]
CMD [ "node", "src/index.js"]
