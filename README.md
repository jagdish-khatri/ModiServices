# Modi Services — Financial Services Website

A professional, full-stack financial services website for **Modi Services**, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **PostgreSQL**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ (v24 recommended)
- PostgreSQL database
- npm v9+

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.local .env.local
# Then edit .env.local with your actual values (see Environment Variables below)
```

### 3. Set up the database
```bash
# Generate Prisma client
npm run db:generate

# Run migrations (creates tables)
npm run db:migrate

# Seed initial admin user
npx prisma db seed
```
> The default seed creates admin username `admin` with password `ChangeMe@123`.  
> **Change this before going live!** Set `SEED_ADMIN_USERNAME` and `SEED_ADMIN_PASSWORD` env vars.

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Admin dashboard: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📁 Project Structure

```
modi-services/
├── data/                        # CSV data files for investment charts
│   └── mutual_funds.csv         # Primary CSV (see CSV Schema below)
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Admin user seed script
├── public/
│   └── images/                  # Static assets (add founder photo here)
├── src/
│   ├── app/
│   │   ├── (main)/              # Public pages (Home + About Us)
│   │   │   ├── layout.tsx       # Shared Header + Footer layout
│   │   │   ├── page.tsx         # Home page
│   │   │   └── about/page.tsx   # About Us page
│   │   ├── admin/               # Admin section (protected)
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx   # Admin login
│   │   │   └── dashboard/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── enquiry/route.ts         # POST: submit enquiry
│   │   │   └── admin/
│   │   │       ├── enquiries/route.ts   # GET: list enquiries
│   │   │       ├── enquiries/[id]/route.ts  # GET/PATCH: detail & update
│   │   │       └── export/route.ts      # GET: CSV export
│   │   ├── privacy/page.tsx     # Privacy Policy
│   │   ├── terms/page.tsx       # Terms & Conditions
│   │   ├── not-found.tsx        # 404 page
│   │   ├── sitemap.ts           # Auto-generated sitemap.xml
│   │   ├── robots.ts            # robots.txt
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── layout/              # Header, Footer
│   │   ├── home/                # All home page sections
│   │   ├── about/               # About Us page sections
│   │   └── admin/               # Admin dashboard component
│   ├── config/
│   │   └── site.ts              # Central business configuration
│   ├── lib/
│   │   ├── prisma.ts            # Prisma singleton client
│   │   ├── csv-parser.ts        # CSV reading, validation, normalization
│   │   ├── utils.ts             # Utility functions + SIP calculator
│   │   └── validations.ts       # Zod schemas for form validation
│   ├── middleware.ts             # Route protection for /admin
│   └── types/
│       └── next-auth.d.ts       # NextAuth session type extensions
├── .env.local                   # Environment variables (do not commit)
├── .env.example                 # Template for env variables
└── package.json
```

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `NEXTAUTH_URL` | ✅ | Full URL of your website (e.g., `https://modiservices.in`) |
| `NEXTAUTH_SECRET` | ✅ | Random secret for JWT signing (32+ chars) |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Recommended | Business phone number displayed in UI |
| `NEXT_PUBLIC_BUSINESS_WHATSAPP` | Recommended | WhatsApp number (digits only for link) |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Recommended | Business email address |
| `NEXT_PUBLIC_BUSINESS_ADDRESS` | Recommended | Office address |
| `NEXT_PUBLIC_BUSINESS_HOURS` | Recommended | Business hours |
| `CSV_DATA_DIR` | Optional | Directory for CSV files (default: `data`) |
| `CSV_PRIMARY_FILE` | Optional | Primary CSV filename (default: `mutual_funds.csv`) |

