<div align="center">

# 🚧 Tejashwi Asphalt & Constructions 🚧

### A premium, high-performance website and full-stack Content Management System for an industry-leading construction firm.

<br/>

[![Live Website](https://img.shields.io/badge/🌐_Live_Website-Visit_Now-2563EB?style=for-the-badge&logoColor=white)](https://gsp-construction.vercel.app/)
[![Stars](https://img.shields.io/github/stars/Nishanth2434/Tejeshwi-Asphalt?style=for-the-badge&color=F59E0B)](https://github.com/Nishanth2434/Tejeshwi-Asphalt/stargazers)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Cloud-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](#-contributing)

</div>

---

## 🌐 Live Demo

<div align="center">

### Try the live website here 👇

<a href="https://gsp-construction.vercel.app/">
  <img src="https://img.shields.io/badge/🚀_LAUNCH_LIVE_APP-gsp--construction.vercel.app-2563EB?style=for-the-badge&logoColor=white" alt="Live Website" height="52" />
</a>

<br/><br/>

| Area                   | URL                                                  |
| :--------------------- | :--------------------------------------------------- |
| 🚧 Client Website      | https://gsp-construction.vercel.app                  |
| 🛡️ Admin CMS Login     | https://gsp-construction.vercel.app/admin/login      |

</div>

---

## 📸 A Look Inside — Website Trailer

<div align="center">

<b>🏠 Home — dynamic hero banner, services, and live company stats</b>

<img src="screenshots/home.png" alt="Tejashwi Asphalt home page" width="100%" />

</div>

<table>
  <tr>
    <td width="50%"><b>🏢 Services Page</b><br/><img src="screenshots/services.png" alt="Services page" /></td>
    <td width="50%"><b>🚜 Heavy Equipment</b><br/><img src="screenshots/equipment.png" alt="Equipment page" /></td>
  </tr>
  <tr>
    <td width="50%"><b>📞 Contact & Leads</b><br/><img src="screenshots/contact.png" alt="Contact form" /></td>
    <td width="50%"><b>🛡️ Admin Login</b><br/><img src="screenshots/admin-login.png" alt="Admin login page" /></td>
  </tr>
</table>

<div align="center">

<b>🛡️ Admin CMS — Edit content, navigation, and manage leads in real-time</b>

<img src="screenshots/admin-dashboard.png" alt="Admin CMS dashboard" width="100%" />

</div>

---

## ✨ Features

<table>
  <tr>
    <td width="33%">
      <h3>🔐 Authentication</h3>
      Email / password secure sessions using Supabase Auth to protect the Admin CMS.
    </td>
    <td width="33%">
      <h3>📝 Live Content Editor</h3>
      Admins can update text, images, and services globally without touching a line of code.
    </td>
    <td width="33%">
      <h3>🛡️ Admin Dashboard</h3>
      A private portal dedicated to managing the entire public-facing website.
    </td>
  </tr>
  <tr>
    <td>
      <h3>🧭 Dynamic Navigation</h3>
      Build, reorder, and hide navigation menu items directly from the CMS settings.
    </td>
    <td>
      <h3>📥 Client Inbox</h3>
      Collect leads via Web3Forms directly into the admin dashboard inbox.
    </td>
    <td>
      <h3>📱 Responsive Design</h3>
      Mobile-first layouts — beautiful fluid grids adapt seamlessly to phones and tablets.
    </td>
  </tr>
  <tr>
    <td>
      <h3>✨ Fluid Animations</h3>
      Premium aesthetic powered by Framer Motion for scroll-triggered fades and pops.
    </td>
    <td>
      <h3>🖼️ Advanced Galleries</h3>
      Filterable project portfolios and heavy equipment showcases.
    </td>
    <td>
      <h3>⏪ Factory Reset</h3>
      A dedicated safety switch to instantly restore all database defaults if a mistake is made.
    </td>
  </tr>
</table>

<details>
<summary><b>🤖 Smart extras</b></summary>

- **Real-time CMS Sync** — Edits made in the dashboard instantly reflect on the client site.
- **Batched Save System** — Changes are held locally and saved globally via a batch-upsert to minimize database calls.
- **Undo Capability** — A local snapshot allows admins to instantly undo unsaved CMS edits.
- **Account Security** — Changing passwords requires verification of the previous password for maximum security.

</details>

---

## 🧰 Tech Stack

| Layer               | Technology                                                |
| :------------------ | :-------------------------------------------------------- |
| **Frontend**        | React 19 + Vite (Client and Admin portals)                |
| **Database**        | PostgreSQL (Supabase) + Row Level Security                |
| **Authentication**  | Supabase Auth — email/password, JWT sessions              |
| **Hosting**         | Vercel (edge deployment + CDN)                            |
| **Version Control** | Git + GitHub                                              |
| **UI Framework**    | Tailwind CSS v3                                           |
| **Icons**           | Lucide React                                              |
| **Animations**      | Framer Motion                                             |
| **Form Handling**   | Web3Forms (for contact submissions)                       |

---

## 🏗️ Architecture

The app is built as an NPM Workspace Monorepo containing two separated apps (`client` and `admin`). The frontend is statically deployed via Vite, and pulls all layout and content data dynamically from the Supabase PostgreSQL database.

```text
Frontend (React + Vite SPA)
        ↓
Supabase JS Client
        ↓
Authentication (JWT session for Admin)
        ↓
Database (PostgreSQL content & navigation tables)
```

```mermaid
flowchart TD
    U[Visitor Browser] --> FE[React Client App]
    A[Admin Browser] --> AD[React Admin App]
    AD --> AUTH[Supabase Auth - JWT]
    FE --> DB[(PostgreSQL Database)]
    AUTH --> DB
    FE --> FORMS[Web3Forms API]
    FORMS --> INBOX[Admin Inbox]
```

---

## 📁 Project Structure

```text
Tejeshwi-Asphalt/
├── package.json (Workspace Root)
├── apps/
│   ├── client/                 # Public Website App
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI & Layouts
│   │   │   ├── pages/          # Home, About, Services, Projects
│   │   │   ├── lib/            # Supabase fetchers & store
│   │   │   └── assets/         # Images, CSS
│   ├── admin/                  # Secure CMS Dashboard App
│   │   ├── src/
│   │   │   ├── components/     # CMS UI, Layouts
│   │   │   ├── pages/          # Content Editor, Navigation Editor, Settings
│   │   │   ├── lib/            # AuthContext, ProtectedRoute, CMS Logic
│   │   │   └── assets/         # CSS
├── screenshots/                # README images
```

---

## 🚀 Performance

- ⚡ **Fast loading** - Optimized Vite bundling and aggressive code minification.
- 📱 **Responsive** - Fluid grid layouts, no layout shift between breakpoints.
- 🧩 **Component Modularity** - Reusable UI components.
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

## 🤝 Contributing

Contributions make the open-source community amazing. Every PR is welcome!

<details open>
<summary><b>Contribution steps</b></summary>

1. **Fork** the repository
2. **Create a branch** - `git checkout -b feature/amazing-feature`
3. **Commit your changes** - `git commit -m "feat: add amazing feature"`
4. **Push the branch** - `git push origin feature/amazing-feature`
5. **Open a Pull Request** describing what changed and why

</details>

---

## 📄 License

Distributed under the **MIT License**.

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
