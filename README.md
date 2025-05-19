# horse-owner

An API that links horses to it's owners and owners see and update horses health status

# 🐴 Horse Owner API

A TypeScript-based RESTful API for managing horse owners, built with Express and Firebase Admin SDK. Designed with developer experience in mind using Zod for validation and Jest for testing.

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
git clone https://github.com/yourusername/horse-api.git
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

![API Diagram](./assets/api-structure.png)

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

## 📜 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

**[Your Name]**  
_Feel free to update this section with your name, GitHub link, or contact info._

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📫 Contact

For issues or feature requests, please open an issue in the repository.
