# Marketplace Mobile App

A cross-platform (iOS / Android ) marketplace application built with **Expo**, **React Native**, and **Expo Router**.  
The project uses **TypeScript**, **TanStack React Query**, **Zustand**, **Formik + Yup**, and modern Expo SDK 54 modules.

---

## 🚀 Features

- **Expo Router** with file-based navigation  
- **Authentication flow** (Zustand for local state + TanStack Query for server data)  
- **Image uploading** using Expo Image Picker  
- **Form management** using Formik + Yup  
- **Masked inputs** (phone number, date)  
- **Animations** (Reanimated & Worklets)  
- **Safe area and gesture support**  
- **Async-storage persistence** for React Query  
- **Consistent UI** with Expo vector icons and custom fonts  

---

## 📦 Tech Stack

### Core
- expo ~54  
- react-native 0.81  
- expo-router 6  
- react 19  

### State & Data
- @tanstack/react-query  
- @tanstack/query-async-storage-persister  
- zustand  
- axios  

### UI & Interaction
- @expo/vector-icons  
- react-native-gesture-handler  
- react-native-reanimated  
- react-native-safe-area-context  
- react-native-screens  
- expo-image / expo-image-picker  
- react-native-masked-text  
- react-native-keyboard-aware-scroll-view  

### Forms & Validation
- formik  
- yup  

### Utilities
- dayjs  
- uuid  

### Dev Tools
- TypeScript  
- ESLint + Prettier  
- Jest + Testing Library  
- Husky + lint-staged  

---

## 🛠 Setup & Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd marketplace
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

---

## ▶️ Running the App

You can run the app in different environments:

| Platform | Command |
|----------|----------|
| iOS Simulator | `npm run ios` |
| Android Emulator | `npm run android` |
| Web | `npm run web` |

---

## 📁 Project Structure

```
app/
  (auth)/
  (main)/
  (tabs)/
  ...
src/
  components/
  features/
  state/
  api/
package.json
README.md
```

- Navigation uses **file-based routing** inside the `app/` directory.  
- Shared UI components live in `src/components/`.  
- Global state lives in `src/state/`.  
- Backend API helpers live in `src/features/`.  

---

## 🧪 Testing

Run tests:

```bash
npm test
```

Powered by **jest** and **@testing-library/react-native**.

---

## 🧹 Maintenance Scripts

| Script | Description |
|--------|-------------|
| `npm run lint` | Check code style |
| `npm run lint:fix` | Fix linting errors |
| `npm run fix-deps` | Auto-fix Expo dependency versions |
| `npm run doctor` | Expo doctor checks |
| `npm run reset-project` | Clean & reset dev environment |

---

## 📚 Learn More

- Expo documentation: https://docs.expo.dev/  
- Expo Router docs: https://expo.github.io/router/docs  
- React Query docs: https://tanstack.com/query/latest  
- React Native docs: https://reactnative.dev/  

---

## 🤝 Contributing

Pull requests and issues are welcome.  
Please run linting and tests before submitting any changes.