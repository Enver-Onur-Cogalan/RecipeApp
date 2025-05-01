import axios from "axios";

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Get all categories
export const fetchCategories = async () => {
    const response = await axios.get(`${BASE_URL}/categories.php`);
    return response.data.categories;
};

// Get all countries (area)
export const fetchAreas = async () => {
    const response = await axios.get(`${BASE_URL}/list.php?a=list`);
    return response.data.meals;
};

// Search by name
export const searchMeals = async (query) => {
    const response = await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data.meals;
};

// Filter by category
export const filterByCategory = async (category) => {
    const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
    return response.data.meals;
};

// Filter by country (area)
export const filterByArea = async (area) => {
    const response = await axios.get(`${BASE_URL}/filter.php?a=${area}`);
    return response.data.meals;
};

// Get detailed food information with ID
export const getMealDetails = async (id) => {
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals[0];
};

// Get random food
export const fetchRandomMeal = async () => {
    const response = await axios.get(`${BASE_URL}/random.php`);
    return response.data.meals[0];
};