# 🍼 Aaditya's Healthy Bites

Premium organic baby food e-commerce website built with Next.js 16, React 19, and TypeScript.

## 📋 Features

- 🛒 **Shopping Cart** - Add products with customizable weights/variants
- 📍 **Location Services** - Auto-detect user location for delivery
- 📱 **Notifications** - Telegram & WhatsApp order notifications
- 🎨 **Modern UI** - Responsive design with smooth animations
- 🏷️ **Product Categories** - 8 categories with 43+ organic products
- 🔒 **Type-Safe** - Built with TypeScript for reliability

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/imganesh51-glitch/Healthy_Bites.git
cd Healthy_Bites
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials:

**For Telegram Bot:**
1. Open Telegram and search for `@BotFather`
2. Send `/newbot` and follow the steps
3. Copy the bot token to `TELEGRAM_BOT_TOKEN`
4. Search for `@userinfobot` in Telegram
5. Click Start - it will show your Chat ID
6. Copy your Chat ID to `TELEGRAM_CHAT_ID`

**For WhatsApp (Twilio):**
1. Sign up at [twilio.com](https://www.twilio.com)
2. Get your Account SID and Auth Token from the console
3. Set up WhatsApp sandbox and get your WhatsApp number
4. Add credentials to `.env.local`

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Visit [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
Healthy_Bites/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   │   ├── send-telegram/
│   │   │   └── send-whatsapp/
│   │   ├── cart/           # Shopping cart page
│   │   ├── products/       # Product listing and details
│   │   └── story/          # About/Story page
│   ├── components/         # Reusable components
│   │   └── Navbar.tsx
│   ├── context/            # React Context
│   │   └── CartContext.tsx
│   └── lib/                # Utilities and data
│       └── data.ts         # Product catalog
├── public/                 # Static assets
│   └── images/            # Product images
└── package.json
```

## 🛠️ Technologies

- **Framework:** Next.js 16.1.6
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5
- **Styling:** CSS Modules + Custom CSS
- **Notifications:** Twilio (WhatsApp), Telegram Bot API
- **Deployment:** Vercel

## 📦 Product Categories

1. Baby's First Food
2. Porridge Menu
3. Dosa Premix Menu
4. Pancake Premix Menu
5. Laddus
6. Healthy Fats / Butters
7. Nuts and Seeds
8. Healthy Flours

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub** (if not done already)

2. **Go to [Vercel](https://vercel.com)**

3. **Import your repository**
   - Click "New Project"
   - Import `Healthy_Bites` repository
   - Vercel will auto-detect Next.js

4. **Configure Environment Variables**
   - Add all variables from `.env.local` to Vercel:
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHAT_ID`
     - `TWILIO_ACCOUNT_SID`
     - `TWILIO_AUTH_TOKEN`
     - `TWILIO_FROM_NUMBER`

5. **Deploy!**
   - Click Deploy
   - Your site will be live at `your-project.vercel.app`

### Alternative Deployment Options

- **Netlify:** Import from GitHub, set environment variables
- **DigitalOcean App Platform:** Docker-based deployment
- **AWS Amplify:** Connect GitHub repository

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🐛 Troubleshooting

**API notifications not working?**
- Check that environment variables are set correctly in `.env.local`
- Verify Telegram bot token and chat ID
- Confirm Twilio credentials and sandbox setup

**Build errors?**
- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

**Images not loading?**
- Ensure images are in `public/images/` directory
- Check image paths in `src/lib/data.ts`

## 📄 License

This project is private and proprietary.

## 👨‍💻 Developer

Developed by Ganesh for Aaditya's Healthy Bites

---

**Need help?** Open an issue or contact the developer.
