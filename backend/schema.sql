\c discuss;

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subreddits (
    subreddit_id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT CHECK (LENGTH(description) <= 2500),
    members_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    banner_url VARCHAR(255),
    logo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL PRIMARY KEY,
    subreddit_id INT REFERENCES subreddits(subreddit_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    post_type VARCHAR(20),
    vote_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    text_content TEXT CHECK (LENGTH(text_content) <= 10000),
    media_url VARCHAR(255),
    link_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    content TEXT CHECK (LENGTH(content) <= 5000),
    vote_count INTEGER DEFAULT 0,
    parent_comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS post_votes (
    vote_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE NOT NULL,
    vote_type INT CHECK (vote_type IN (-1, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comment_votes (
    vote_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    comment_id INT REFERENCES comments(comment_id) ON DELETE CASCADE NOT NULL,
    vote_type INT CHECK (vote_type IN (-1, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subreddit_members (
    membership_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
    subreddit_id INT REFERENCES subreddits(subreddit_id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('member', 'moderator')),
    UNIQUE(user_id, subreddit_id)
);

-- INSERT INTO post_votes (user_id, post_id, vote_type)
-- VALUES (4, 25, 1);

