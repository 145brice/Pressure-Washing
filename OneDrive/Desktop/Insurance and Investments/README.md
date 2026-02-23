# Reddit Insurance & Investment Scraper with Local Dashboard

Real-time scraper for Reddit posts and comments with a local web dashboard on port 5006. Features human-like behavior and automatic rate-limiting backoff.

## Setup

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the dashboard server
```bash
python app.py
```
Access dashboard at: http://localhost:5006

### 3. Run the scraper (in another terminal)
```bash
python scraper.py
```

## Features

✓ **Real-time searching** - Searches across 5 subreddits with 60+ insurance/investment keywords  
✓ **Human-like behavior** - Random delays (5-15s), shuffled order, varied search params  
✓ **Auto backoff** - Detects HTTP 429 errors and exponentially backs off (1x → 2x → 4x → 8x → 16x)  
✓ **Continuous monitoring** - Status printed every 30s showing backoff mode  
✓ **Rate limiting** - Max 35 requests/minute, automatic recovery on success  
✓ **Smart skipping** - Randomly skips 12% of posts to appear more natural  
✓ **Live dashboard** - Real-time stats, pagination, sortable table  
✓ **No API credentials needed** - Uses public Reddit search endpoint (no PRAW)  

## Monitored Subreddits

- r/insurance
- r/investing
- r/personalfinance
- r/stocks
- r/Bogleheads

## Tracked Keywords

**Insurance Sales Terms:** underwriting, underwriter, broker, agent, quote, renewal, rider, beneficiary, claim adjuster, term life, whole life, annuity, umbrella policy, liability insurance

**Investment Terms:** stock, bond, mutual fund, ETF, portfolio, dividend, yield, 401k, IRA, rollover, brokerage, fiduciary

**General:** insurance, policy, claim, premium, deductible, coverage, investment, risk, return

## Rate Limit Backoff System

When Reddit returns `HTTP 429 (Too Many Requests)`:
1. Backoff multiplier doubles (1x → 2x → 4x ... max 16x)
2. Sleep time = 60s × backoff_multiplier
3. Prints warning: `⚠️ 429 TOO MANY REQUESTS!`
4. Automatically resets to 1x on successful requests
5. Status monitor prints every 30s: `[BACKOFF STATUS] Mode: ACTIVE | Multiplier: 4x`

## File Structure

```
Insurance and Investments/
├── app.py                 # Flask dashboard server (port 5006)
├── scraper.py             # Reddit search scraper with backoff
├── requirements.txt       # Dependencies
├── templates/
│   └── dashboard.html     # Interactive web dashboard
└── README.md              # This file
```

## Architecture

- **app.py**: Flask server with REST API (`/api/post`, `/api/comment`, `/api/data`)
- **scraper.py**: Searches subreddits via public Reddit API, posts results to dashboard
- **templates/dashboard.html**: Real-time stats, pagination, sortable table

No cloud dependencies - everything runs locally!

## Monitoring

Watch for backoff status in terminal:
```
[BACKOFF STATUS] Mode: NORMAL | Multiplier: 1x | Max: 16x
[BACKOFF STATUS] Mode: ACTIVE | Multiplier: 2x | Max: 16x
⚠️ 429 TOO MANY REQUESTS! Backing off. Multiplier: 2x (120.0s total)
✓ Recovered from backoff. Resetting to normal.
```
