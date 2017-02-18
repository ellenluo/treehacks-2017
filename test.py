import os
import time
import urllib.request
from slackclient import SlackClient


# starterbot's ID as an environment variable
slack_token = os.environ["SLACK_BOT_TOKEN"]
sc = SlackClient(slack_token)

print(sc.rtm_connect())

# print(sc.api_call("im.history", channel="#general"))
hist = sc.api_call('channels.history', channel="C478F25L3")
messages = hist['messages']
#messages[0] returns most recent
recent = messages[0]
# url = recent['file']['permalink']
url = recent['file']['url_private']

# response = urllib.request.urlopen(url)
# data = response.read()
# print(data)
