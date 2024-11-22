import connection from "../config/connection.js";
import { Thought, User } from "../models/index.js";
import { getRandomThoughts, getRandomUserName, makeEmail } from "./data.js";

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");
	// Delete the thought collections if they exist
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

	// Generate 10 user documents
	let users = [];
	for (let i = 0; i < 10; i++) {
		const username = getRandomUserName();
		const email = makeEmail(username);

		users.push({
			username,
			email,
		});
	}
	// Insert users into the database
	await User.insertMany(users);

	let dbUsers = await User.find();
	// Get a random user
	// generate 20 thoughts 
	let thoughts:any[] = [];
	for (let i = 0; i < 20; i++) {
		const randomUser = dbUsers[Math.floor(Math.random() * dbUsers.length)];
		const ranNumthoughts = Math.floor(Math.random() * 5);
		if (ranNumthoughts === 0 )
			continue; 
		const randUserThoughts = getRandomThoughts(ranNumthoughts, randomUser.username, dbUsers);
		randUserThoughts.forEach(userThought => {
			thoughts.push(userThought);
		});
	}
	// Insert thoughts into the database
	await Thought.insertMany(thoughts);

	console.table(await connection.collection("users").find().toArray());
	console.table(await connection.collection("thoughts").find().toArray());
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
