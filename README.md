# 🌴 Setharana Travels

> A Premium, Fast, and Fully Responsive Travel Agency Website built for the Sri Lankan Market.

Setharana Travels is a modern web application designed for a Sri Lanka-based travel and tour agency. Developed with a **100% Sinhala language interface**, the platform provides a seamless, culturally resonant experience for local travelers to explore pilgrimage packages, day tours, and vacation planning services.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)

---

## ✨ Key Features

- **100% Sinhala UI:** Entirely localized content, ensuring accessibility and comfort for the target demographic.
- **Premium Design:** A meticulously crafted, aesthetically pleasing interface featuring a curated color palette (Deep Green, Gold, and Amber) that reflects Sri Lankan heritage.
- **Fluid Animations:** Powered by Framer Motion, the site includes scroll-triggered fade-ins, dynamic stat counters, and smooth interactive hover states.
- **Fully Responsive:** Mobile-first design principles ensure the application looks and functions perfectly across all device sizes.
- **SEO Optimized:** Implemented Semantic HTML, dynamic meta tags, and structured JSON-LD Schema data for maximum search engine visibility.
- **Performance Focused:** Utilizes Next.js Image optimization (`next/image`) for fast-loading local imagery and static generation for peak performance.

## 🛠️ Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms & Validation:** React Hook Form + Zod

## 📂 Project Structure

```text
├── app/                  # Next.js App Router layout, pages, and metadata
├── components/
│   ├── sections/         # Major page sections (Hero, About, Packages, Contact, etc.)
│   └── ui/               # Reusable primitive UI components (Buttons, Cards, Modals)
├── data/                 # Centralized structured data (Packages, Testimonials, FAQs)
├── hooks/                # Custom React hooks (e.g., useCountUp, useScrollThreshold)
├── public/
│   └── images/           # Local optimized assets (Hero, Packages, Gallery, Avatars)
├── types/                # TypeScript interfaces and type definitions
└── tailwind.config.ts    # Global Tailwind configuration and theme variables
```

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd sinhala-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
```

This will output statically generated HTML and optimized assets into the `.next` directory. You can then test the production build locally:

```bash
npm run start
```

## 🧑‍💻 Development by Braintisa

This project was architected and developed by **Braintisa**, focusing on modern web standards, premium user experience, and localized digital solutions.

---
*Created with Braintisa in Sri Lanka.*
