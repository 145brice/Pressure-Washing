from flask import Flask, render_template, jsonify, request
from datetime import datetime
import json
import os
import csv
from threading import Lock

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False

CSV_FILE = os.path.join(os.path.dirname(__file__), 'leads.csv')
CSV_COLUMNS = ['post_id', 'comment_count', 'score', 'hit_count', 'post_time', 'caught_time', 'author', 'title', 'subreddit', 'url']

# Data storage
data_lock = Lock()
data_store = {
    'posts': {},  # Changed to dict with post_id as key
    'comments': [],
    'stats': {
        'posts_found': 0,
        'comments_collected': 0,
        'total_entries': 0,
        'updates': 0
    }
}

def load_csv():
    """Load existing data from CSV on startup"""
    if not os.path.exists(CSV_FILE):
        return
    try:
        with open(CSV_FILE, 'r', newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                post_id = row['post_id']
                data_store['posts'][post_id] = {
                    'post_id': post_id,
                    'comment_count': int(row.get('comment_count', 0)),
                    'score': int(row.get('score', 0)),
                    'hit_count': int(row.get('hit_count', 1)),
                    'post_time': row.get('post_time', ''),
                    'caught_time': row.get('caught_time', ''),
                    'author': row.get('author', ''),
                    'title': row.get('title', ''),
                    'subreddit': row.get('subreddit', ''),
                    'url': row.get('url', '#')
                }
        count = len(data_store['posts'])
        data_store['stats']['posts_found'] = count
        data_store['stats']['total_entries'] = count
        print(f"Loaded {count} posts from {CSV_FILE}")
    except Exception as e:
        print(f"Error loading CSV: {e}")

def save_csv():
    """Save all posts to CSV"""
    try:
        with open(CSV_FILE, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=CSV_COLUMNS)
            writer.writeheader()
            for post in data_store['posts'].values():
                writer.writerow({col: post.get(col, '') for col in CSV_COLUMNS})
    except Exception as e:
        print(f"Error saving CSV: {e}")

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/data')
def get_data():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 50, type=int)

    with data_lock:
        # Convert dict to list and include type
        posts_list = [{'type': 'POST', **p} for p in data_store['posts'].values()]
        comments_list = [{'type': 'COMMENT', **c} for c in data_store['comments']]

        all_entries = sorted(
            posts_list + comments_list,
            key=lambda x: x['caught_time'],
            reverse=True
        )

        total = len(all_entries)
        start = (page - 1) * per_page
        end = start + per_page
        entries = all_entries[start:end]

        return jsonify({
            'entries': entries,
            'total': total,
            'page': page,
            'per_page': per_page,
            'total_pages': (total + per_page - 1) // per_page,
            'stats': data_store['stats']
        })

@app.route('/api/post', methods=['POST'])
def add_post():
    data = request.json
    post_id = data['post_id']

    with data_lock:
        if post_id in data_store['posts']:
            # Update existing post (comment count may have changed)
            data_store['posts'][post_id]['hit_count'] = data_store['posts'][post_id].get('hit_count', 1) + 1
            data_store['posts'][post_id].update({
                'comment_count': data.get('comment_count', 0),
                'score': data.get('score', 0),
                'caught_time': data['caught_time']
            })
            data_store['stats']['updates'] += 1
            save_csv()
            return jsonify({'status': 'updated'})
        else:
            # New post
            data_store['posts'][post_id] = {
                'post_id': post_id,
                'comment_count': data.get('comment_count', 0),
                'score': data.get('score', 0),
                'hit_count': 1,
                'post_time': data['post_time'],
                'caught_time': data['caught_time'],
                'author': data['author'],
                'title': data['title'],
                'subreddit': data['subreddit'],
                'url': data.get('url', '#')
            }
            data_store['stats']['posts_found'] += 1
            data_store['stats']['total_entries'] += 1
            save_csv()
            return jsonify({'status': 'created'})

@app.route('/api/comment', methods=['POST'])
def add_comment():
    data = request.json
    with data_lock:
        data_store['comments'].append({
            'post_id': data['post_id'],
            'comment_id': data.get('comment_id', ''),
            'post_time': data['post_time'],
            'caught_time': data['caught_time'],
            'author': data['author'],
            'body': data['body'],
            'subreddit': data['subreddit'],
            'url': data.get('url', '#')
        })
        data_store['stats']['comments_collected'] += 1
        data_store['stats']['total_entries'] += 1
    return jsonify({'status': 'success'})

# Load existing data before starting
load_csv()

if __name__ == '__main__':
    app.run(host='localhost', port=5006, debug=True)
