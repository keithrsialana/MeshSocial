# MeshSocial API  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
## Table of Contents
- [Description](#description)
- [Purpose](#purpose)
- [Usage](#usage)
- [Installation Instructions](#installation-instructions)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Description  
The **MeshSocial API** is a backend application designed to support a social networking platform. Users can:  
- Post and manage thoughts.  
- React to friends' thoughts.  
- Build and manage dynamic friend lists.  

The API is built with **Express.js** for routing, **MongoDB** for a scalable NoSQL database, and **Mongoose** as the ODM to streamline schema definitions and relationships. It is designed to handle large volumes of unstructured social network data efficiently.  

## Purpose  
This project focuses on:  
- Developing a robust API for social platforms.  
- Utilizing NoSQL databases to handle schema-less, unstructured data.  
- Implementing CRUD functionality for user and content management.  
- Practicing database modeling with Mongoose.  

By working on this API, developers gain insights into backend development workflows for large-scale, data-driven applications.  

## Usage  
This API is designed for local testing and can be accessed through tools like **Insomnia** or **Postman**. Developers can leverage it as a backend foundation for building scalable social networking platforms.

## Installation Instructions
### Prerequisites
- MongoDB and NodeJS installed into computer
### Installation
- Clone repository to a folder
- Enter local repository folder after cloning
- Install dependencies using ```npm i && npm run install``` in a terminal

## Key Features  
- **User Profiles:**  
  - Create, update, delete, and retrieve users.  
  - Maintain friend lists by adding or removing friends.  

- **Thoughts (Posts):**  
  - CRUD operations for user thoughts.  
  - Each thought is tied to a user and can be interacted with.  

- **Reactions:**  
  - Attach reactions to thoughts, enabling social interactions.  

- **Timestamps:**  
  - Timestamps are auto-generated and formatted for readability using either a JavaScript date library or native methods.  

## Technologies  
- **Express.js** – A lightweight framework for handling API endpoints.  
- **MongoDB** – A NoSQL database optimized for high-volume, unstructured data.  
- **Mongoose** – A schema-based solution for modeling MongoDB data relationships.  
- **JavaScript Date Library (optional)** – Formats timestamps efficiently.  

## Credits
Keith Sialana

## License
MIT

## Questions
- [GitHub](https://github.com/keithrsialana)
- [Email](mailto:keith.sialana@hotmail.com)
