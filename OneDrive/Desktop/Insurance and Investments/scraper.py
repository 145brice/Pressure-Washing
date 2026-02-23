import requests
import os
from datetime import datetime
import json
import time
import threading
import random

# Local dashboard server
SERVER_URL = 'http://localhost:5006'

# User agent to avoid Reddit blocking
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/91.0.864.59'
]

# Rate limiting
request_times = []
MAX_REQUESTS_PER_MINUTE = 35

# Backoff tracking
backoff_multiplier = 1.0
backoff_active = False
max_backoff_multiplier = 16.0

# Track seen posts to avoid unnecessary posts
seen_post_ids = set()

def human_delay(short=False):
    """Random human-like delay"""
    if short:
        time.sleep(random.uniform(1.2, 4.8))
    else:
        time.sleep(random.uniform(5, 15))

def should_skip_post():
    """Randomly skip posts (10-15% chance)"""
    return random.random() < 0.12

def check_rate_limit():
    """Ensure we don't exceed rate limit"""
    global request_times
    now = time.time()
    # Remove requests older than 60 seconds
    request_times = [t for t in request_times if now - t < 60]
    
    if len(request_times) >= MAX_REQUESTS_PER_MINUTE:
        sleep_time = 61 - (now - request_times[0])
        if sleep_time > 0:
            print(f"Rate limit approaching, sleeping {sleep_time:.1f}s...")
            time.sleep(sleep_time)
    
    request_times.append(now)

# Subreddits
SUBS = [
    # Insurance
    'insurance', 'HealthInsurance', 'AutoInsurance', 'LifeInsurance',
    'homeowners', 'smallbusiness',
    # Investments & Finance
    'investing', 'personalfinance', 'stocks', 'Bogleheads',
    'financialplanning', 'retirement', 'Fire',
    'RealEstateInvesting', 'tax'
]

# Keywords - focused on people expressing need or asking for help
KEYWORDS = [
    # Insurance - People with need
    'need insurance', 'shopping for insurance', 'insurance advice',
    'which insurance', 'best insurance', 'insurance recommendation',
    'dropped by insurance', 'insurance cancelled', 'denied claim',
    'premium too high', 'deductible', 'coverage question',
    'bodily injury', 'underwriting', 'copay', 'coinsurance',
    'claim adjuster', 'loss of use', 'subrogation',
    # Life Insurance - People with need
    'need life insurance', 'term life', 'whole life', 'annuity',
    'universal life', 'variable life', 'life insurance advice',
    'umbrella policy', 'liability insurance',
    # Health Insurance - People with need
    'no health insurance', 'lost insurance', 'open enrollment',
    'marketplace plan', 'COBRA', 'health insurance options',
    # Home/Auto - People with need
    'homeowners insurance', 'renters insurance', 'auto insurance quote',
    'car insurance too expensive', 'home insurance claim',
    # Investments - People with need
    'how to invest', 'new to investing', 'where to invest',
    'mutual fund', 'ETF recommendation', 'portfolio advice',
    'dividend investing', 'asset allocation',
    '401k rollover', '401k advice', 'IRA contribution', 'Roth IRA',
    'fiduciary', 'financial advisor', 'retirement planning',
    'how much to retire', 'behind on retirement',
    # General financial need signals
    'need help with finances', 'financial planning advice',
    'what should I do with', 'first time investor',
    'just inherited', 'windfall', 'lump sum'
]

def send_post(post_data):
    """Send a post to the local dashboard"""
    global seen_post_ids
    
    try:
        post_id = post_data['id']
        # Only allow posts from target subreddits
        post_sub = post_data.get('subreddit', '').lower()
        if post_sub not in [s.lower() for s in SUBS]:
            return
        is_new = post_id not in seen_post_ids
        seen_post_ids.add(post_id)
        
        data = {
            'post_id': post_id,
            'comment_count': post_data['num_comments'],
            'score': post_data['score'],
            'post_time': datetime.fromtimestamp(post_data['created_utc']).strftime('%Y-%m-%d %H:%M:%S'),
            'caught_time': datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'),
            'author': post_data.get('author', '[deleted]') or '[deleted]',
            'title': post_data['title'],
            'subreddit': post_data['subreddit'],
            'url': f"https://reddit.com{post_data['permalink']}"
        }
        
        response = requests.post(f'{SERVER_URL}/api/post', json=data, timeout=5)
        if response.status_code == 200:
            status = response.json().get('status', 'unknown')
            if status == 'created':
                print(f"[NEW] {post_id} ({post_data['num_comments']} comments)")
            elif status == 'updated':
                print(f"[UPD] {post_id} ({post_data['num_comments']} comments)")
        else:
            print(f"[FAIL] Failed to post {post_id}: {response.status_code}")
    except Exception as e:
        print(f"Error sending post: {e}")

