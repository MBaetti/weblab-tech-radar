# Dockerfile for the server service
FROM node:20-bullseye-slim

# Install openssl (Prisma needs libssl) and clean up
RUN apt-get update && apt-get install -y --no-install-recommends \
  openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies like prisma, tsx)
RUN npm ci --no-audit --no-fund

# Copy the rest of the server sources
COPY . .

# Generate Prisma client during build (optional - Compose also runs generate)
RUN npx prisma generate || true

EXPOSE 3000

# Default command; Compose will typically override this with its own command
CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && npm run start"]

