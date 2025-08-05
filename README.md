# 🎬 TV Show App — React + Vite + Appwrite + TMDb

A dynamic and responsive **Movie App** built with **React**, **JavaScript**, and **Vite**, using **Appwrite** as the backend database and **TMDb (The Movie Database)** for movie data.

---

## 🧰 Features

- ⚛️ Fast and modern React front-end with Vite  
- 🎞️ Fetches real TV show data from [TMDb API](https://www.themoviedb.org/documentation/api)  
- 🗃️ Uses [Appwrite](https://appwrite.io) to manage saved Tv show and user data  
- 🔍 Search, browse, and view movie details    
- 🎨 Clean UI and modular project structure  

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/your-username/movie-app.git
cd movie-app
```
### 📦 Install Dependencies

```bash
npm install
# or
yarn
```

### 🧪 Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173/`.

---

## 🧩 Appwrite & TMDb Integration Overview

1. **TMDb API**
   - Used to fetch movie details, posters, ratings, genres, and more.
   - API requests are made using the `VITE_TMDB_API_KEY` stored in your `.env`.

2. **Appwrite Database**
   - Stores user-specific data like favorite or saved movies.
   - Each movie entry can be saved in a collection using a unique user ID or session.

4. **Permissions & Access Control**
   - Appwrite’s permission model lets you control who can read/write specific documents.
   - Example: Only allow users to update/delete their own saved movie entries.

5. **Environment Variables Required**
   - The app uses `.env` variables to securely access both Appwrite and TMDb services.
   ```env
   VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id

   VITE_TMDB_API_KEY=your_tmdb_api_key

---

## 🧪 Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Run development server   |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

MIT License © 2025 Babafemitan Fagbemi

## 🙌 Acknowledgements

- [React](https://reactjs.org/) — For the front-end library  
- [Vite](https://vitejs.dev/) — For the fast build tool  
- [Appwrite](https://appwrite.io/) — For backend-as-a-service features  
- [The Movie Database (TMDb)](https://www.themoviedb.org/) — For movie data and posters

> This product uses the TMDb API but is not endorsed or certified by TMDb.
