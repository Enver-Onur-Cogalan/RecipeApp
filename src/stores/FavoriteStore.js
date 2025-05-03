import { makeAutoObservable, runInAction } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

class FavoriteStore {
    favorites = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFavorites();
    }

    async loadFavorites() {
        try {
            const data = await AsyncStorage.getItem('favorites');
            if (data) {
                runInAction(() => {
                    this.favorites = JSON.parse(data);
                });
            }
        } catch (e) {
            console.error('Failed to load favorites', e);
        }
    }

    async saveFavorites() {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(this.favorites));
        } catch (e) {
            console.error('Failed to save favorites', e);
        }
    }

    addFavorite(meal) {
        this.favorites.push(meal);
        this.saveFavorites();
    }

    removeFavorite(mealId) {
        this.favorites = this.favorites.filter((item) => item.idMeal !== mealId);
        this.saveFavorites();
    }

    toggleFavorite(meal) {
        const exists = this.isFavorite(meal.idMeal);
        if (exists) {
            this.removeFavorite(meal.idMeal);
        } else {
            this.addFavorite(meal);
        }
    }

    isFavorite(mealId) {
        return this.favorites.some((item) => item.idMeal === mealId);
    }
}

const favoriteStore = new FavoriteStore();
export default favoriteStore;