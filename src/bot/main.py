from __future__ import print_function
import fbmq
from fbmq import Attachment, Template, QuickReply, Page
import json
import requests

verify_token = "perrytheplatypus"
PAGE_ACCESS_TOKEN = "EAAJjL86GCNQBAKofF9TZC7vtTSUQXXkt6fCCirOPg7ZC2HDZAzfKhvfAcxY4kTQ0IFpA1K6OXVxRrK85x5vRvmmsECPIzgZAZBFa5ObuozDa9tq9XxXc3HXWJCT6ogYEEj89r1bPx3K4nTRXMtyCNMThiv7pwCEOk1ZAF5ZBxULZCwZDZD"
default_img  = "http://photos.petfinder.com/photos/pets/28854051/3/?bust=1432951081&width=500&-x.jpg"
def lambda_handler(event, context):
    if 'params' in event.keys():
        params = event['params']['querystring']
        if params and params['hub.mode'] == 'subscribe':
            if params['hub.verify_token'] == verify_token:
                return int(params['hub.challenge']), 200
            else:
                return "Verification error", 403
    else:
        messaging = json.loads(event['body'])
        messaging = messaging['entry'][0]['messaging'][0]

        if 'message' in messaging.keys() and 'text' in messaging['message'].keys():
            sender, message = messaging['sender']['id'], messaging['message']['text']
            sender = int(sender)

            page = fbmq.Page(PAGE_ACCESS_TOKEN)
            if message == 'next':
                page.send(sender, "Hello!")
                page.send(sender, "You said {}.".format(message))
                attachment = Attachment.Image(default_img)
                page.send(sender, attachment)
                page.send(sender, "Aww.")
        else:
            print(messaging)

    response = {
        'statusCode': 200,
        'body': json.dumps({ 'success': True }),
            'headers': {
                'Content-Type': 'application/json',
            }
    };

    return response
