# 🚗 Best Auto / LuxeDrive — Full-Stack Car Rental Platform, Operations Dashboard & AI Automation

> **Repository Architecture**: Next.js 16 App Router (Customer Storefront Landing Page + Executive Operations Dashboard + AI Concierge + Live Telegram Automation)  
> **Design Specifications**: Pixel-Perfect Figma Implementation (`node-id=0-1` & `node-id=1-4856`)  
> **Tech Stack**: Next.js 16 (Turbopack, React 19), Tailwind CSS v4, TypeScript, Lucide Icons, Telegram Bot API, OpenAI API  

---

## 🌐 Live Demo & Navigation Map

- **Live Production URL**: [https://digital-pylot-task-seven.vercel.app](https://digital-pylot-task-seven.vercel.app)
- **Customer Storefront**: [https://digital-pylot-task-seven.vercel.app/](https://digital-pylot-task-seven.vercel.app/)
- **Fleet Catalog & Vehicles Explorer**: [https://digital-pylot-task-seven.vercel.app/vehicles](https://digital-pylot-task-seven.vercel.app/vehicles)
- **Executive Operations Dashboard**: [https://digital-pylot-task-seven.vercel.app/admin](https://digital-pylot-task-seven.vercel.app/admin)
  - Fleet Inventory Management: [https://digital-pylot-task-seven.vercel.app/admin/fleet](https://digital-pylot-task-seven.vercel.app/admin/fleet)
  - Bookings Manifest: [https://digital-pylot-task-seven.vercel.app/admin/bookings](https://digital-pylot-task-seven.vercel.app/admin/bookings)
  - Inbound Leads CRM: [https://digital-pylot-task-seven.vercel.app/admin/leads](https://digital-pylot-task-seven.vercel.app/admin/leads)
  - Sales Analytics & World Map: [https://digital-pylot-task-seven.vercel.app/admin/sales](https://digital-pylot-task-seven.vercel.app/admin/sales)
  - Super Administrator: [https://digital-pylot-task-seven.vercel.app/admin/super-admin](https://digital-pylot-task-seven.vercel.app/admin/super-admin)
  - Settings & Integrations: [https://digital-pylot-task-seven.vercel.app/admin/settings](https://digital-pylot-task-seven.vercel.app/admin/settings)
- **Local Development URL**: `http://localhost:3000`

---

## 📌 Executive Summary & Feature Matrix

| Feature Domain | Status | Implementation Highlight |
|---|---|---|
| **UI/UX & Figma Implementation** | **100% Complete** | Pixel-perfect Figma reproduction (`#CBD0D8` hero, exact typography, `113px` gap, `Rectangle 23785` with `63px` radius, `#F3F3F3` search bar, custom icons, brand identity). |
| **Front-End Development & Responsiveness** | **100% Complete** | 100% mobile-friendly responsive layout: animated 3-bar morphing hamburger drawer, 2-column mobile car grid, smooth continuous testimonials slider with 4 pagination dots, and sticky glassmorphic navigation. |
| **Operations Dashboard & Controls** | **100% Complete** | Dedicated subpages for Fleet Inventory (with search, 5-way sorting, pagination, and dual Grid/Table view), Bookings Manifest, Leads CRM, Sales Analytics, and Express POS terminal. |
| **AI Rental Concierge** | **100% Complete** | Intelligent **AI Concierge (`ChatBotWidget.tsx` & `/api/chat`)** dynamically resolving `OPENAI_MODEL` with fallback, grounded in UK rental policies and fleet inventory with interactive vehicle recommendation cards. |
| **API & Telegram Automation** | **100% Complete** | **Automated Telegram lead pipeline (`/api/leads` & `src/lib/telegram.ts`)** that formats and dispatches instant Markdown reservation tickets to a live Telegram chat on customer booking with zero client secret exposure. |
| **Code Quality & Type Safety** | **100% Complete** | Modular component architecture, full TypeScript type-safety (`npx tsc --noEmit` clean with 0 errors), Next.js App Router patterns, and comprehensive documentation. |

---

## 🌟 Core System Architecture & Features

### 1. 🎨 Customer Front-End Portal (`/`)
- **Navigation Bar (`src/shared/Navbar.tsx`)**:
  - Desktop: Clean `#CBD0D8` header with `sticky top-0 z-50` backdrop blur, navigation links (`Home`, `How it Work`, `Rental Details`, `Why Choose Us`, `Testimonial`), and `Register` / `Log In` modal triggers matching the exact Figma specification.
  - Mobile: Animated 3-bar morphing hamburger with smooth slide-over 280px drawer, click-outside detection, and scroll lock.
- **Hero Showcase (`src/components/Pages/Home/HomeHero.tsx`)**:
  - Exact Figma typography: 46px 800-weight uppercase heading, 14px 500-weight tagline, and 16px description wrapped in 3 lines.
  - Exact `113px` gap between column text and image.
  - Right vehicle container (`Rectangle 23785`) with `top: 77.17px`, `borderTopLeftRadius: 63px`, right-flush alignment, and bottom bleed behind search bar.
- **Floating Search Card (`Rectangle 23788`)**:
  - `#F3F3F3` background sitting on `#F6F7F9` section strip.
  - Divided Pick-Up & Drop-Off sub-fields (`Locations`, `Date`, `Time`).
  - Search action immediately opens the booking reservation workflow with selected criteria pre-filled.
- **How It Works (`src/components/Pages/Home/HowItWorks.tsx`)**:
  - 3-step rental flow with custom squircle icon badges and connecting curve paths.
- **Promo Banners (`src/components/Pages/Home/PromoBanners.tsx`)**:
  - 2 responsive promotional banner cards (`640px × 360px`, `rounded-[10px]`) on `#F3F3F3`.
- **Popular Car Deals (`src/components/Pages/Home/PopularDeals.tsx`)**:
  - 4 category tabs with horizontal scroll on mobile.
  - **Modern 2-column mobile grid** (`grid-cols-2 lg:grid-cols-4`) displaying 2 cars per row on phones.
  - Wishlist toggle, real-time `Rent Now` modal trigger, and direct `See all cars` anchor.
- **Why Choose Us (`src/components/Pages/Home/WhyChooseUs.tsx`)**:
  - High-res vehicle showcase with feature badges on `#F3F3F3`.
- **Testimonials Slider (`src/components/Pages/Home/Testimonials.tsx`)**:
  - Smooth continuous CSS track slider with cubic-bezier easing (`cubic-bezier(0.22, 1, 0.36, 1)`), pause-on-hover, touch drag gestures, and fixed 4-dot pagination indicators.
- **Interactive Modals**:
  - **AuthModal (`src/components/Cards/AuthModal.tsx`)**: Sign In / Register dialog with active session management.
  - **BookingModal (`src/components/Cards/BookingModal.tsx`)**: Dynamic multi-day calculation, Zero-Excess Insurance add-on, and lead dispatch integration.

---

### 2. 📊 Executive Operations Dashboard (`/admin`)
- **Collapsible & Mobile Drawer Sidebar (`src/components/Dashboard/Sidebar.tsx`)**:
  - Brand identity `3Best Car` with red curve swoosh and collapse toggle (`«` / `»`).
  - Clean nested routes: `Dashboard`, `Fleet Inventory`, `Bookings Manifest`, `Leads & Inquiries`, `Sales Analytics`, `Super Admin`, and `Settings`.
- **Top Header (`src/components/Dashboard/Header.tsx`)**:
  - `sticky top-0 z-40` with glassmorphic `backdrop-blur-md`, real-time live autocomplete search with `⌘ K` hotkey, `+ Add New` vehicle CTA, `🖥 POS` walk-in terminal button, notification badges, fullscreen toggle, and profile menu.
- **Greeting & Live Timeframe Bar (`src/components/Dashboard/GreetingBar.tsx`)**:
  - Interactive date range dropdown (`7d`, `30d`, `90d`, `2024`) with live data refresh button and collapse toggle.
- **Top 3 KPI Metric Cards (`src/components/Dashboard/StatsOverview.tsx`)**:
  - **Weekly Earning**: `$95,000.45`, `48% increase`, custom SVG vector money bag + growth chart.
  - **No of Total Sales**: Orange gradient card (`#FF9F43` to `#FF8A00`) displaying `10,000+` with trending bar chart icon.
  - **No of Purchased Goods**: Deep slate navy card (`#132238`) displaying `800+` with money pouch icon.
- **Best Seller List (`src/components/Dashboard/BestSeller.tsx`)**:
  - Top 5 best selling vehicles with thumbnails, model names, pricing, and sales counters.
- **Recent Transactions Table (`src/components/Dashboard/RecentTransactions.tsx`)**:
  - Filter by `All`, `Success`, `Pending`, `Cancelled` with transaction codes and amounts.
- **Sales Analytics Area Spline Chart (`src/components/Dashboard/SalesAnalyticsChart.tsx`)**:
  - Smooth SVG spline curve with orange gradient fill (`#FF9F43`), interactive node markers, hover tooltips, and timeframe filter.
- **Sales by Countries World Map (`src/components/Dashboard/SalesByCountries.tsx`)**:
  - World vector map highlighting Africa in orange with `Africa | 3455 Sales` tooltip, North America & Asia in navy slate.
- **Fleet Inventory Asset Register (`src/components/Dashboard/FleetView.tsx`)**:
  - Full-text searching, 5-way sorting (Price, Rating, Name), category filters, dynamic pagination (4, 8, 12, 16 per page), and dual Grid / Table view toggle.
- **Inbound Leads & AI Inquiries CRM (`src/components/Dashboard/LeadsView.tsx`)**:
  - 4 KPI cards, multi-field search, status filtering, dual Table / Card view toggle, instant status updates, and Telegram live dispatch routing.
- **Express POS Terminal (`src/components/Dashboard/POSModal.tsx`)**:
  - Point-of-sale walk-in checkout with instant contract generation and mobile-responsive input grids.

---

### 3. 🤖 AI Feature Demonstration (`/api/chat` & `ChatBotWidget.tsx`)

The AI assistant utilizes the **OpenAI API** (dynamically configured via `OPENAI_MODEL` with flagship fallback) with strict grounding in the UK luxury rental knowledge base and real-time fleet inventory.

#### Live Verified Conversation Examples:

**Example 1: Rental Policy & Insurance Inquiry**
```markdown
👤 Customer: "What is your minimum rental age and what is the zero-excess insurance package?"

🤖 Best Auto AI Concierge (Provider: openai-live):
"The minimum rental age for standard vehicles at Best Auto / LuxeDrive UK is 21 years, while for luxury supercars, the minimum age is 25 years. All drivers must present a full valid driver’s license held for at least 1 year, along with a passport or ID and a credit card for the deposit.

The Zero-Excess Protection Package is an optional insurance upgrade available for $15 per day. This package provides $0 deductible coverage on tires, glass, bodywork, and includes 24/7 roadside recovery, offering you additional peace of mind during your rental experience."
```

**Example 2: Multi-Attribute Vehicle Recommendation**
```markdown
👤 Customer: "I want a luxury Mercedes or Range Rover SUV with 5 seats under 150 per day."

🤖 Best Auto AI Concierge (Provider: openai-live):
"You have excellent options within your budget for a luxury SUV. The Mercedes-Benz GLS 450 is available for $155/day, offering a luxurious experience with 7 seats. 

Alternatively, the Range Rover Velar is available at $95/day and comfortably seats 5 passengers. This model combines elegance and performance, making it a fantastic choice for your needs. If you would like to proceed with a reservation or need further assistance, please let me know!"

[Attached Interactive Vehicle Cards: Mercedes S-Class ($120/day) | Range Rover Velar ($95/day)]
```

---

### 4. ⚡ Automation & Lead Pipeline (`/api/leads` & `src/lib/telegram.ts`)

When a customer confirms a reservation or submits an inquiry, an automated pipeline constructs a formatted Markdown ticket and dispatches it in real time via the **Telegram Bot API**:

```markdown
🚗 NEW LUXURY RENTAL RESERVATION
━━━━━━━━━━━━━━━━━━━━
👤 Customer: Lady Eleanor Vance
📧 Email: eleanor.vance@mayfairvip.co.uk
📞 Phone: +44 20 7946 0888
🚘 Vehicle: Aston Martin Vantage
💵 Daily Rate: $195.00/day
📅 Pick-up Date: 2026-09-01
📅 Return Date: 2026-09-04
💰 Total Estimated: $585.00
🏷 Channel Source: `storefront_booking`
📝 Notes: VIP London Heathrow Terminal 5 curbside meet and greet requested with Zero-Excess insurance.
⏱ Timestamp: 28/08/2026, 10:31:40 UTC
━━━━━━━━━━━━━━━━━━━━
⚡ Automated Lead & Dispatch Pipeline by Best Auto
```

---

## 📁 Repository Structure

```
digital-pylot-task/
├── public/                                # High-resolution vehicle assets & brand graphics
│   ├── avatar_mike.jpg                    # Profile photo
│   ├── car_full_1.jpg                     # Supercar showcase asset
│   ├── car_full_2.jpg                     # Luxury sedan asset
│   ├── car_rush.jpg                       # Performance SUV asset
│   ├── why_choose_us_car.jpg              # Feature section car asset
│   ├── promo_banner_1.jpg                 # 640x360 Promo Banner 1
│   └── promo_banner_2.jpg                 # 640x360 Promo Banner 2
│
├── src/
│   ├── app/
│   │   ├── (auth)/                        # Auth Route Group
│   │   │   ├── login/page.tsx             # Login route
│   │   │   └── register/page.tsx          # Register route
│   │   │
│   │   ├── (customer)/                    # Customer Storefront Route Group
│   │   │   ├── layout.tsx                 # Includes Navbar, Footer, and AI ChatBotWidget
│   │   │   ├── page.tsx                   # Storefront Landing Page
│   │   │   └── vehicles/page.tsx          # Dedicated Fleet Explorer & Filter Page
│   │   │
│   │   ├── admin/                         # Executive Operations Dashboard (Route-Based)
│   │   │   ├── layout.tsx                 # DashboardContext provider, persistent sidebar, & header
│   │   │   ├── page.tsx                   # Overview KPI metrics, charts, & transactions
│   │   │   ├── fleet/page.tsx             # Fleet Inventory Asset Register
│   │   │   ├── bookings/page.tsx          # Bookings & Reservation Manifest
│   │   │   ├── leads/page.tsx             # Inbound Leads & AI Inquiries CRM
│   │   │   ├── sales/page.tsx             # Sales Analytics Spline Chart & World Map
│   │   │   ├── super-admin/page.tsx       # System health & staff roles
│   │   │   └── settings/page.tsx          # Live API credentials & automations
│   │   │
│   │   ├── api/                           # Next.js App Router REST & AI Route Handlers
│   │   │   ├── chat/route.ts              # Dynamic OpenAI API & fleet matcher
│   │   │   ├── leads/route.ts             # Lead ingestion & Telegram automation trigger
│   │   │   ├── dashboard/stats/route.ts   # Dynamic dashboard statistics & chart metrics
│   │   │   ├── vehicles/route.ts          # Vehicle fleet REST query API
│   │   │   ├── telegram/test/route.ts     # Diagnostic Telegram bot connectivity endpoint
│   │   │   └── bookings/route.ts          # Bookings creation & manifest API
│   │   │
│   │   ├── globals.css                    # Tailwind CSS design tokens
│   │   ├── layout.tsx                     # Root HTML layout with Google Fonts
│   │   └── not-found.tsx                  # Custom 404 Road Detour Page
│   │
│   ├── components/
│   │   ├── AI/
│   │   │   └── ChatBotWidget.tsx          # 24/7 AI Luxury Concierge Drawer & Widget
│   │   │
│   │   ├── Cards/
│   │   │   ├── AuthModal.tsx              # Quick Sign In / Register dialog modal
│   │   │   └── BookingModal.tsx           # Multi-day booking calculator & lead trigger
│   │   │
│   │   ├── Dashboard/                     # Operations Admin UI Components
│   │   │   ├── AddVehicleModal.tsx        # Add new vehicle to fleet
│   │   │   ├── BestSeller.tsx             # Top 5 best selling cars ranking
│   │   │   ├── BookingsView.tsx           # Bookings Manifest table
│   │   │   ├── FleetView.tsx              # Fleet Asset Register manager
│   │   │   ├── GreetingBar.tsx            # Greeting banner with timeframe filter
│   │   │   ├── Header.tsx                 # Dashboard top navigation bar
│   │   │   ├── LeadsView.tsx              # Leads & Inquiries CRM view
│   │   │   ├── POSModal.tsx               # Point-of-Sale terminal checkout
│   │   │   ├── RecentTransactions.tsx     # Order transactions table
│   │   │   ├── SalesAnalyticsChart.tsx    # Interactive SVG spline area curve
│   │   │   ├── SalesByCountries.tsx       # Interactive world vector map
│   │   │   ├── SettingsView.tsx           # Integrations and notification preferences
│   │   │   ├── Sidebar.tsx                # Collapsible multi-category navigation
│   │   │   ├── StatsOverview.tsx          # 3 Top KPI metric cards
│   │   │   └── SuperAdminView.tsx         # System health & tenant controls
│   │   │
│   │   └── Pages/
│   │       ├── Home/                      # Storefront Landing Sections
│   │       │   ├── HomeHero.tsx           # Pixel-perfect Hero & Pick-up/Drop-off bar
│   │       │   ├── HowItWorks.tsx         # 3-step rental flow
│   │       │   ├── PopularDeals.tsx       # Category fleet showcase
│   │       │   ├── PromoBanners.tsx       # 640x360 promotional cards
│   │       │   ├── Testimonials.tsx       # Smooth continuous track slider (4 dots)
│   │       │   └── WhyChooseUs.tsx        # Features & vehicle showcase
│   │       │
│   │       └── Vehicles/                  # Dedicated Fleet Catalog Components
│   │           └── VehicleCard.tsx        # Standalone vehicle card item
│   │
│   ├── data/
│   │   └── mockData.ts                    # Parameterized fleet database (36+ cars) & reviews
│   │
│   ├── lib/
│   │   ├── telegram.ts                    # Telegram Bot notification engine
│   │   ├── types.ts                       # Domain TypeScript interfaces
│   │   └── utils.ts                       # ClassName merger (clsx + twMerge)
│   │
│   └── shared/
│       ├── Navbar.tsx                     # Storefront Navbar with animated mobile drawer
│       └── Footer.tsx                     # Storefront Footer
│
├── .env.local.example                     # Environment variables template
├── next.config.ts                         # Next.js configuration & security headers
├── package.json                           # Dependencies & scripts
├── tsconfig.json                          # TypeScript configuration
└── README.md                              # Technical documentation
```

---

## 🚀 Running the Application Locally

1. **Clone & Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your credentials:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_MODEL=gpt-4o
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   TELEGRAM_CHAT_ID=your_telegram_chat_id_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Verify Application Routes**:
   - **Customer Storefront**: [`http://localhost:3000`](http://localhost:3000)
   - **Operations Admin Dashboard**: [`http://localhost:3000/admin`](http://localhost:3000/admin) or [`http://localhost:3000/dashboard`](http://localhost:3000/dashboard)

5. **Run Quality & Verification Suite**:
   ```bash
   npx tsc --noEmit
   npx eslint .
   npm run build
   ```

---

## 🔮 What I'd Improve With More Time

Given additional time for an enterprise production release, the following architectural enhancements would be implemented:

1. **Database & ORM Persistence (Prisma / Supabase)**:
   - Integrate **Prisma ORM** with **PostgreSQL / Supabase** to replace in-memory arrays for vehicles, bookings, leads, and transaction logs.
2. **Enterprise Authentication & Role-Based Access Control (NextAuth.js)**:
   - Integrate **NextAuth.js (Auth.js)** with JWT session cookies and OAuth providers (Google, GitHub).
   - Implement Next.js middleware route guards (`/admin/*`) enforcing `ADMIN` vs `CUSTOMER` role permissions.
3. **Stripe Payment Processing**:
   - Connect **Stripe Elements / Checkout Sessions** in the booking modal with automated webhook verification (`/api/webhooks/stripe`) to generate downloadable PDF receipts.
4. **Cloud Media Management (AWS S3 / Cloudinary)**:
   - Implement direct image uploads to **AWS S3** or **Cloudinary** inside `AddVehicleModal` with drag-and-drop support.
