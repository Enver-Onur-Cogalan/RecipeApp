import { makeAutoObservable, runInAction } from "mobx";
import { db } from "../firebase/firebase";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";

class FavoriteStore {
    favorites = [];

    constructor() {
        makeAutoObservable(this);
        this.loadFavorites();
    }

    async loadFavorites() {
        try {
            const snapshot = await getDocs(collection(db, 'favorites'));
            const favs = snapshot.docs.map((doc) => ({
                idMeal: doc.id,
                ...doc.data(),
            }));
            runInAction(() => {
                this.favorites = favs;
            })
        } catch (e) {
            console.error('Failed to load favorites from Firestore', e)
        }
    }

    async addFavorite(meal) {
        try {
            const ref = doc(db, 'favorites', meal.idMeal);
            await setDoc(ref, {
                name: meal.strMeal ?? 'Unnamed',
                id: meal.idMeal,
            });
            runInAction(() => {
                this.favorites.push(meal);
            });
        } catch (e) {
            console.error('Failed to add favorite', e);
        }
    }

    async removeFavorite(mealId) {
        try {
            const ref = doc(db, 'favorites', mealId);
            await deleteDoc(ref);
            runInAction(() => {
                this.favorites = this.favorites.filter((item) => item.idMeal !== mealId);
            });
        } catch (e) {
            console.error('Failed to remove favorite', e);
        }
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