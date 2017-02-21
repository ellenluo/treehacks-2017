# Petreon

Hack dedicated to helping homeless pets, built with a team of four at TreeHacks 2017.

### Inspiration
Our goal is to help homeless animals around the country find a caring family. Can't adopt? Don't worry! Pledge to support a pet and you will receive updates when the pet is adopted (and cute photo updates once in a while). Adopt a pet, and you will receive the monthly pledge!

### What it does
Your donations go toward sponsoring certain animals for adoption. We understand that many people don't have the resources necessary to adopt and provide for a pet, so Petreon offers them a way to contribute. Becoming a patron has its perks: sponsors can subscribe to certain animals and receive updates and pictures through a Facebook Messenger bot.

### How we built it
The pet information is retrieved from PetFinder's API. Users can browse for animals they like and obtain more detailed information for each animal. If a user particularly likes an animal, he or she can become a patron and get a subscription to more pictures through a Facebook Messenger bot. Users can also pledge money through Stripe to help support the adoption of homeless animals. We believe that implementing a money-backed subscription to cute pet images gives people stronger personal connection with homeless pets and thus greater incentive to aid and adopt homeless pets.

The infrastructure was largely built on Amazon Web Services with a serverless architecture. We used AWS Lambdas, API Gateway, RDS and S3 to run the app. The bot spins up lambdas only when replying to messages, minimizing compute usage and maximizing cost and scalability. We used Facebook's Messenger API to build the Messenger chat bot. We hoped to use Messenger payments to keep the entire loop within the Messenger interface, but it was unfortunately only available to beta testers. As a result, we used a Stripe interface for payments and pledging. Front-end development was done using HTML, CSS and JavaScript/jQuery.

Devpost can be found [here](https://devpost.com/software/petreon)
