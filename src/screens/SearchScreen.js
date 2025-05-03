import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { fetchCategories, filterByArea, filterByCategory, getAllAreas, searchMeals, fetchRandomMeal } from '../api/meals';
import MealCard from '../components/MealCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryFilterEnabled, setCategoryFilterEnabled] = useState(false);

    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState('');
    const [areaFilterEnabled, setAreaFilterEnabled] = useState(false);

    useEffect(() => {
        const loadAreas = async () => {
            const data = await getAllAreas();
            setAreas(data);
        };
        loadAreas();
    }, []);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error('Error loading category:', err);
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;

        const fetchFilteredMeals = async () => {
            const data = await filterByCategory(selectedCategory);
            setMeals(data || []);
        };

        fetchFilteredMeals();
    }, [selectedCategory]);

    useEffect(() => {
        const applyFilters = async () => {
            const isCategoryFilterActive = categoryFilterEnabled && selectedCategory !== '';
            const isAreaFilterActive = areaFilterEnabled && selectedArea !== '';

            setLoading(true);
            let data = [];

            if (query.length >= 2) {
                const result = await searchMeals(query);
                data = result || [];
            }

            if (isCategoryFilterActive) {
                if (data.length === 0) {
                    const categoryData = await filterByCategory(selectedCategory);
                    data = categoryData || [];
                } else {
                    data = data.filter((meal) => meal.strCategory === selectedCategory);
                }
            }

            if (isAreaFilterActive) {
                const areaData = await filterByArea(selectedArea);
                const areaMeals = areaData || [];

                if (data.length === 0) {
                    data = areaMeals;
                } else {
                    data = data.filter((meal) =>
                        areaMeals.some((a) => a.idMeal === meal.idMeal)
                    );
                }
            }

            if (!query && !isCategoryFilterActive && !isAreaFilterActive) {
                data = [];
            }

            setMeals(data);
            setLoading(false);
        };

        applyFilters();
    }, [query, selectedCategory, categoryFilterEnabled, selectedArea, areaFilterEnabled]);


    const navigation = useNavigation();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >

                <SafeAreaView style={styles.container}>
                    <TextInput
                        placeholder="Search a meal..."
                        value={query}
                        onChangeText={setQuery}
                        style={styles.input}
                    />

                    <Text style={styles.title}>
                        Discover Meals 🍽️
                    </Text>

                    <TouchableOpacity
                        onPress={() => {
                            if (areaFilterEnabled) {
                                setSelectedArea('');
                            } else {
                                setSelectedArea('');
                            }
                            setAreaFilterEnabled(!areaFilterEnabled);
                        }}
                        style={styles.toggleButton}
                    >
                        <Text style={styles.toggleText}>
                            {areaFilterEnabled ? 'Disable Area Filter' : 'Enable Area Filter'}
                        </Text>
                    </TouchableOpacity>

                    {areaFilterEnabled && (
                        <FlatList
                            horizontal
                            data={[{ strArea: 'All Areas' }, ...areas]}
                            keyExtractor={(item) => item.strArea}
                            renderItem={({ item }) => {
                                const isSelected =
                                    (item.strArea === 'All Areas' && selectedArea === '') ||
                                    selectedArea === item.strArea;

                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.categoryChip,
                                            isSelected && styles.categoryChipSelected,
                                        ]}
                                        onPress={() =>
                                            setSelectedArea(item.strArea === 'All Areas' ? '' : item.strArea)
                                        }
                                    >
                                        <Text>{item.strArea}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                            style={{ marginBottom: 12 }}
                            showsHorizontalScrollIndicator={false}
                        />
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            if (categoryFilterEnabled) setSelectedCategory('');
                            else setSelectedCategory('');
                            setCategoryFilterEnabled(!categoryFilterEnabled);
                        }}
                        style={styles.toggleButton}
                    >
                        <Text style={styles.toggleText}>
                            {categoryFilterEnabled ? 'Disable Category Filter' : 'Enable Category Filter'}
                        </Text>
                    </TouchableOpacity>

                    {categoryFilterEnabled && (
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={[{ idCategory: 'all', strCategory: 'All Categories' }, ...categories]}
                            keyExtractor={(item) => item.idCategory}
                            renderItem={({ item }) => {
                                const isSelected =
                                    (item.strCategory === 'All Categories' && selectedCategory === '') ||
                                    selectedCategory === item.strCategory;

                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.categoryChip,
                                            isSelected && styles.categoryChipSelected,
                                        ]}
                                        onPress={() => {
                                            const value = item.strCategory === 'All Categories' ? '' : item.strCategory;
                                            setSelectedCategory(value);
                                        }}
                                    >
                                        <Text>{item.strCategory}</Text>
                                    </TouchableOpacity>
                                );
                            }}

                            style={{ marginBottom: 12 }}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.randomButton}
                        onPress={async () => {
                            const meal = await fetchRandomMeal();
                            if (meal) {
                                navigation.navigate('Detail', { mealId: meal.idMeal });
                            }
                        }}
                    >
                        <Icon name='sparkles' size={20} color='#666' style={{ marginRight: 8 }} />
                        <Text style={styles.randomButtonText}>Chief's Surprise</Text>
                        <Icon name='sparkles' size={20} color='#666' style={{ marginLeft: 8 }} />
                    </TouchableOpacity>


                    {loading ? (
                        <ActivityIndicator size="large" color="#00c897" />
                    ) : meals.length === 0 ? (
                        <View style={styles.center}>
                            <LottieView
                                source={require('../assets/animations/empty.json')}
                                autoPlay
                                loop
                                style={{ width: 200, height: 200 }}
                            />
                            <Text style={{ marginTop: 16, color: '#555' }}>No meals found.</Text>
                        </View>
                    ) : (
                        <View style={{ flex: 8 }}>
                            <FlatList
                                data={meals}
                                keyExtractor={(item) => item.idMeal}
                                renderItem={({ item }) => <MealCard meal={item} />}
                                contentContainerStyle={{ paddingBottom: 100 }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    )}
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        flexDirection: 'column',
    },
    input: {
        borderWidth: 1,
        borderColor: '#00c897',
        padding: 12,
        borderRadius: 20,
        marginBottom: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    toggleText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    categoryChip: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        backgroundColor: '#f4f4f4',
        borderRadius: 20,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
        borderWidth: 1,
    },
    categoryChipSelected: {
        backgroundColor: '#00c897',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        alignSelf: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    randomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00c897',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    randomButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 18,
        letterSpacing: 0.75,
    }
});


export default SearchScreen;