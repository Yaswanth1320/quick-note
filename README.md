# QuickNotes

QuickNotes is a modern, full-stack note-taking application built with Next.js, offering a seamless and performant user experience. It features a rich text editor, notebook organization, and secure user authentication.

## Features

*   **Rich Text Editing:** Create and edit notes with a powerful WYSIWYG editor.
*   **Notebook Organization:** Group your notes into notebooks for better organization.
*   **User Authentication:** Secure sign-up and login functionality.
*   **Responsive Design:** A clean and intuitive interface that works on all devices.
*   **Theming:** Light and dark mode support.
*   **Email Notifications:** Integrated email services for user interactions.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Database:** [Drizzle ORM](https://orm.drizzle.team/) with [PostgreSQL](https://www.postgresql.org/)
*   **Authentication:** [Better Auth](https://github.com/better-auth/better-auth)
*   **UI:**
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Radix UI](https://www.radix-ui.com/)
    *   [Framer Motion](https://www.framer.com/motion/) for animations
    *   [Lucide React](https://lucide.dev/guide/packages/lucide-react) for icons
*   **Form Management:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **Editor:** [Tiptap](https://tiptap.dev/)
*   **Email:** [React Email](https://react.email/) & [Resend](https://resend.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v20 or later)
*   [npm](https://www.npmjs.com/)
*   A PostgreSQL database. You can use a local instance or a cloud provider like [Neon](https://neon.tech/).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Yaswanth1320/quick-note.git
    cd quicknotes
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. You can use the `.env.example` file as a template.

```
DATABASE_URL="your_postgresql_database_url"
```

## Available Scripts

In the project directory, you can run the following commands:

*   `npm run dev`: Runs the app in development mode with Turbopack. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
*   `npm run build`: Builds the app for production.
*   `npm start`: Starts the production server.
*   `npm run lint`: Lints the codebase using ESLint.

## Database

This project uses Drizzle ORM to manage the database schema. The schema is defined in `src/db/schema.ts`.

To generate migrations, run:
```bash
npx drizzle-kit generate
```

To apply migrations, run:
```bash
npx drizzle-kit migrate
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
