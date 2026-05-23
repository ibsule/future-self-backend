FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM base AS prod-deps
# Skip the interactive TTY prompt for removing node_modules
ENV CI=true 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
# Skip the interactive TTY prompt for removing node_modules
ENV CI=true 
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build:api

FROM base
COPY --from=prod-deps /app/apps/api/node_modules /app/apps/api/node_modules
COPY --from=build /app/apps/api/dist /app/apps/api/dist
EXPOSE 5001
CMD [ "pnpm", "deploy:api"]