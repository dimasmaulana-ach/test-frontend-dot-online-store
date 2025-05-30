# DOT Technical Test Task Management


## 🚀 Tech Stack

Frontend: React.js, React Router, Zustand, Tailwind CSS, Tanstack React Query

Backend: Nest JS > (https://github.com/dimasmaulana-ach/api-technical-test-dot)

Database: Neon Postgres

State Management: (Zustand)

### 📂 Project Structure
```
📂 src
 ┣ 📂 components      # Component reusable
 ┣ 📂 features        # Direktori utama (modular)
 ┣ 📂 hooks           # Custom hooks
 ┣ 📂 layouts         # Component Layouts
 ┣ 📂 router          # Routing App
 ┣ 📂 utils           # Helper functions
 ┣ 📜 main.tsx        # Entry point aplikasi
 ┗ 📜 App.tsx         # Root Component
```
### 🔧 Installation & Setup

#### Clone repository:

```
git clone https://github.com/dimasmaulana-ach/test-frontend-dot-online-store.git
```

#### Masuk ke direktori proyek:

```
cd test-frontend-dot-online-store
```

#### Install dependencies:
```
npm install
```
atau
```
pnpm install
```

#### Jalankan aplikasi:
```
npm run dev
```
atau
```
pnpm dev
```
Akses aplikasi di http://localhost:5173
Atau aplikasi di server https://onlinestore-dot.dimasmaulana.com/

⚙️ Environment Variables

Buat file .env di root proyek dan tambahkan variabel yang dibutuhkan:
```
VITE_API_URL=https://api-technical-test-dot-production.up.railway.app/api/
```

🚀 Deployment

Build aplikasi:

```
npm run build
```

Deploy ke hosting (Vercel):

```
vercel deploy
```