# 🚗 Best Auto / LuxeDrive — Full-Stack Car Rental Platform & Fleet Operations Dashboard

> **Technical Assessment Submission**: Web Designer/Developer + AI Automation  
> **Repository Architecture**: Next.js 16 App Router (Customer Storefront + Executive Operations Dashboard)  
> **Design Specifications**: Pixel-Perfect Figma Implementation (`node-id=1-4856`)  
> **Tech Stack**: Next.js 16 (Turbopack, React 19), Tailwind CSS v4, TypeScript, Lucide Icons  

---

## 📌 Project Overview

This project is a modern, high-performance automotive web application combining a **pixel-perfect, high-converting customer landing page** and an **executive operations dashboard** built according to the Figma design specifications.

---

## 🌟 Key Accomplishments & Features Built So Far

### 1. 🎨 Pixel-Perfect Customer Storefront & Landing Page (`/`)

#### A. **Navigation Header (`src/shared/Navbar.tsx`)**
- **Aesthetic Tone**: Seamless `#CBD0D8` background flowing into the hero section.
- **Navigation Links**: `Home`, `How it Work`, `Rental Details`, `Why Choose Us`, `Testimonial`, `| Register`.
- **Interactive Authentication**: `Log In` button (`px-6 py-2.5 rounded-[4px] bg-white text-[#131825]`) with interactive `AuthModal` (supporting Login & Register flows, profile badge, and active session state).
- **Direct Dashboard Access**: Integrated quick-navigation link to the executive admin dashboard.

#### B. **Hero Section (`src/components/Pages/Home/HomeHero.tsx`)**
- **Exact Figma Typography Specifications**:
  - **Tagline (`100% Trusted Car rental platform in the UK`)**: `font-size: 14px; font-weight: 500; color: #1A202C; line-height: 121.2%; font-family: "Plus Jakarta Sans"`.
  - **Main Heading (`FAST AND EASY WAY TO RENT A CAR`)**: `font-size: 46px; font-weight: 800; color: #1A202C; line-height: 121.2%; text-transform: uppercase;`.
  - **Description Paragraph (`Our Car Rental online booking system...`)**: `font-size: 16px; font-weight: 500; color: #596780; line-height: 160%; letter-spacing: -0.32px; max-width: 560px` formatted into 3 lines.
- **CTA Buttons**: `"Booking Now"` (`bg-white rounded-[4px] px-8 py-3.5`) and `"See all cars"`.
- **Layout & Spacing**:
  - Exact **`113px` gap** between the left typography column and the right image card.
  - **Right Hero Image (`Rectangle 23785`)**: Starts at `top: 77.17px`, features a top-left radius of `63px` (`rounded-tl-[63px]`), extends flush to the right viewport edge (`right-0 w-[50vw] xl:w-[48vw]`), and extends downward (`bottom: -55px`) behind the floating search bar.

#### C. **Pickup & Drop-Off Search Bar (`Rectangle 23788`)**
- **Background Container Strip**: `width: 100%; height: 145px; background: #F6F7F9;` positioned below the hero seam.
- **Floating Search Card**: `background: #F3F3F3; border-radius: 10px;` floating across the hero boundary (`-translate-y-1/2`).
- **Divided Sub-Fields**: `Pick – Up` and `Drop – Off` radio badges with 3 divided columns each (`Locations`, `Date`, `Time` with clean dropdowns).
- **Search Button**: Exact Figma properties (`width: 110px; height: 44px; padding: 0 20px; border-radius: 4px; background: #FFF; font-size: 16px; font-weight: 600; line-height: 150%; letter-spacing: -0.32px`).

#### D. **How It Works Guide (`src/components/Pages/Home/HowItWorks.tsx`)**
- Clean `#FFFFFF` background with balanced vertical padding.
- 3 step rental flow (`Choose Location`, `Pick-up Date`, `Book your car`) with custom squircle icon badges and connecting curved wave paths.

#### E. **Promotional Banners (`src/components/Pages/Home/PromoBanners.tsx`)**
- Background: `#F3F3F3`.
- 2 responsive promo banner cards with exact **`640px × 360px`** dimensions, `rounded-[10px]` corners, and hover zoom effects.

