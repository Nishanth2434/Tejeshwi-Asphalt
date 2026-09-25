<div align="center">

# 🚧 Tejashwi Asphalt & Constructions 🚧

**A premium, high-performance website and full-stack Content Management System for an industry-leading construction firm.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[🌐 View Live Website](https://gsp-construction.vercel.app/) <!-- Update this link to your actual Vercel domain -->
<br/>

</div>

---

## 📸 Screenshots

*(Note: Replace these placeholder paths with actual screenshots of your application in the `/screenshots` folder!)*

### 🏢 Client Website
<div align="center">
  <img src="screenshots/home.png" alt="Home Page Preview" width="800" style="border-radius: 12px; margin-bottom: 20px;" />
  <img src="screenshots/services.png" alt="Services Preview" width="800" style="border-radius: 12px; margin-bottom: 20px;" />
</div>

### 🛡️ Admin CMS Dashboard
<div align="center">
  <img src="screenshots/admin_dashboard.png" alt="Admin Content Editor" width="800" style="border-radius: 12px; margin-bottom: 20px;" />
  <img src="screenshots/admin_settings.png" alt="Admin Settings" width="800" style="border-radius: 12px;" />
</div>

---

## ✨ Features

### 🏢 Public Client Website
- **Modern UI & Animations**: Silky smooth scroll animations using Framer Motion.
- **Dynamic Content**: Every text block, image, and service card is pulled in real-time from the Supabase database.
- **Responsive Design**: Beautiful layouts across desktop, tablet, and mobile.
- **Service & Project Galleries**: Dedicated views for company services, heavy equipment, and completed projects.
- **Interactive Contact Forms**: Integrated with Web3Forms for direct lead generation.

### 🛡️ Secure Admin CMS Studio
- **Authentication**: JWT-based secure login portal powered by Supabase Auth.
- **Live Content Editor**: Edit the entire website's copy, headers, and descriptions without writing code.
- **Navigation Builder**: Dynamically add, remove, and reorder website navigation links.
- **Client Inbox**: View incoming project inquiries directly inside the admin portal.
- **Account Security**: Secure password management with old-password verification.
- **Factory Reset**: A safety switch to restore the entire website back to its seed state instantly.

---

## 🏗️ Architecture

Built as a scalable NPM Workspace Monorepo containing two distinct applications:

| Technology                        | Why it was chosen                                                                            |
| :-------------------------------- | :------------------------------------------------------------------------------------------- |
| **React 19**                      | Mature component model, huge ecosystem, concurrent rendering for a snappy UI.                |
| **Vite**                          | Lightning-fast frontend build tooling and instant Hot Module Replacement.                    |
| **TypeScript**                    | End-to-end type safety preventing runtime errors.                                            |
| **Supabase**                      | Backend-as-a-Service providing PostgreSQL, Auth, and instant APIs.                           |
| **Tailwind CSS v3**               | Utility-first design system for rapid UI development without dead CSS.                       |
| **Framer Motion**                 | Declarative animations for high-end, premium website aesthetics.                             |
| **Lucide Icons**                  | Consistent, lightweight, tree-shakeable SVG icon set.                                        |
| **React Router v7**               | Client-side routing with nested routes and layout preservation.                              |
| **Vercel**                        | Edge network hosting with one-click automatic GitHub deployments.                            |

---

## ⚡ Performance

- 🚀 **Fast loading** - Optimized Vite bundling and aggressive code minification.
- 📱 **Responsive** - Fluid grid layouts, no layout shift between breakpoints.
- 🧩 **Component Modularity** - Reusable UI components (Buttons, Cards, Inputs).
- 🖼️ **Optimized Assets** - Compressed background images and web-safe SVGs.

---

## 🔒 Security

| Control                   | Implementation                                                                    |
| :------------------------ | :-------------------------------------------------------------------------------- |
| 🔑 **JWT authentication** | Signed, expiring session tokens attached to Admin API calls.                      |
| 🛡️ **Protected routes**   | Admin CMS is gated client-side using React Auth Providers.                        |
| 🧱 **Row Level Security** | Supabase database tables restrict write-access to authenticated admins only.      |
| 🔒 **HTTPS ready**        | TLS everywhere, secure cookies in production via Vercel.                          |

---

## 📱 Responsive Design

| Device         | Breakpoint   | Experience                                                                |
| :------------- | :----------- | :------------------------------------------------------------------------ |
| 💻 **Desktop** | > 1024px     | Full mega-menus, multi-column bento grids, and side-by-side CMS layouts.  |
| 📱 **Tablet**  | 768 - 1023px | Two-column layouts, condensed navigation bars.                            |
| 🤳 **Mobile**  | < 768px      | Stacked cards, hamburger menus, full-width inputs and action buttons.     |

---

## 🚀 Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nishanth2434/Tejeshwi-Asphalt.git
   cd Tejeshwi-Asphalt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the Development Servers:**
   ```bash
   npm run dev
   ```
   *The Client runs on `http://localhost:5173`*
   *The Admin runs on `http://localhost:5174`*

---

## 👨‍💻 Author

<table>
  <tr>
    <td align="center" width="180">
      <br/>
      <b>NISHANTH B</b><br/>
      <sub>Full-Stack Developer</sub>
    </td>
    <td>
      <p>Built the Tejashwi Asphalt website end-to-end - design system, frontend client, database schema and custom Admin CMS.</p>
      <a href="https://linkedin.com/in/your-profile"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
      <a href="https://github.com/Nishanth2434"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>
    </td>
  </tr>
</table>

---

<div align="center">

Made with ❤️ by **NISHANTH B**

<a href="#-features"><b>Features</b></a> •
<a href="#-installation--local-development"><b>Install</b></a>

<sub>Tejashwi Asphalt & Constructions - Building the future, today.</sub>

</div>
