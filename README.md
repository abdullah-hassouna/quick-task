# 🛒 React Shopping App

A responsive 3-page shopping application built with React and TypeScript.

---

## Pages

### 1. Products Page

Displays a list of product cards with a simulated API delay and loading state. Each card shows product details and an **Add to Cart** button.

### 2. Cart Page

Lists all items added to the cart with quantities and a calculated total price. Includes a **Proceed to Checkout** button.

### 3. Checkout Page

Collects delivery information:

- Phone number
- Delivery address (dropdown select with address detail preview)
- Payment details

All fields are validated — empty fields show an inline error message. Submitting the form clears the cart.

A persistent **header** is shown on all pages displaying the cart icon with a live item count badge.

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/) — form state management
- [Zod](https://zod.dev/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers) — schema validation
- [React Router](https://reactrouter.com/) — client-side routing
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [Lucide React](https://lucide.dev/) — icons
- [shadcn/ui](https://ui.shadcn.com/) — base UI components

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher (comes with Node.js)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

---

## Available Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Build the app for production         |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## Project Structure

```
src/
├── components/        # Reusable UI components (ProductCard, Header, etc.)
│   └── ui/            # shadcn/ui base components
├── context/           # React context (CartContext)
├── data-sample/       # Static sample data (addresses, products)
├── pages/             # Page components (Products, Cart, Checkout)
├── types/             # TypeScript type definitions
└── main.tsx           # App entry point
```

---

## Notes

- Product data is loaded with an artificial delay to simulate a real API call.
- Cart state is managed globally via React Context.
- All pages are fully responsive across mobile, tablet, and desktop screens.
