# 🌴 Setharana Travels (සෙතරණ ට්‍රැවල්ස්)

> **A Premium, High-Performance, and Fully Responsive Travel Agency Web Platform with an Integrated Admin Management System.**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

---

## 📖 Overview

**Setharana Travels** is an all-in-one web solution designed specifically for a Sri Lanka-based tour and pilgrimage travel service operating from the sacred city of Anuradhapura. Built with a localized **Sinhala language interface**, modern animations, an interactive WhatsApp booking ecosystem, and a comprehensive **Admin Dashboard**, the platform provides a complete solution for managing travel packages, customer inquiries, gallery photos, and content updates in real time.

---

## ✨ Key Features

### 🌐 Client-Facing Web Experience
- **100% Localized Experience:** Natural Sinhala interface tailored to local travelers and pilgrimage groups.
- **Rich Aesthetics & Heritage Design:** Premium Deep Emerald (`#0E4B3A`) and Gold theme reflecting Sri Lankan cultural heritage.
- **Dynamic Tour Packages:** Filterable pilgrimage tours, one-day excursions, multi-day tours, school trips, and custom travel packages.
- **WhatsApp QR Code & Direct Chat:** Instant mobile-friendly WhatsApp QR scanner in the footer alongside one-click `wa.me` chat booking.
- **Interactive Photo Gallery:** Filterable visual showcase with category tabs (Pilgrimage, Nature, Cultural, Adventure).
- **Floating Contact Controls:** Quick WhatsApp and phone call floating action buttons with subtle micro-animations.
- **Contact & Booking Form:** Form validation powered by **React Hook Form** and **Zod** schema validation.
- **Interactive FAQ & Testimonials:** Customer review carousels and collapsible answers to common travel queries.
- **Smooth Animations:** Powered by **Framer Motion** (scroll reveals, stat counters, and modal popups).

### 🛠️ Admin Management Dashboard (`/admin`)
- **Secure Authentication:** Protected with **bcryptjs** password hashing and HTTP-only JWT session cookies via **jose**.
- **Package Management:** Create, edit, and delete travel packages with title, itinerary, duration, prices, and features.
- **Image Upload Integration:** Direct image upload powered by **ImgBB API** for cloud-hosted images.
- **Gallery Manager:** Upload, organize, and categorize images in the visual gallery.
- **Message & Inquiry Inbox:** Real-time customer inquiry tracking submitted through the contact form.
- **FAQs & Testimonials Editor:** Add and modify frequently asked questions and customer reviews.
- **Company Settings:** Update WhatsApp number, hotlines, emails, address, and social links in real-time.
- **Security & Password Management:** Change admin login password securely from within the dashboard.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Server Actions, Route Handlers) |
| **Frontend Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & ODM** | [MongoDB](https://www.mongodb.com/) + [Mongoose 9](https://mongoosejs.com/) |
| **Authentication** | [Jose](https://github.com/panva/jose) (JWT) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |
| **Form Handling** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **QR Code Generation**| [qrcode.react](https://github.com/zpao/qrcode.react) |
| **Cloud Image Storage**| [ImgBB API](https://api.imgbb.com/) |

---

## 📂 Project Structure

```text
SetharanaTravelWeb/
├── app/
│   ├── (protected)/          # Protected Admin dashboard routes (packages, gallery, etc.)
│   ├── actions/              # Server Actions for admin data mutations & auth
│   ├── api/                  # API endpoints (create-admin, uploads)
│   ├── admin/login/          # Admin sign-in screen
│   ├── packages/[id]/        # Individual package details view
│   ├── layout.tsx            # Global metadata, fonts, and structure
│   └── page.tsx              # Main homepage integrating all public sections
├── components/
│   ├── sections/             # Page sections: Hero, About, Services, Packages, Gallery, FAQ, Contact, Footer
│   └── ui/                   # Reusable components: Buttons, Cards, Modals, FloatingButtons
├── data/                     # Fallback initial data & Sinhala dictionary
├── models/                   # Mongoose schemas: User, Package, Service, Gallery, Testimonial, FAQ, ContactSettings
├── public/                   # Static assets: logos, icons, optimized travel photos
├── scripts/
│   └── seed-db.ts            # Database seeding script for initial deployment
├── utils/                    # DB connection handler, ImgBB uploader, contact utilities
└── .env.local                # Environment configuration variables
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18 or higher (v20+ recommended)
- **npm** or **pnpm** or **yarn**
- **MongoDB Atlas** database connection string

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/chamodya-hirusha/SetharanaTravel.git

# Navigate into the project directory
cd SetharanaTravel

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Database Connection URI
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/setharana_db?retryWrites=true&w=majority

# Admin Default Password (used during initial setup)
ADMIN_PASSWORD=setharana2024

# ImgBB API Key for cloud image uploads (optional, get from https://api.imgbb.com/)
IMGBB_API_KEY=your_imgbb_api_key_here

# JWT Secret for admin authentication sessions
JWT_SECRET=your_super_secret_jwt_key
```

### 4. Database Initialization (Optional)

To populate MongoDB with default tour packages, pilgrimage tours, gallery photos, testimonials, and FAQs:

```bash
npm run seed
```

To create or verify the default administrator account:
- Visit `http://localhost:3000/api/create-admin` in your browser, or log in using the credentials below.

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 🔐 Admin Credentials

Access the administration panel at `/admin/login`:

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@setharana.com`
- **Password:** `setharana2024`

*(Password can be modified securely under Admin > Security Settings).*

---

## 📦 Production Build

To test and create an optimized production build:

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 🧑‍💻 Developed By

Engineered and developed with ❤️ by **Braintisa**.

© 2024–2026 Setharana Travels. All rights reserved.
