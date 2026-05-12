# ☕ BrewDesk Coffee Shop

A modern, full-stack coffee shop website built with React, Tailwind CSS, and Supabase.

## Features

- **Beautiful UI/UX**: Modern design with warm amber color palette and smooth animations
- **Interactive Menu**: Filterable coffee menu with category switching
- **Newsletter System**: Email subscription with Supabase backend
- **Order Management**: Full order system for online coffee orders
- **Contact Form**: Customer inquiry management
- **Responsive Design**: Works seamlessly on all devices
- **Real Images**: Professional coffee shop photography from Unsplash

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Supabase** - Backend-as-a-Service
- **Hono** - Web framework for Deno edge functions
- **Deno** - Runtime for edge functions

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── App.tsx              # Main application component
│   │   └── components/          # React components
│   ├── styles/                  # CSS and styling
│   └── imports/                 # Static assets
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx        # API endpoints (Hono server)
│           └── kv_store.tsx     # Database utilities
├── utils/
│   ├── api.ts                   # Frontend API client
│   └── supabase/
│       └── info.tsx             # Supabase configuration
└── package.json
```

## API Endpoints

The backend provides the following REST API endpoints:

- `POST /newsletter/subscribe` - Subscribe to newsletter
- `GET /newsletter/subscribers` - Get all subscribers (admin)
- `POST /orders` - Create a new order
- `GET /orders/:orderId` - Get order by ID
- `GET /orders` - Get all orders (admin)
- `POST /contact` - Submit contact form

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- pnpm (recommended) or npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd brewdesk-coffee-shop
```

2. Install dependencies:
```bash
pnpm install
```

3. The project is already configured with Supabase. The backend is deployed as a Supabase Edge Function.

### Development

The Vite dev server should already be running. If not, you can start it with:
```bash
pnpm run dev
```

## Supabase Integration

This project uses Supabase for:
- **Key-Value Store**: Newsletter subscriptions, orders, and contact forms are stored in a flexible KV table
- **Edge Functions**: API endpoints are deployed as serverless Deno functions
- **Real-time**: Future features can leverage Supabase real-time capabilities

### Backend Deployment

The backend is automatically deployed to Supabase Edge Functions. Any changes to `supabase/functions/server/index.tsx` will be deployed on the next push.

## Features Overview

### Newsletter Subscription
- Email validation
- Duplicate prevention
- Success/error messaging
- Backend storage in Supabase

### Menu System
- Category filtering (All, Espresso, Specialty, Cold Brew)
- Add to cart functionality
- Real-time cart updates
- Price display

### Order Management
- Customer information collection
- Order ID generation
- Order tracking
- Backend persistence

## Design Philosophy

The design emphasizes:
- **Warmth**: Amber and coffee brown color palette
- **Clarity**: Clear typography and visual hierarchy
- **Engagement**: Interactive elements and smooth transitions
- **Trust**: Professional imagery and clean layout

## Future Enhancements

- [ ] Shopping cart modal/page
- [ ] Order checkout flow
- [ ] User authentication
- [ ] Order history for logged-in users
- [ ] Real-time order status updates
- [ ] Admin dashboard
- [ ] Payment integration
- [ ] Loyalty rewards program

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Images provided by [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI components inspired by modern web design trends

---

Built with ❤️ and ☕ by the BrewDesk team
