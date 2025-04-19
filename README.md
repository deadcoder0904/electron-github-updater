# electron-github-updater

An Electron application with React and TypeScript that showcases free updates using GitHub.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) +
  [Deno + VSCode](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)

## Project Setup

### Install

```bash
$ bun install
```

### Development

```bash
$ bun run dev
```

### Build

```bash
# For windows
$ bun run build:win

# For macOS
$ bun run build:mac

# For Linux
$ bun run build:linux
```

## Github Access Token

### Rename `.env.sample` to `.env` file

```bash
$ cp .env.sample .env
```

### Enter Github Personal Access Token in `.env` file

Step-by-Step: Creating and Adding a GitHub Access Token

1.  **Generate a Personal Access Token (PAT)**
    1.  Go to [https://github.com/settings/tokens](https://github.com/settings/tokens) (GitHub > Settings > Developer settings > Personal access tokens).
    2.  Click "Fine-grained tokens" (recommended) or "Tokens (classic)".
    3.  Click "Generate new token".
    4.  Give your token a name (e.g., `electron-github-updater-release`).
    5.  Set the expiration (choose a reasonable time).
    6.  Select scopes/permissions:
        *   For releasing via Actions, you typically need at least:
            *   `repo` (for private repos)
            *   `public_repo` (for public repos)
            *   `workflow` (if you want to trigger workflows)
            *   `write:packages` (if you're uploading packages)
            *   `actions` (choose read/write)
        *   For most release workflows, `repo` is sufficient.
    7.  Click "Generate token".
    8.  Copy the token – you won't be able to see it again!
2.  **Add the Token as a Repository Secret**
    1.  Go to your repository on GitHub.
    2.  Click Settings (top menu).
    3.  In the left sidebar, click Secrets and variables > Actions.
    4.  Click "New repository secret".
    5.  Name the secret exactly as referenced in your workflow: `REPO_ACCESS_TOKEN` (DO NOT USE `GITHUB_` PREFIX as GitHub throws an error: `Secret names must not start with GITHUB_.`)
    6.  Paste your copied token into the value field.
    7.  Click "Add secret".
