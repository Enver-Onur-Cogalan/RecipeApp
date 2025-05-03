# 🍽️ RecipeApp

A stylish and dynamic React Native app for discovering, searching, and saving your favorite meals. Built with passion, animations, and clean architecture.  
Easily filter meals by category and region, search with smart UX, and mark your favorites with a satisfying heart pop ❤️

---

## 🚀 Features

- 🍱 **Meal Categories & Area Filters**
- 🔍 **Smart Search Screen** with dynamic query + category + area filter support
- ❤️ **Favorite System** powered by MobX
- 🎬 **Smooth UI Animations** with react-native-animatable
- 🌐 **Axios-powered API integration** from [TheMealDB](https://www.themealdb.com)
- 🎉 **Lottie Animations** on empty/favorite/search result screens
- 🧩 **Modular Folder Structure** & Clean Codebase

---

## 📱 Screenshots

| Home Screen | Search Screen | Detail Screen | Favorites |
|-------------|---------------|---------------|-----------|
| ![homeScreen](https://github.com/user-attachments/assets/3d9d60ba-f7c3-4115-b404-445770208f29) | ![SearchScreen](https://github.com/user-attachments/assets/6cd2091c-6045-4c84-af9f-db20387997ef) | ![DetailScreen](https://github.com/user-attachments/assets/6526b6cd-abc7-40ed-a58a-c6846ddf7032) | ![FavoritesScreen](https://github.com/user-attachments/assets/b4795ba8-c76d-4f85-ac8a-849b40e5b0cf) |

---

## 🛠️ Tech Stack

- **React Native CLI**
- **MobX** for state management
- **Axios** for API requests
- **React Navigation (Stack + Tab)**
- **Lottie** & **Animatable** for animation delight

---

## 📦 Installation

```bash
git clone https://github.com/Enver-Onur-Cogalan/RecipeApp.git
cd RecipeApp
yarn install

# iOS
cd ios && pod install && cd ..
yarn ios

# Android
yarn android
```

---

## 📁 Folder Structure

```
src/
│
├── api/              # API functions (Axios)
├── components/       # Reusable UI components
├── screens/          # App screens (Search, Detail, Favorites)
├── stores/           # MobX stores
├── utils/            # Helpers, animations, constants
└── assets/           # Lottie animations, images, icons
```

---

## 🙌 Author

Made with 💚 by **Enver Onur Çoğalan**  
[GitHub](https://github.com/Enver-Onur-Cogalan)

---

## 📄 License

MIT — use freely, credit appreciated.