Generate `NEXTAUTH_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 📊 CSV Data Files

### Location
Place CSV files in the `data/` folder at the project root. The application auto-detects all `.csv` files in this directory.

### Schema (auto-detected)
The CSV parser automatically detects:
- **Date column**: any column with "date", "month", "period", or "year" in its name
- **Value columns**: all other numeric columns

The primary file is `data/mutual_funds.csv`. The current sample includes:

| Column | Description |
|---|---|
| `Date` | Date in DD/MM/YYYY format |
| `HDFC_Equity_NAV` | Illustrative NAV figure |
| `Nippon_India_NAV` | Illustrative NAV figure |
| `SBI_Bluechip_NAV` | Illustrative NAV figure |
| `Nifty50_Index` | Illustrative index value |

> ⚠️ **The sample CSV contains illustrative data only — not real historical NAV data.** Replace it with your actual data files before publishing.

### Replacing CSV data
1. Place your CSV file(s) in the `data/` directory
2. Ensure the file has a date column and at least one numeric value column
3. Set `CSV_PRIMARY_FILE` in `.env.local` if using a different filename
4. Restart the dev server (or redeploy in production)

### Supported date formats
- `DD/MM/YYYY` (e.g., `01/04/2020`)
- `YYYY-MM-DD` (ISO)
- `DD-MM-YYYY`
- Month Year (e.g., `April 2020`)

---

## 🔐 Admin Dashboard

**URL:** `/admin/login`

### Default credentials (change before production!)
- Username: `admin`
- Password: `ChangeMe@123`

### Features
- Secure login via NextAuth (JWT sessions, 8-hour expiry)
- View all enquiries with search, filter by status, and pagination
- Update enquiry status: New → Contacted → In Progress → Closed
- Add internal follow-up notes
- Export filtered enquiries to CSV
- Audit log for status changes

### Changing the admin password
Run the seed script with custom credentials:
```bash
SEED_ADMIN_USERNAME=madhu SEED_ADMIN_PASSWORD="YourStrongPassword!" npx prisma db seed
```
Or update the database directly:
```bash
node -e "const b=require('bcryptjs'); b.hash('YourPassword',12).then(h=>console.log(h))"
# Then update the AdminUser record in the database with the printed hash
```

---

## 🗄️ Database Commands

```bash
npm run db:generate    # Regenerate Prisma client after schema changes
npm run db:migrate     # Run pending migrations (creates/updates tables)
npm run db:push        # Push schema to DB without migration files (dev only)
npm run db:studio      # Open Prisma Studio GUI
npx prisma db seed     # Seed initial admin user
```

---

## 🏗️ Build & Deploy

### Production build
```bash
npm run build
npm run start
```

### Environment for production
- Set `NEXTAUTH_URL` to your actual domain
- Set `DATABASE_URL` to your production PostgreSQL instance
- Set a strong `NEXTAUTH_SECRET`
- Use HTTPS
- Configure your hosting to serve the Next.js app
- Set `NODE_ENV=production`

### Recommended hosting
- **Vercel** (zero-config Next.js deployment)
- **Railway** (includes PostgreSQL)
- **Render** (includes PostgreSQL)
- Self-hosted with `pm2` or Docker

---

## 📸 Founder Photo

To add the founder's actual photograph:
1. Save the photo as `public/images/founder.jpg` (minimum 400×400px, preferably square)
2. Update `src/components/about/FounderSection.tsx` to use `<Image>` with `src="/images/founder.jpg"`

---

## ✅ Feature Checklist

| Feature | Status |
|---|---|
| Home page — Hero, Services, Benefits, SIP Calculator | ✅ Done |
| CSV-driven Investment Charts with Recharts | ✅ Done |
| Financial Goals section | ✅ Done |
| Service Carousel | ✅ Done |
| Why Choose Us + CTA | ✅ Done |
| About Us page — Company intro, Founder, Approach | ✅ Done |
| Contact Us form with validation | ✅ Done |
| Enquiry storage (PostgreSQL via Prisma) | ✅ Done |
| Admin login (NextAuth) | ✅ Done |
| Admin dashboard — list, search, filter, update | ✅ Done |
| CSV export of enquiries | ✅ Done |
| Privacy Policy page | ✅ Done |
| Terms & Conditions page | ✅ Done |
| 404 Not Found page | ✅ Done |
| Sitemap + robots.txt | ✅ Done |
| Shared Header + Footer | ✅ Done |
| Responsive (mobile + desktop) | ✅ Done |
| Financial disclaimers | ✅ Done |
| Accessibility (ARIA, keyboard nav) | ✅ Done |
| SEO metadata | ✅ Done |
| Rate limiting on API | ✅ Done |
| Honeypot spam protection | ✅ Done |
| Admin route middleware | ✅ Done |
| Sample CSV data | ✅ Done |

---

## ⚠️ Important Notes Before Going Live

1. **Replace all placeholder contact details** in `.env.local`
2. **Replace the sample CSV** with your actual fund data
3. **Add the founder's photograph** to `public/images/`
4. **Change the admin password** from the default
5. **Verify all financial disclaimers** with a qualified professional
6. **Consult a lawyer** to review Privacy Policy and Terms & Conditions
7. **Verify regulatory requirements** for financial services distribution in India
8. **Enable HTTPS** in production
9. **Configure database backups**
10. **Update the sitemap URL** in `src/app/sitemap.ts` to your actual domain

---

## 📞 Support

For technical issues, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth Documentation](https://next-auth.js.org/getting-started/introduction)
- [Recharts Documentation](https://recharts.org/en-US/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

