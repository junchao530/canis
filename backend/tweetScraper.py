import tweepy
import pandas as pd
import os
from dotenv import load_dotenv

# load environment variables
load_dotenv()

# use os.getenv to get your environment variables
consumer_key = os.getenv("TWITTER_API_KEY")
consumer_secret = os.getenv("TWITTER_API_SECRET")
access_token = os.getenv("TWITTER_ACCESS_TOKEN")
access_token_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

# Authenticate with the Twitter API
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)

# Function to get tweets from a Twitter handle
def get_tweets(handle, count=50):
    try:
        # Fetch tweets from the handle
        tweets = api.user_timeline(screen_name=handle, count=count, tweet_mode="extended")
        # Extract relevant information from tweets
        tweets_data = [{"tweet_id": tweet.id_str, "text": tweet.full_text, "created_at": tweet.created_at} for tweet in tweets]
        return tweets_data
    except Exception as e:
        print(f"Error fetching tweets for {handle}: {e}")
        return []

# Load Twitter handles from your CSV file
df = pd.read_csv('/Users/siemdebesay/Desktop/cains/backend/Cleaned_Canis_Data.csv')
twitter_handles = df['X (Twitter) handle'].dropna().unique()

# Collect tweets from each handle
all_tweets = []
for handle in twitter_handles:
    print(f"Fetching tweets for {handle}...")
    tweets = get_tweets(handle)
    all_tweets.extend(tweets)

# Convert the tweets data to a DataFrame
tweets_df = pd.DataFrame(all_tweets)