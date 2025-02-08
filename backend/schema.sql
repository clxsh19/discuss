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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    hotness DOUBLE PRECISION DEFAULT 0;
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

CREATE OR REPLACE FUNCTION calculate_hotness(vote_count INTEGER, created_at TIMESTAMP)
RETURNS DOUBLE PRECISION AS $$
DECLARE
    score_val INTEGER;
    order_val DOUBLE PRECISION;
    sign_val INTEGER;
    seconds DOUBLE PRECISION;
    epoch_start BIGINT := 1738389915;
BEGIN 
    score_val := vote_count + 0.5 *  LOG(GREATEST(ABS(vote_count), 2));
    order_val := LOG(10, GREATEST(ABS(score_val), 1));

    IF score_val > 0 THEN
        sign_val := 1;
    ELSIF score_val < 0 THEN
        sign_val := -1;
    ELSE
        sign_val := 0;
    END IF;

    seconds := EXTRACT(EPOCH FROM created_at) - epoch_start;

    RETURN ROUND((order_val + sign_val * seconds / 44000)::NUMERIC, 7)::DOUBLE PRECISION;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_post_hotness() RETURNS TRIGGER AS $$
BEGIN
    UPDATE posts p
    SET hotness = calculate_hotness(NEW.vote_count, p.created_at)
    WHERE p.post_id = NEW.post_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
  
CREATE TRIGGER trigger_update_hotness
AFTER UPDATE OF vote_count ON posts
FOR EACH ROW
WHEN (OLD.vote_count IS DISTINCT FROM NEW.vote_count) -- Avoid unnecessary updates
EXECUTE FUNCTION update_post_hotness();