#### F. **Popular Car Deals (`src/components/Pages/Home/PopularDeals.tsx`)**
- Clean `#FFFFFF` background with 4 equal-width category tabs and full-width active indicator.
- Full-bleed car cards (`rounded-[10px]`, `aspect-[3/4]`, wishlist heart toggle, car specs, `Rent Now` button `rounded-[4px]`).
- Bottom control bar with centered `"Show more car"` button (`rounded-[4px]`) and right-anchored `"120 Car"` counter.

#### G. **Why Choose Us Section (`src/components/Pages/Home/WhyChooseUs.tsx`)**
- `#F3F3F3` section background.
- High-resolution car showcase with `rounded-[10px]` corners and 3 feature items with `rounded-[10px]` icon badges.

#### H. **Customer Reviews & Footer (`src/components/Pages/Home/Testimonials.tsx` & `src/shared/Footer.tsx`)**
- Testimonials carousel in `#C2C6CD` rounded cards with dynamic next/prev rotation and interactive pagination dots.
- Comprehensive footer with brand vision, social links, categorized lists, and copyright.

---

### 2. 📊 Executive Operations Dashboard (`/admin` & `/dashboard`)

#### A. **Collapsible Sidebar Navigation (`src/components/Dashboard/Sidebar.tsx`)**
- **Brand Identity**: `3Best Car` logo with red curve swoosh and collapsible toggle button (`«` / `»`).
- **Main Category**: `Dashboard` (active item with soft orange fill `bg-[#FFF4EC] text-[#FF8A00]` and expand indicator) and `Super Admin`.
- **Inventory Category**: `Products`, `Create Product`, `Expired Products`, `Low Stocks`, `Category`, `Sub Category`, `Brands`, `Units`, `Variant Attributes`, `Warranties`, `Print Barcode`, `Print QR Code`.
- **Stock Category**: `Manage Stock`, `Stock Adjustment`, `Stock Transfer`.
- **Sales & Promo Categories**: `Sales`, `Invoices`, `Sales Return`, `Quotation`, `POS`, and `Coupons & Deals`.

#### B. **Top Navigation Header (`src/components/Dashboard/Header.tsx`)**
- Global search input with `⌘ K` keyboard shortcut badge.
- `☁ Coming Soon ⌄` pill dropdown, `+ Add New` orange CTA button (`#FF9F43`), and `🖥 POS` dark button (`#131825`).
- Toolbar controls: Language flag 🇺🇸, Fullscreen toggle ⛶, Email notification ✉️ with `01` red badge, Notification bell 🔔, and Settings ⚙️.
- User profile: Photo of `Mike Witzel` with green active status dot and dropdown navigation menu.

#### C. **Greeting & Date Range Bar (`src/components/Dashboard/GreetingBar.tsx`)**
- `👋 Hi Mike Witzel, here's what's happening with your store today.`
- Date Range Selector: `📅 01 Jan 2024 - 07 Jan 2024` with refresh button `🔄` and collapse button `⌃`.

#### D. **Top 3 KPI Metric Cards (`src/components/Dashboard/StatsOverview.tsx`)**
- **Weekly Earning**: `$95000.45` with `▲ 48% increase compare to last week` and custom vector graphic illustration of money bag + growth chart.
- **No of Total Sales**: Orange gradient card (`#FF9F43` to `#FF8A00`) displaying `10,000+` with trending bar chart icon and refresh button.
- **No of Purchased Goods**: Deep slate navy card (`#132238`) displaying `800+` with money pouch icon and refresh button.

#### E. **Best Seller List (`src/components/Dashboard/BestSeller.tsx`)**
- Top 5 best selling cars with thumbnail, model name, price, and sales counter (`Range Rover` $260 / 6547 sales, `Audi S3` $1474 / 3474 sales, `Blue Nissan` $8784 / 1478 sales, `Toyota Corolla` $3240 / 987 sales, `Compact car` $597 / 784 sales) + `View All` action.

#### F. **Recent Transactions Table (`src/components/Dashboard/RecentTransactions.tsx`)**
- Interactive table with `#`, `Order Details` (image + name + `⏱ 15 Mins`), `Payment` (method + blue transaction ID `#416645453773`), `Status` badges (`● Success` in green, `● Cancelled` in red, `● Pending` in cyan), and `Amount`.

#### G. **Sales Analytics Area Chart (`src/components/Dashboard/SalesAnalyticsChart.tsx`)**
- Smooth SVG spline area curve with orange gradient fill (`#FF9F43`), interactive node markers with hover tooltips, and year filter `📅 2023 ⌄`.

