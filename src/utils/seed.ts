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

	const dbUsers = await User.find();
	// Get a random user
	// generate 20 thoughts
	let thoughts: any[] = [];
	for (let i = 0; i < 20; i++) {
		const randomUser = dbUsers[Math.floor(Math.random() * dbUsers.length)];
		const ranNumthoughts = Math.floor(Math.random() * 5);
		if (ranNumthoughts === 0) continue;
		const randUserThoughts = getRandomThoughts(
			ranNumthoughts,
			randomUser.username,
			dbUsers
		);
		randUserThoughts.forEach((userThought) => {
			thoughts.push(userThought);
		});
	}
	// Insert thoughts into the database
	await Thought.insertMany(thoughts);

	let newDBUsers = dbUsers;

	// Use Promise.all to handle asynchronous operations
	await Promise.all(
		newDBUsers.map(async (dbUser: any) => {
			// Fetch thoughts associated with the user's username
			const userThoughts = await Thought.find({ username: dbUser.username });

			// Assign the ObjectIDs of the found thoughts to the user's thoughts array
			dbUser.thoughts = userThoughts
				.map((userThought) => {
					if (!userThought._id) {
						console.error("userThought does not have an _id:", userThought);
						return null; // Handle the error appropriately
					}
					return userThought._id; // Return the ObjectId
				})
				.filter((id) => id !== null); // Filter out any null values if needed
				
			// array of friends
			let friends = [];
			for (let i = 0; i < (Math.floor(Math.random() * dbUsers.length)); i++) {
				const randomIndex = Math.floor(Math.random() * dbUsers.length);
				friends.push(dbUsers[randomIndex]._id);
			}
			dbUser.friends = friends;
		})
	);

	// update users collection with new set of users
	try {
		// Drop the existing users collection
		await User.collection.drop();
		console.log("Existing users collection dropped.");

		// Insert the new users into the collection
		await User.insertMany(newDBUsers);
		console.log("New users collection inserted.");
	} catch (error) {
		console.error("Error replacing users collection:", error);
	}

	console.log(JSON.stringify(await connection.collection("users").find().toArray()));
	console.log(JSON.stringify(await connection.collection("thoughts").find().toArray()));
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
