# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
# ARG BUN_VERSION=1.0.14
# FROM oven/bun:${BUN_VERSION} as base
FROM node:20-alpine as base

LABEL fly_launch_runtime="Next.js"

# Next.js app lives here
WORKDIR /app

# Set production environment



# Throw-away build stage to reduce size of final image
FROM base as build

RUN npm install -g typescript --force

# Install packages needed to build node modules
RUN apk add --no-cache libc6-compat
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi
# RUN apt-get update -qq && \
#     apt-get install -y build-essential pkg-config python-is-python3

# Copy application code
COPY --link . .

# Install node modules
# COPY --link package.json ./
# RUN yarn install

# Build application
RUN yarn build

# Remove development dependencies
# RUN rm -rf node_modules && \
#     yarn install --ci


# Final stage for app image
FROM base

ENV NODE_ENV="production"

# Copy built application
COPY --from=build /app /app

# install libre
RUN apk update && apk add libreoffice fontconfig msttcorefonts-installer
RUN update-ms-fonts
RUN fc-cache -f

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "yarn", "start" ]
