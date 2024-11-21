const names = [
    "Aaron",
    "Adrian",
    "Alexander",
    "Allen",
    "Anderson",
    "Andrew",
    "Anthony",
    "Arnold",
    "Austin",
    "Barry",
    "Blake",
    "Bradley",
    "Brandon",
    "Bryant",
    "Cameron",
    "Carson",
    "Carter",
    "Chandler",
    "Charles",
    "Christian",
    "Clark",
    "Cole",
    "Collins",
    "Cooper",
    "Cruz",
    "Davis",
    "Douglas",
    "Duncan",
    "Ellis",
    "Elliott",
    "Foster",
    "Graham",
    "Grant",
    "Griffin",
    "Harris",
    "Harrison",
    "Hudson",
    "Jackson",
    "James",
    "Jordan",
    "Kennedy",
    "Lee",
    "Lewis",
    "Martin",
    "Mason",
    "Mitchell",
    "Morgan",
    "Parker",
    "Reed",
    "Scott",
    "Taylor",
    "Thomas",
    "Walker",
    "Wallace",
    "Wilson",
    "Wright",
];

const thoughtBodies = [
    "pineapple DOES belong on pizza, fight me",
    "why do people still buy starbucks? it's burnt coffee in a cup smh",
    "ok but hear me out, cats are just better than dogs",
    "flat earth theory isn’t as crazy as it sounds... do ur research",
    "if you microwave pizza, we can't be friends.",
    "no one: literally no one: me at 3am: should i move to japan?",
    "tbh daylight savings time is a scam to control us",
    "is cereal soup? discuss.",
    "elon musk is overrated, don't @ me",
    "hot take: netflix peaked in 2015, everything now is mid",
    "if ur still eating hot dogs after learning what’s in them... u brave",
    "social media is toxic but here i am posting this anyway",
    "can we talk about how nobody knows how to merge on highways",
    "lowkey think aliens walk among us. like, LOOK at mark zuckerberg",
    "the moon landing was obviously faked. c'mon now.",
    "why do they charge $7 for popcorn at the movies? it's popcorn!!",
    "ok but if pineapple on pizza is wrong, i don’t wanna be right",
    "idc what anyone says, shrek 2 is the greatest sequel of all time",
    "is water wet tho? i mean REALLY think about it",
    "sometimes i think my cat understands me better than humans do",
];

const possibleResponses = [
    "Nah, I don’t think so. Here’s why…",
    "Tried this—didn’t work for me, but cool idea.",
    "Whoa, this is super interesting!",
    "This made me laugh way more than it should have 😂",
    "Honestly, this is such a great point. Thanks for sharing!",
    "Not sure I agree, but I see where you’re coming from.",
    "Mind blown 🤯 Never thought of it like this before.",
    "Lol, this is exactly what I needed today. Thanks!",
    "Can you explain this a bit more? I’m curious!",
    "Okay, but what about [insert counterpoint]? 🤔",
    "This is kinda genius tbh.",
    "Wait… are you serious? This is wild!",
    "I 100% agree! This needs to be talked about more.",
    "Respectfully, I think you’re missing something here.",
    "I love this idea—it’s so outside the box.",
    "Actually, this reminds me of something I saw recently. Cool stuff!",
    "Does anyone else feel like this hits a little too close to home? 😅",
    "Interesting take, but I’m not totally sold on it.",
    "OMG YES. I’ve been saying this forever!",
    "This is gold. Saving this for later.",
    "Uh, are we just gonna ignore how big this could actually be?",
    "Love the energy here. Keep it up!",
    "This is the kind of thinking we need more of.",
    "Hmmm, idk about this. Can you elaborate?",
    "You’re onto something here. I like it.",
    "I can’t believe more people aren’t talking about this.",
    "Hot take, but I’m kinda here for it 🔥",
    "Okay, but what’s the solution? Asking for a friend 😜",
    "Dude, I feel this on a spiritual level.",
    "This deserves way more attention. Great post!"
];


// Get a random item given an array
const getRandomArrItem = (arr: any[]) =>
	arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
	`${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts that we can add to the database. Includes thought responses.
const getRandomThoughts = (int: number) => {
	let results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			published: Math.random() < 0.5, // returns true or false
			description: getRandomArrItem(thoughtBodies),
			responses: [...getThoughtResponses(3)],
		});
	}
	return results;
};

// Create the responses that will be added to each thought
const getThoughtResponses = (int: number) => {
	if (int === 1) {
		return getRandomArrItem(possibleResponses);
	}
	let results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			responseBody: getRandomArrItem(possibleResponses),
			username: getRandomName(),
		});
	}
	return results;
};

// Export the functions for use in seed.js
export { getRandomName, getRandomThoughts, getThoughtResponses };