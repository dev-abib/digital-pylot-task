# LuxeDrive — Project Specification & Requirement Mapping

## 1. Project Summary & Scope
LuxeDrive is a comprehensive full-stack car rental platform and fleet operations dashboard developed as a technical assessment for the **Web Designer/Developer + AI Automation** role.

The project is structured as a dual-surface application hosted within a unified Next.js 16 App Router monorepo:
1. **Executive Admin Dashboard (`/admin`)**: Real-time fleet utilization telemetry, dynamic revenue/booking charts (Recharts), reactive filter controls (date ranges, car categories), fleet register, and booking manifest.
2. **Customer-Facing Car Rental Portal (`/(customer)`)**: High-converting, responsive car rental storefront with hero search, categorized vehicle inventory, interactive detail views, and a multi-step booking checkout flow.
3. **AI Concierge (`/app/api/chat` + `ChatBotWidget`)**: An intelligent rental assistant powered server-side by the **OpenAI Responses API**, reasoning over rental policies and the vehicle fleet catalogue to answer FAQs and deliver personalized vehicle recommendations.
4. **Automated Notification Pipeline (`/app/api/leads` + `lib/telegram.ts`)**: An automated lead and booking dispatch workflow that triggers instant alerts via the Telegram Bot API or webhook logger upon customer reservation.

---

## 2. Evaluation Criteria Breakdown

| Weight | Assessment Area | Focus & Implementation Details |
|---|---|---|
| **20%** | **UI/UX & Design Precision** | Modern aesthetics, clear hierarchy, responsive typography, micro-interactions, dark/light theme tokens, and adherence to design specifications. |
| **20%** | **Component Architecture & Clean Code** | Modular React 19 / Next.js 16 App Router code, shadcn/ui primitives, typed interfaces, and zero spaghetti/hardcoded markup. |
| **20%** | **Data Layer & Mock API Integration** | Dynamic Route Handlers (`/app/api/*`) simulating realistic query filtering, pagination, and date-range calculations. |
| **15%** | **AI Concierge Integration** | Server-side integration with the **OpenAI Responses API** using `OPENAI_MODEL` env configuration, rental policy system instructions, and catalogue grounding. |
| **15%** | **Automation & Workflow Engineering** | Multi-channel lead submission pipeline triggering instant Telegram bot notifications upon customer reservation inquiry. |
| **10%** | **Documentation, Delivery & Polish** | Complete, submission-ready documentation (`README.md`, `PROJECT.md`, `ARCHITECTURE.md`, `TODO.md`), zero build errors, and clean Vercel deploy readiness. |

---

## 3. Requirement to Codebase Mapping

| Requirement | Route / Surface | Implementation File(s) | Description |
|---|---|---|---|
| **Admin Overview** | `/admin` | [`app/admin/page.tsx`](file:///c:/spl_features/prac/app/admin/page.tsx) | Live dashboard with metric cards, revenue chart, and recent bookings. |
| **Stats Cards** | `/admin` | [`components/admin/StatsCards.tsx`](file:///c:/spl_features/prac/components/admin/StatsCards.tsx) | Total revenue, active bookings, fleet availability, and lead counter. |
| **Revenue Charts** | `/admin` | [`components/admin/RevenueChart.tsx`](file:///c:/spl_features/prac/components/admin/RevenueChart.tsx) | Recharts Area and Bar charts for revenue trends and category distribution. |
| **Dashboard Filters** | `/admin` | [`components/admin/DashboardFilters.tsx`](file:///c:/spl_features/prac/components/admin/DashboardFilters.tsx) | Dropdowns for 7d/30d/90d timeframes and vehicle categories that re-fetch mock API. |
| **Fleet Inventory (Admin)** | `/admin/vehicles` | [`app/admin/vehicles/page.tsx`](file:///c:/spl_features/prac/app/admin/vehicles/page.tsx) | Fleet asset register table with availability statuses and search. |
| **Bookings Manifest** | `/admin/bookings` | [`app/admin/bookings/page.tsx`](file:///c:/spl_features/prac/app/admin/bookings/page.tsx) | Reservation table with status filters (`active`, `confirmed`, `pending`, `completed`). |
| **Leads & Inquiries CRM** | `/admin/leads` | [`app/admin/leads/page.tsx`](file:///c:/spl_features/prac/app/admin/leads/page.tsx) | Lead register showing source channels (`website_form`, `chatbot`, `booking_inquiry`). |
| **Customer Storefront** | `/` | [`app/(customer)/page.tsx`](file:///c:/spl_features/prac/app/(customer)/page.tsx) | Hero with search bar, featured cars, category highlights, and rental policies. |
| **Vehicle Directory** | `/vehicles` | [`app/(customer)/vehicles/page.tsx`](file:///c:/spl_features/prac/app/(customer)/vehicles/page.tsx) | Search, category filters, price slider, transmission & fuel filters. |
| **Vehicle Details** | `/vehicles/[id]` | [`app/(customer)/vehicles/[id]/page.tsx`](file:///c:/spl_features/prac/app/(customer)/vehicles/[id]/page.tsx) | High-res showcase, feature tags, technical specs, and instant booking modal. |
| **Booking Flow & Modal** | Customer Site | [`components/customer/BookingModal.tsx`](file:///c:/spl_features/prac/components/customer/BookingModal.tsx) | Multi-day price calculator, reservation registration, and lead automation trigger. |
| **AI Rental Concierge** | Global Widget | [`components/customer/ChatBotWidget.tsx`](file:///c:/spl_features/prac/components/customer/ChatBotWidget.tsx) | Floating AI assistant with prompt chips, policy answers, and vehicle recommendations. |
| **AI Responses API Route** | `/app/api/chat` | [`app/api/chat/route.ts`](file:///c:/spl_features/prac/app/api/chat/route.ts) | Server-side handler with system instructions, fleet context, and env model resolution. |
| **Automation Dispatch Route** | `/app/api/leads` | [`app/api/leads/route.ts`](file:///c:/spl_features/prac/app/api/leads/route.ts) | Receives leads and dispatches instant Telegram bot alerts or logs webhook notifications. |
| **Telegram Bot Helper** | Shared Utility | [`lib/telegram.ts`](file:///c:/spl_features/prac/lib/telegram.ts) | Formats and dispatches markdown notification payloads to Telegram chat. |
| **Mock Data Store & Helpers** | Shared Lib | [`lib/mock-data.ts`](file:///c:/spl_features/prac/lib/mock-data.ts) | Realistic vehicle inventory, bookings, lead records, and query filtering utilities. |
| **Type Definitions** | Shared Lib | [`lib/types.ts`](file:///c:/spl_features/prac/lib/types.ts) | TypeScript interfaces for vehicles, bookings, leads, dashboard metrics, and chat. |
