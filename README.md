# connec-ted
## Inspiration
In the highly developed world that we live in today, data is everything. Access to information is crucial to raise awareness and the demand for a good sustainable internet connection is always on the rise. However, approximately **4 billion** individuals on this planet do not have access to the internet and with the development of the global pandemic in recent times, information and awareness are crucial for survival. Disconnected serves the purpose of helping users who do not have access to data stay connected and thus be aware of the latest ongoings around the world.

## What it does
Meet Ted! An intelligent chatbot, Ted redefines the notions of mobility. Equipped with Google Cloud’s powerful Map API, the incorrigible NewsAPI and Twilio’s seamless messaging API, Ted caters the perfect travel experience. On the go? Get directions to any place, anytime, anywhere. Wanna bring yourself up to speed with the current happenings? Ted will take you around the world in the blink of an eye. Bored? Ted gives you 5 random things to do. All this at the expense of a single SMS without needing any internet connection of sorts. If you’re travelling and possess a phone with SMS capabilities, you can rest assured knowing that Ted’s got your back.

## How we built it
Using Twilio's API, along with Google Cloud Platform, Google Directions API and News API, we seamlessly connected SMS sent from a user to our bot that conveys back desired information in real-time. Through Node.js, and a Webhook URL our bot sent messages that were forwarded through Twilio.

## Challenges we ran into
- Understanding and implementing Node.js, Webhooks. 
- Sending MMS and studying Twilio's API.
- Configuring a bot.

## Accomplishments that we're proud of
Developed an easy-to-use working prototype which was verified by receiving directions and maps as well as headlines and relevant images on our cell phone using simply, SMS services and no data/wifi requirements.

## What we learned
First-time experience working with Node.js, Twilio's API and configuring our own bot. 

## What's next for connec-ted
In the future, we plan to: 
- Retrieve the user's live location by extracting GPS coordinates from the SMS, and thus use it to providing directions in real-time.
- Develop more essential services that can be made accessible to all.
- While we support various international languages, we hope to allow more native languages for easy use by people of all backgrounds.