def search_reddit(sub, keyword):
    """Search Reddit subreddit for keyword"""
    global backoff_multiplier, backoff_active
    
    try:
        check_rate_limit()
        
        headers = {'User-Agent': random.choice(USER_AGENTS)}
        url = f"https://www.reddit.com/r/{sub}/search.json"
        
        # Randomize search parameters
        sort_options = ['new', 'new', 'new', 'relevance']  # Mostly new, sometimes relevance
        time_options = ['week', 'week', 'month', 'all']
        
        params = {
            'q': keyword,
            'restrict_sr': 'on',
            'sort': random.choice(sort_options),
            'limit': random.randint(20, 30),
            't': random.choice(time_options)
        }
        
        response = requests.get(url, params=params, headers=headers, timeout=10)
        
        # Handle 429 Too Many Requests
        if response.status_code == 429:
            backoff_multiplier = min(backoff_multiplier * 2, max_backoff_multiplier)
            backoff_active = True
            backoff_time = 60 * backoff_multiplier
            print(f"[WARN] 429 TOO MANY REQUESTS! Backing off. Multiplier: {backoff_multiplier}x ({backoff_time:.0f}s total)")
            time.sleep(backoff_time)
            return 0
        
        # Reset backoff on success
        if response.status_code == 200:
            if backoff_active and backoff_multiplier > 1.0:
                print(f"[OK] Recovered from backoff. Resetting to normal.")
                backoff_active = False
                backoff_multiplier = 1.0
        
        if response.status_code == 200:
            data = response.json()
            posts = data.get('data', {}).get('children', [])
            
            posted_count = 0
            for post in posts:
                if should_skip_post():
                    continue
                    
                post_data = post['data']
                send_post(post_data)
                posted_count += 1
                
                # Small delay between posts
                human_delay(short=True)
            
            return posted_count
        else:
            print(f"Search error for r/{sub}: {response.status_code}")
            return 0
    except Exception as e:
        print(f"Error searching r/{sub}: {e}")
        return 0

def scrape_streams():
    """Search for keywords on Reddit with human-like behavior"""
    print("Starting Reddit search scraper...")
    searched = set()
    
    while True:
        try:
            # Shuffle for randomness
            shuffled_subs = SUBS.copy()
            random.shuffle(shuffled_subs)
            
            for sub in shuffled_subs:
                shuffled_keywords = KEYWORDS.copy()
                random.shuffle(shuffled_keywords)
                
                for keyword in shuffled_keywords:
                    search_key = f"{sub}:{keyword}"
                    if search_key not in searched:
                        print(f"Searching r/{sub} for '{keyword}'...")
                        found = search_reddit(sub, keyword)
                        print(f"Found and posted {found} posts")
                        searched.add(search_key)
                        
                        # Vary delays significantly
                        human_delay()
                    
                    # Occasional longer pause (2-3% chance)
                    if random.random() < 0.02:
                        print("Taking a longer break...")
                        time.sleep(random.uniform(30, 60))
                
                # Longer pause between subreddits
                human_delay()
        
        except Exception as e:
            print(f"Stream error: {e}")
            time.sleep(60)

def resight_hot_posts():
    """Check hot posts periodically with human-like behavior"""
    global backoff_multiplier, backoff_active
    
    print("Starting hot post monitor...")
    
    while True:
        try:
            shuffled_subs = SUBS.copy()
            random.shuffle(shuffled_subs)
            
            for sub in shuffled_subs:
                try:
                    check_rate_limit()
                    
                    headers = {'User-Agent': random.choice(USER_AGENTS)}
                    url = f"https://www.reddit.com/r/{sub}/hot.json"
                    response = requests.get(url, headers=headers, params={'limit': random.randint(40, 60)}, timeout=10)
                    
                    # Handle 429 Too Many Requests
                    if response.status_code == 429:
                        backoff_multiplier = min(backoff_multiplier * 2, max_backoff_multiplier)
                        backoff_active = True
                        backoff_time = 60 * backoff_multiplier
                        print(f"[WARN] 429 TOO MANY REQUESTS! Backing off. Multiplier: {backoff_multiplier}x ({backoff_time:.0f}s total)")
                        time.sleep(backoff_time)
                        continue
                    
                    # Reset backoff on success
                    if response.status_code == 200:
                        if backoff_active and backoff_multiplier > 1.0:
                            print(f"[OK] Recovered from backoff. Resetting to normal.")
                            backoff_active = False
                            backoff_multiplier = 1.0
                    
                    if response.status_code == 200:
                        data = response.json()
                        posts = data.get('data', {}).get('children', [])
                        
                        for post in posts:
                            if should_skip_post():
                                continue
                                
                            post_data = post['data']
                            # Only show hot posts with keywords
                            title_body = f"{post_data['title']} {post_data.get('selftext', '')}"
                            if contains_keyword(title_body):
                                send_post(post_data)
                            
                            human_delay(short=True)
                    
                    human_delay()
                
                except Exception as e:
                    print(f"Hot posts error in r/{sub}: {e}")
                    time.sleep(10)
            
            print("Hot posts check complete, waiting...")
            # Vary the wait time between checks
            time.sleep(random.uniform(3300, 3900))  # ~55-65 min
        
        except Exception as e:
            print(f"Hot posts monitor error: {e}")
            time.sleep(60)

def contains_keyword(text):
    """Check if text contains any of the keywords"""
    text_lower = text.lower()
    return any(kw.lower() in text_lower for kw in KEYWORDS)

def monitor_backoff_status():
    """Continuously monitor and print backoff status"""
    global backoff_multiplier, backoff_active
    
    while True:
        status = "ACTIVE" if backoff_active else "NORMAL"
        print(f"[BACKOFF STATUS] Mode: {status} | Multiplier: {backoff_multiplier}x | Max: {max_backoff_multiplier}x")
        time.sleep(30)  # Print status every 30 seconds

if __name__ == '__main__':
    print("=" * 50)
    print("Reddit Scraper - Local Dashboard Mode")
    print(f"Dashboard: {SERVER_URL}")
    print("=" * 50)
    
    # Start scraper threads
    threading.Thread(target=scrape_streams, daemon=True).start()
    threading.Thread(target=resight_hot_posts, daemon=True).start()
    threading.Thread(target=monitor_backoff_status, daemon=True).start()
    
    # Keep main thread alive
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")

