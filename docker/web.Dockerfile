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
RUN pnpm build:web

FROM base
# Skip the interactive TTY prompt for removing node_modules
ENV CI=true 
COPY --from=prod-deps /app/apps/web/node_modules /app/apps/web/node_modules
COPY --from=build /app/apps/web/dist /app/apps/web/dist
EXPOSE 5173
CMD [ "pnpm", "deploy:web" ]