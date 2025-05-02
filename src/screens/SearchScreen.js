import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchCategories, filterByCategory, searchMeals } from '../api/meals';
import MealCard from '../components/MealCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoryFilterEnabled, setCategoryFilterEnabled] = useState(false);

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
            setLoading(true);
            let data = [];

            if (query.length >= 2) {
                const result = await searchMeals(query);
                data = result || [];
            }

            if (categoryFilterEnabled && selectedCategory) {
                if (data.length === 0) {
                    const filtered = await filterByCategory(selectedCategory);
                    data = filtered || [];
                } else {
                    data = data.filter((meal) => meal.strCategory === selectedCategory);
                }
            }

            if (!query && (!categoryFilterEnabled || selectedCategory === '')) {
                data = [];
            }

            setMeals(data);
            setLoading(false);
        };

        applyFilters();
    }, [query, selectedCategory, categoryFilterEnabled]);


    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Search a meal..."
                value={query}
                onChangeText={setQuery}
                style={styles.input}
            />

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

            {loading ? (
                <ActivityIndicator size="large" color="#00c897" />
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
        borderRadius: 8,
        marginBottom: 12,
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginVertical: 12,
        alignItems: 'center',
    },
    toggleText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    categoryChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: 40,
    },
    categoryChipSelected: {
        backgroundColor: '#00c897',
    },
});


export default SearchScreen;