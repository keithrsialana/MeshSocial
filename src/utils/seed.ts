import connection from "../config/connection.js";
import { Reaction, Thought, User } from "../models/index.js";
import { getRandomName, getRandomThoughts, getThoughtResponses } from "./data.js";

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");
	// Delete the collections if they exist
	let thoughtCheck = await connection.db
		?.listCollections({ name: "thoughts" })
		.toArray();
	if (thoughtCheck?.length) {
		await connection.dropCollection("thoughts");
	}

    // Delete user collections if they exist
	let userCheck = await connection.db
		?.listCollections({ name: "users" })
		.toArray();
	if (userCheck?.length) {
		await connection.dropCollection("users");
	}

    // Delete reaction collections if they exist
	let reactionCheck = await connection.db
    ?.listCollections({ name: "reactions" })
    .toArray();
if (reactionCheck?.length) {
    await connection.dropCollection("reactions");
}

	const users = [];
	const thoughts = getRandomThoughts(10);
    const reactions = getThoughtResponses(10);

	for (let i = 0; i < 20; i++) {
		const fullName = getRandomName();
		const first = fullName.split(" ")[0];
		const last = fullName.split(" ")[1];

		users.push({
			first,
			last,
			age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
		});
	}

	await User.insertMany(users);
	await Thought.insertMany(thoughts);
    await Reaction.insertMany(reactions);

	// loop through the saved videos, for each video we need to generate a video response and insert the video responses
	console.table(users);
	console.table(thoughts);
    console.table(reactions);
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
