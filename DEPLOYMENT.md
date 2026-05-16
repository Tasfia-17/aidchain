# AidChain Deployment Guide

## Quick Start (Local Development)

```bash
# Clone repository
git clone <your-repo-url>
cd aidchain

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:5173
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy

**Live URL**: `https://aidchain.vercel.app`

### Option 2: Netlify

1. Push code to GitHub
2. New site from Git in Netlify
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Deploy

### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### Option 4: Static Hosting (Any Provider)

```bash
# Build
npm run build

# Upload dist/ folder to:
# - AWS S3 + CloudFront
# - Google Cloud Storage
# - Azure Static Web Apps
# - Cloudflare Pages
```

## Environment Variables

### Development (.env.local)

```bash
# Trustless Work API (optional for demo)
VITE_TRUSTLESS_WORK_API_KEY=your_api_key_here
VITE_TRUSTLESS_WORK_BASE_URL=https://dev.api.trustlesswork.com

# Stellar Network
VITE_STELLAR_NETWORK=testnet
```

### Production (.env.production)

```bash
VITE_TRUSTLESS_WORK_API_KEY=your_production_api_key
VITE_TRUSTLESS_WORK_BASE_URL=https://api.trustlesswork.com
VITE_STELLAR_NETWORK=mainnet
```

## Integration with Real Trustless Work

### Step 1: Get API Key

1. Visit https://dapp.trustlesswork.com
2. Connect wallet
3. Request API key
4. Add to `.env.local`

### Step 2: Replace Mock API

In `src/lib/aidchain-core.js`:

```javascript
// Replace MockTrustlessWorkAPI with real SDK
import { TrustlessWorkConfig, useDeployMultiRelease } from '@trustless-work/escrow';

// Wrap app with provider
<TrustlessWorkConfig baseURL={development} apiKey={apiKey}>
  <App />
</TrustlessWorkConfig>
```

### Step 3: Add Wallet Connection

```bash
# Install Stellar Wallets Kit
npm install @creit.tech/stellar-wallets-kit

# Add wallet provider
import { StellarWalletsKit } from '@creit.tech/stellar-wallets-kit';
```

### Step 4: Sign Transactions

```javascript
// Get unsigned XDR from API
const { xdr } = await deployEscrow(config);

// Sign with wallet
const signedXdr = await wallet.sign(xdr);

// Submit to network
const result = await submitTransaction(signedXdr);
```

## Testing

### Unit Tests (Future)

```bash
npm install --save-dev vitest @testing-library/react

# Run tests
npm test
```

### E2E Tests (Future)

```bash
npm install --save-dev playwright

# Run E2E tests
npm run test:e2e
```

## Monitoring

### Analytics (Optional)

```bash
# Add Google Analytics
npm install react-ga4

# Or Plausible (privacy-friendly)
# Add script to index.html
```

### Error Tracking

```bash
# Sentry
npm install @sentry/react

# Initialize in main.jsx
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: "your-dsn" });
```

## Performance Optimization

### Code Splitting

```javascript
// Lazy load components
const HypercertPanel = lazy(() => import('./components/HypercertPanel'));

<Suspense fallback={<div>Loading...</div>}>
  <HypercertPanel />
</Suspense>
```

### Image Optimization

```bash
# Install image optimizer
npm install vite-plugin-imagemin --save-dev

# Add to vite.config.js
import viteImagemin from 'vite-plugin-imagemin';
```

### Bundle Analysis

```bash
# Analyze bundle size
npm install --save-dev rollup-plugin-visualizer

# Generate report
npm run build -- --mode analyze
```

## Security Checklist

- [ ] API keys in environment variables (not committed)
- [ ] HTTPS enabled in production
- [ ] Content Security Policy headers
- [ ] Rate limiting on API calls
- [ ] Input validation on all forms
- [ ] XSS protection
- [ ] CORS configured correctly

## Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check Node version (requires 18+)
node --version
```

### Wallet Connection Issues

```bash
# Check Stellar network
# Testnet: https://horizon-testnet.stellar.org
# Mainnet: https://horizon.stellar.org

# Verify wallet extension installed
# Freighter: https://freighter.app
```

### API Errors

```bash
# Check API key validity
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://dev.api.trustlesswork.com/health

# Check rate limits
# Trustless Work: 100 requests/minute
```

## Maintenance

### Update Dependencies

```bash
# Check outdated packages
npm outdated

# Update all
npm update

# Update specific package
npm install @trustless-work/escrow@latest
```

### Monitor Escrow Contracts

```bash
# Check contract status
curl https://viewer.trustlesswork.com/api/escrow/GXXXXXXX

# Monitor Stellar transactions
# https://stellar.expert/explorer/testnet
```

## Scaling

### Horizontal Scaling

- Deploy multiple instances behind load balancer
- Use CDN for static assets (Cloudflare, AWS CloudFront)
- Cache API responses (Redis)

### Database (Future)

```bash
# For storing escrow metadata
npm install @supabase/supabase-js

# Or Firebase
npm install firebase
```

### Queue System (Future)

```bash
# For processing biometric hashes
npm install bull

# Or AWS SQS
npm install @aws-sdk/client-sqs
```

## Backup & Recovery

### Data Backup

- Escrow data: On-chain (immutable)
- Activity logs: Export to JSON
- Hypercerts: IPFS pinning

### Disaster Recovery

1. Escrow contracts are on-chain (permanent)
2. Frontend can be redeployed from Git
3. No centralized database to backup

## Support

### Documentation

- [Trustless Work Docs](https://docs.trustlesswork.com)
- [Stellar Docs](https://developers.stellar.org)
- [Hypercerts Docs](https://docs.hypercerts.org)

### Community

- [Trustless Work Discord](https://discord.gg/6Btrh3vS)
- [Stellar Discord](https://discord.gg/stellardev)

### Issues

Report bugs: [GitHub Issues](https://github.com/your-repo/issues)

---

**Last Updated**: May 16, 2026
**Deployment Status**: Ready for Demo Day