#### H. **Sales by Countries World Map (`src/components/Dashboard/SalesByCountries.tsx`)**
- World vector map highlighting Africa in orange `#FF9F43` with floating tooltip `Africa | 3455 Sales`, North America & Asia in navy slate `#1E293B`, and footer growth statistic `▲ 48% increase compare to last week`.

#### I. **Dashboard Footer (`src/app/admin/layout.tsx`)**
- `2026 © All Right Reserved` on left, `Designed & Developed` on right.

---

## 📁 Repository Structure

```
digital-pylot-task/
├── public/                                # Static assets & high-resolution automotive imagery
│   ├── avatar_mike.jpg                    # Mike Witzel dashboard profile picture
│   ├── car_full_1.jpg                     # Hero showcase supercar
│   ├── car_full_2.jpg                     # High-res luxury sports car
│   ├── car_rush.jpg                       # Luxury performance car
│   ├── why_choose_us_car.jpg              # Why Choose Us feature image
│   ├── promo_banner_1.jpg                 # 640x360 Promo Banner 1
│   ├── promo_banner_2.jpg                 # 640x360 Promo Banner 2
│   └── hero_bg.jpg                        # Automotive studio background
│
├── src/
│   ├── app/
│   │   ├── (customer)/                    # Customer-Facing Storefront
│   │   │   ├── layout.tsx                 # Storefront layout (Navbar + Footer)
│   │   │   └── page.tsx                   # Main Landing Page
│   │   │
│   │   ├── admin/                         # Executive Operations Dashboard
│   │   │   ├── layout.tsx                 # Admin Layout with Sidebar & Header
│   │   │   └── page.tsx                   # Dashboard Main View
│   │   │
│   │   ├── dashboard/                     # Alias route pointing to /admin
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── globals.css                    # Tailwind CSS v4 tokens, fonts & smooth scrolling
│   │   └── layout.tsx                     # Root HTML layout with Google Fonts
│   │
│   ├── components/
│   │   ├── Cards/
│   │   │   ├── AuthModal.tsx              # Sign In / Register dialog modal
│   │   │   └── BookingModal.tsx           # Multi-day price calculator & booking modal
│   │   │
│   │   ├── Dashboard/                     # Dashboard Modular Components
│   │   │   ├── BestSeller.tsx             # Top 5 best selling cars list
│   │   │   ├── GreetingBar.tsx            # Greeting & Date Range Bar
│   │   │   ├── Header.tsx                 # Top Dashboard Header with Search & User Menu
│   │   │   ├── RecentTransactions.tsx     # Order details & status table
│   │   │   ├── SalesAnalyticsChart.tsx    # Smooth SVG spline area curve chart
│   │   │   ├── SalesByCountries.tsx       # World map with country sales highlight
│   │   │   ├── Sidebar.tsx                # Collapsible multi-category sidebar
│   │   │   └── StatsOverview.tsx          # 3 Top KPI metric cards
│   │   │
│   │   └── Pages/
│   │       └── Home/                      # Storefront Landing Sections
│   │           ├── HomeHero.tsx           # Pixel-perfect Hero & Search Bar
│   │           ├── HowItWorks.tsx         # 3-step rental flow
│   │           ├── PopularDeals.tsx       # Categorized fleet tabs & car cards
│   │           ├── PromoBanners.tsx       # 640x360 promotional cards
│   │           ├── Testimonials.tsx       # Interactive review carousel
│   │           └── WhyChooseUs.tsx        # Feature highlights & car image
│   │
│   ├── data/
│   │   └── mockData.ts                    # Complete vehicle database (36+ cars) & reviews
│   │
│   └── shared/
│       ├── Navbar.tsx                     # Global navigation bar
│       └── Footer.tsx                     # Global footer
│
├── next.config.ts                         # Next.js configuration & remote image domains
├── package.json                           # Dependencies & scripts
├── tsconfig.json                          # TypeScript configuration
└── README.md                              # Technical documentation
```

---

## 🚀 Running the Application Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Pages**:
   - **Customer Landing Page**: [`http://localhost:3000`](http://localhost:3000)
   - **Executive Operations Dashboard**: [`http://localhost:3000/admin`](http://localhost:3000/admin) or [`http://localhost:3000/dashboard`](http://localhost:3000/dashboard)

4. **Verify TypeScript & Production Build**:
   ```bash
   npx tsc --noEmit
   npm run build
   ```
