# --- Build backend ---
FROM node:20-slim AS backend-build
WORKDIR /app/backend
COPY backend/package.json ./
COPY backend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY backend ./
# Clean any existing build info
RUN rm -f .tsbuildinfo
RUN yarn build

# --- Build frontend ---
FROM node:20-slim AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend ./
RUN yarn build

# --- Production image ---
FROM node:20-slim AS prod
WORKDIR /app

# Copy backend build and minimal files
COPY --from=backend-build /app/backend/dist ./backend/dist
COPY --from=backend-build /app/backend/package.json ./backend/package.json
COPY --from=backend-build /app/backend/yarn.lock ./backend/yarn.lock

# Install only production dependencies for backend
WORKDIR /app/backend
RUN yarn install --production --frozen-lockfile

WORKDIR /app

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Install serve for static frontend
RUN yarn global add serve

EXPOSE 3000 5173

CMD ["sh", "-c", "node ./backend/dist/main.js & serve -s ./frontend/dist -l 5173"]
