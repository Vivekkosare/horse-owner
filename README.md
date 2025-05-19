# 🐴 Horse Owner API

A TypeScript-based RESTful API for managing horse owners. API that links horses to it's owners, owners can see and update horse's health status, built with Express and Firebase Admin SDK. Designed with developer experience in mind using Zod for validation and Jest for testing.

---

## 🚀 Features

- ⚙️ Built on **Express 5.x**
- 🧼 Clean and strongly typed **TypeScript**
- ✅ Schema validation with **Zod**
- 🔐 Integrated with **Firebase Admin SDK**
- 🔄 Hot-reload in development using **ts-node-dev**
- 🧪 Unit and integration testing with **Jest** & **Supertest**

---

## 📦 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Validation**: Zod
- **Authentication/Data**: Firebase Admin SDK
- **Testing**: Jest, Supertest

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Vivekkosare/horse-owner.git
cd horse-api
```

### 2. Install Dependencies

```bash
# Install production dependencies
npm install dotenv express firebase-admin zod

# Install development dependencies
npm install --save-dev \
  typescript ts-node ts-node-dev \
  jest ts-jest @types/jest \
  supertest @types/supertest \
  @types/node @types/express
```

> 💡 Alternatively, if you're using the existing `package.json`, just run:

```bash
npm install
```

---

## 🌱 Environment Variables

Create a `.env` file in the project root and define your Firebase credentials and any other environment variables:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
```

> 🔐 Be sure to keep this file out of version control (already listed in `.gitignore`).

---

## 📂 Project Structure

<img src="https://github.com/Vivekkosare/horse-owner/blob/main/assets/api_structure.png" alt="API Diagram" width="350" height="600"/>

---

## 🚦 Scripts

| Command                    | Description                      |
| -------------------------- | -------------------------------- |
| `npm run dev`              | Run the app in development mode  |
| `npm test`                 | Run all tests                    |
| `npm run test:unit`        | Run only unit tests              |
| `npm run test:integration` | Run only integration tests       |
| `npm run build`            | Compile TypeScript to JavaScript |

---

## 🧪 Running Tests

### Run all tests

```bash
npm test
```

### Unit tests only

```bash
npm run test:unit
```

### Integration tests only

```bash
npm run test:integration
```

---

---

## 🐴 API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Horses

- `GET    /api/v1/horses` — Get all horses
- `POST   /api/v1/horses` — Create a new horse
- `PUT    /api/v1/horses/:id` — Update a horse by ID
- `DELETE /api/v1/horses/:id` — Delete a horse by ID
- `PATCH  /api/v1/horses/:id/health` — Update health status of a horse

### Owners

- `GET    /api/v1/owners` — Get all owners
- `POST   /api/v1/owners` — Create a new owner
- `GET    /api/v1/owners/:id` — Get an owner by ID
- `PUT    /api/v1/owners/:id` — Update an owner by ID
- `DELETE /api/v1/owners/:id` — Delete an owner by ID

---

## 📬 API Testing with Postman

A ready-to-use Postman collection is provided to help you explore and test the API endpoints.

- **Location:** [`postman_collection/HorseOwners.postman_collection.json`](./postman_collection/HorseOwners.postman_collection.json)

### How to use

1. Open Postman.
2. Click **Import** and select the file at `postman_collection/HorseOwners.postman_collection.json`.
3. Use the included requests to interact with the API.

---

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

**[Vivek Kosare]**  
\_

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📫 Contact

For issues or feature requests, please open an issue in the repository.
