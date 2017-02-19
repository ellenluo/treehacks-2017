/*
* This is the actual logic behind the messages
*/
import * as wiki from './wiki';
import responses from './responses';
import request from 'request-promise'

const defaultResponses = {
    // these are just some various responses you might want to send
    instructions: {
        type: 'template',
        payload: {
            template_type: 'button',
            text: "Get a random article!",
            buttons: [
                {
                    type: 'postback',
                    title: 'Press me!',
                    payload: 'random'
                },
            ]
        }
    },
    greetingMessage: "Hello world!",
    invalidMessage: "Sorry, didn't understand that!",
    failure: "Sorry, something went wrong!",
    hereYouGo: "Here's a cool article",
    locationInstruction: {
        text: 'Please share your location.',
        quick_replies: [
            {
                "content_type":"location",
            }
        ]
    },
    listing: {
        type: 'template',
        payload: {
            template_type: 'generic',
            elements: [{
                title: "template doggo",
                subtitle: "next-generation adoption",
                item_url: "https://www.petfinder.com/",
                image_url: "http://r.ddmcdn.com/s_f/o_1/cx_633/cy_0/cw_1725/ch_1725/w_720/APL/uploads/2014/11/too-cute-doggone-it-video-playlist.jpg",
                buttons: [{
                    type: "web_url",
                    url: "https://www.petfinder.com/",
                    title: "see more!"
                }, {
                    type: "element_share"
                }],
            }]
        }
    },
    selection: {
        type: "template",
        payload: {
            template_type: "button",
            text: "pick an animal",
            buttons: [
                {
                    type: "postback",
                    title: "Dog",
                    payload: "dog"
                },
                {
                    type: "postback",
                    title: "Cat",
                    payload: "cat"
                }
            ]
        }
    },
    quickselect: {
        text: "Pick an animal",
        quick_replies: [
            {
                content_type: "text",
                title: "Cat",
                payload: 'cat'
            },
            {
                content_type: "text",
                title: "Dog",
                payload: 'dog'
            }
        ]
    }
}

export const handleMessage = ({message, userKey}) => {
    return getResponsesForMessage({message, userKey})
    .then(messages => {
        return generateMessagesFromArray(messages, userKey);
    })
};

const generateMessagesFromArray = (messages, key) => {
    let msgs = [];

    messages.forEach(message => {
        msgs = msgs.concat(buildMessage(message, key));
    });

    return msgs;
};

const buildMessage = (message, key) => {
    if(typeof message === 'string') {
        return {
            text: message,
            key
        }
    } else if(typeof message === 'object') {
        if('quick_replies' in message) {
            return {
                text: message.text,
                quick_replies: message.quick_replies,
                key
            }
        }
        else {
            return {
                attachment: message,
                key
            }
        }
    }
};

const getResponsesForMessage = ({message, userKey}) => {
    return new Promise((resolve, reject) => {
        if(message.text === 'hi') {
            resolve([defaultResponses.listing]);
        }
        
    });
};
