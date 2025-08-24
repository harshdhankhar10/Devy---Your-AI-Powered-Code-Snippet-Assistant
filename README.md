
# Devy 🧠 - Your AI-Powered Code Snippet Assistant

[](https://www.google.com/search?q=https://github.com/harshdhankhar10/devy/actions)
[](https://opensource.org/licenses/MIT)
[](https://www.google.com/search?q=https://github.com/your-username/devy/stargazers)

**Store, enhance, and reuse your code snippets with the power of AI—transforming your trusted code into your best code.**

-----


## The Problem We All Face

Ever found yourself digging through old projects, scattered notes, or an endless list of browser bookmarks for that *one perfect function* you wrote months ago? We all have.

Traditional snippet managers help you store code, but they're just digital filing cabinets. They don't help you understand, improve, or adapt that code for new uses. You're left with a library of code you wrote, but you still have to manually refactor it, comment it, or translate it for your new project. The context-switching is a productivity killer.

## The Solution: Meet Devy ✨

**Devy isn't just another snippet manager. It's your intelligent coding partner.**

Devy is built on a simple but powerful idea: the most trustworthy code is the code you've already written. Our platform helps you take that trusted code and make it even better with a built-in AI layer.

Instead of asking an AI to generate new, potentially flawed code from scratch, Devy helps you **augment** the code you already know and trust. Refactor for performance, add clarifying comments, or translate it to another language—all with a single click, right inside your personal snippet library.

## Core Features

### 🗂️ Smart Snippet Management

  - **Create & Store:** Save unlimited private code snippets with a rich-text editor and syntax highlighting.
  - **Organize with Folders & Tags:** Structure your library your way with nested folders and powerful, multi-word tags.
  - **Lightning-Fast Search:** Instantly find any snippet by title, content, language, or tag.
  - **Version History:** (Pro Feature) Automatically save snapshots of your snippets every time you make a change, so you never lose a great idea.

### 🤖 AI Superpowers

  - **Refactor Code:** Clean up your code, improve performance, or convert it to modern syntax (e.g., JavaScript Promises to async/await).
  - **Add Comments:** Instantly generate clear, line-by-line comments to document a complex function.
  - **Rewrite & Translate:** Convert your code from one language to another (e.g., JavaScript → TypeScript, Python → Go).

### 🔗 Seamless Sharing

  - **Shareable Links:** Generate a secure public or private link to share your snippets with colleagues, classmates, or the world.
  - **Clean Public View:** Shared snippets are rendered beautifully with syntax highlighting, requiring no login to view.

## Tech Stack

Devy is built with a modern, scalable, and type-safe technology stack.

  - **Frontend:** [Next.js](https://nextjs.org/) (React), [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
  - **Backend & Database:** (PostgreSQL + Auth)
  - **ORM:** [Prisma](https://www.prisma.io/)
  - **AI Integration:** [Google Gemini](https://gemini.google.com/) 
  - **Authentication:** [NextAuth.js](https://next-auth.js.org/)
  - **Deployment:** [Vercel](https://vercel.com/)

## Getting Started (Local Development)

Want to run Devy on your local machine? Here’s how to get set up.

### Prerequisites

  - Node.js (v18 or later)
  - npm, yarn, or pnpm
  - Git

### 1\. Clone the Repository

```bash
git clone https://github.com/harshdhankhar10/devy.git
cd devy
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Set Up Environment Variables

Create a `.env.local` file in the root of the project by copying the example file:

```bash
cp .env.example .env.local
```

Now, fill in the `.env.local` file with your keys from Supabase, OpenAI, and your OAuth providers.

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_random_secret_string_for_jwt

# OAuth Providers (GitHub, Google, etc.)
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
```

### 4\. Run the Development Server

```bash
npm run dev
```

The application should now be running at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## 🚀 Future Roadmap

Devy is an actively developed project. Here are some of the exciting features we have planned:

  - [ ] **VS Code Extension:** Access, save, and use your Devy snippets without ever leaving your editor.
  - [ ] **Team Workspaces:** Create shared folders, manage roles, and build a collaborative team knowledge base.
  - [ ] **Project Cookbooks:** Create rich documentation that combines Markdown with live, executable code snippets.
  - [ ] **Developer Toolkit:** A suite of AI-powered utilities like a Regex Generator, JSON-to-Type Converter, and a Cron Job Explainer.
  - [ ] **GitHub Integration:** Sync snippets directly from your public or private GitHub Gists and repositories.

## 🤝 How to Contribute

We welcome contributions from the community\! Whether it's a bug fix, a new feature, or a documentation update, we appreciate your help.

1.  **Fork** the repository.
2.  Create a new branch (`git checkout -b feature/your-amazing-feature`).
3.  Make your changes.
4.  **Commit** your changes (`git commit -m 'Add some amazing feature'`).
5.  **Push** to the branch (`git push origin feature/your-amazing-feature`).
6.  Open a **Pull Request**.

Please open an issue first to discuss any significant changes you would like to make.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](https://www.google.com/search?q=LICENSE) file for more details.