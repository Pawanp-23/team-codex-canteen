# PosBytz Cloud ERP & Point of Sale (India Edition)

> **Project Lead:** Pawan Patil  
> **Team:** Team CodeX  
> **Evaluation Module:** Core Order & Stock Management System  
> **Target Market:** India (₹ INR, Indian GST, Dynamic UPI QR, Zomato/Swiggy Sync)

A cloud ERP and Point of Sale (POS) web application engineered for hospitality, cafeterias, cloud kitchens, and retail chains across India.

---

## Core Requirements Implemented & Verified

1. **Menu Page**: Displays item name, price in Indian Rupees (₹), and real-time quantity available (live stock) with category filters and search.
2. **Order Form**: Interactive fields for Customer Name, Roll No / Student ID, Item Selection, and Quantity with live stock boundary guards.
3. **Auto-Calculated Order Total**: Formula engine (`unitPrice × quantity = total`) updating synchronously on every keystroke or stepper click.
4. **Immediate Stock Depletion**: Submitting an order instantly decrements the item's live inventory (`quantityAvailable - orderQuantity`) with low-stock warnings and out-of-stock lockouts.
5. **"Order Confirmed" Notification**: Celebratory modal with confetti animation, auto-generated order token (`ORD-XXXX`), itemized breakdown, and live feedback.
6. **Admin Order History / List View**: Dedicated admin portal with live filterable order records, status controls (`confirmed` -> `preparing` -> `ready` -> `completed`), order volume telemetry, and live stock audit matrix.

---

## Key Modules

- **Core Order & Stock Portal**: Built specifically for cafeteria and canteen student/customer ordering with roll number tracking.
- **High-Velocity Cloud POS**: Touch-optimized interface with table layout, split billing, discounts, and soundbox confirmation.
- **Kitchen Display System (KDS)**: Real-time ticket routing, prep timers, and Zomato/Swiggy delivery line pacing.
- **Recipe & Inventory Depletion**: Automated ingredient depletion down to the gram upon each POS checkout (e.g. coffee beans, milk, paneer).
- **Indian GST & E-Invoicing**: 5% restaurant GST computation (CGST 2.5% + SGST 2.5%), HSN code compliance, and B2C/B2B dynamic UPI QR generation.
- **Executive Analytics & BI**: Multi-outlet live sales, product mix (PMIX) analytics, table turn rates, and gross margin tracking.

---

## Deploy to GitHub & Vercel Guide

### 1. Push to GitHub
```bash
# In your local project directory:
git init
git add .
git commit -m "feat: complete PosBytz Cloud ERP (India Edition) - Team CodeX"

# Create a new repository on GitHub (e.g., posbytz-cloud-erp) and link it:
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel
You can deploy this project to Vercel in 2 simple ways:

#### Option A: One-Click Import via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Select your repository (`<YOUR_REPO_NAME>`).
4. Vercel will automatically detect **Vite** as the framework using `vercel.json`.
5. Click **"Deploy"**. Your live URL will be active in ~30 seconds!

#### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel
# Follow the interactive prompt and accept default settings.
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build for production
npm run build
```

---

## Attribution
Engineered by **Pawan Patil** and **Team CodeX**. All rights reserved.

## License
Apache-2.0
