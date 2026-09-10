# PosBytz Cloud ERP & Point of Sale

A high-performance cloud ERP and POS platform engineered for hospitality and retail operations across the GCC and international markets.

## Key Features

- **Omnichannel POS Terminal**: Touch-optimized interface with quick ring-up, modifiers, table management, split billing, and discount rules.
- **Kitchen Display System (KDS)**: Real-time ticket bump bar with prep timers, station routing, and kitchen pacing.
- **Central Recipe & Inventory Matrix**: Automated ingredient depletion down to the gram upon each POS ring-up, low-stock threshold triggers, and multi-warehouse transfers.
- **ZATCA Phase 2 Compliance**: Real-time cryptographic signing, phase 2 compliant QR generation, XML invoice generation, and tax clearance logs.
- **Executive BI & Telemetry**: Multi-outlet live sales, product mix (PMIX) analytics, table turn rates, and gross margin tracking.
- **Bilingual Support**: Instant toggle between English and Arabic (`RTL` layout auto-flipping).
- **Payment & BNPL Ready**: Integrations for Mada, Visa, Mastercard, Tabby, Tamara, and PayTabs.

## Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations & Effects**: Motion + Canvas Confetti
- **Deployment**: Vercel ready (`vercel.json` included) & Cloud Run compatible

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/posbytz-cloud-erp.git
cd posbytz-cloud-erp

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

This generates an optimized static bundle in the `dist/` directory.

### Deploying to Vercel

```bash
# Using Vercel CLI
npx vercel --prod
```

Or connect the repository on [Vercel Dashboard](https://vercel.com/new).

## License

Apache-2.0
