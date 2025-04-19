# electron-github-updater

An Electron application with React and TypeScript that showcases free updates
using GitHub.

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

## Release the Electron App

### Rename `.env.sample` to `.env` file

```bash
$ cp .env.sample .env
```

### Add GitHub Access Token to GitHub Repo

1. **Generate a Personal Access Token (PAT)** A Personal Access Token (PAT) is
   required for automated processes, such as GitHub Actions, to authenticate and
   interact with your GitHub repository on your behalf.
   1. Navigate to the
      [GitHub Personal Access Tokens page](https://github.com/settings/tokens).
      (_Path: GitHub > Settings > Developer settings > Personal access tokens_).
   2. Select either **"Fine-grained tokens"** (recommended for granular control)
      or **"Tokens (classic)"**.
   3. Click the **"Generate new token"** button.
   4. Provide a descriptive name for the token (e.g.,
      `electron-github-updater-release`).
   5. Configure the token's expiration date. Choose a duration based on your
      security policy.
   6. Define the necessary scopes (permissions) for the token. For release
      automation via Actions, typical requirements include:
      - `repo` (Required for accessing and managing private repositories)
      - `public_repo` (Required for accessing and managing public repositories)
      - `workflow` (Allows triggering and managing workflow runs)
      - `write:packages` (Needed if the workflow uploads packages to GitHub
        Packages)
      - `actions` (Specify read/write access for workflow management)
      - For basic release creation (without package uploads or workflow
        triggers), the `repo` scope is often sufficient. Apply the principle of
        least privilege by selecting only the scopes required for the workflow's
        function.
   7. Click **"Generate token"**.
   8. _Critically_: Immediately copy the generated token value. For security
      reasons, GitHub will not display the token again after you leave this
      page. Store it temporarily in a secure location before the next step.
2. **Add the Token as a Repository Secret** Store the generated PAT securely as
   a repository secret within GitHub. This prevents exposing the token directly
   in workflow files and makes it available to your GitHub Actions securely.
   1. Go to the main page of your target repository on GitHub.
   2. Click the **"Settings"** tab in the top menu bar.
   3. In the left-hand sidebar, navigate to **"Secrets and variables"**, then
      select **"Actions"**.
   4. Click the **"New repository secret"** button.
   5. Assign a name that precisely matches the environment variable used to
      reference the token within your workflow YAML file. Use
      `REPO_ACCESS_TOKEN`. _Note:_ Secret names prefixed with `GITHUB_` are
      reserved by GitHub and will result in an error.
   6. Paste the token value copied in step 1.8 into the "Value" field.
   7. Click **"Add secret"** to finalize.

### How Your App Gets Released

1. **Tag Your Code and Push the Tag**
   - The release process is initiated by pushing a Git tag matching a specific
     pattern (e.g., `v1.0.0`) configured in your workflow file to your GitHub
     repository.
   - Example commands to create and push an annotated tag:

     ```sh
     git tag v1.0.0
     git push origin v1.0.0
     ```

2. **GitHub Actions Workflow Runs**
   - Upon detecting the tagged push, GitHub automatically triggers the workflow
     defined in `.github/workflows/release.yml`.
   - This automated workflow executes a series of steps:
     1. Clones the repository content.
     2. Installs project dependencies using Bun.
     3. Executes build scripts to generate application artifacts for target
        operating systems (Linux, macOS, Windows).
     4. Collects the generated build artifacts (e.g., `.exe`, `.dmg`,
        `.AppImage`, etc.).
     5. Utilizes the `softprops/action-gh-release` action to programmatically
        create a new draft release on GitHub associated with the pushed tag, and
        uploads the collected build artifacts as release assets.
     6. Authenticates API calls to GitHub using the `REPO_ACCESS_TOKEN`
        repository secret made available to the workflow run.

3. **Draft Release Created**
   - Upon successful workflow completion, a draft release entry is generated on
     your GitHub repository's Releases page.
   - This is designated as a draft due to the `draft: true` parameter configured
     within the release action step in your workflow definition.
   - Finalization requires manual review, potential addition of release notes,
     and explicit publishing via the **"Releases"** section on GitHub.
