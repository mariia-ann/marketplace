import search from "@/assets/images/profile/search/search.png";
import Colors from "@/constants/Colors";
import DepartmentNovaPost from "@/src/components/ui/profile/address/searchFields/departmentNovaPost";
import DepartmentUrkPost from "@/src/components/ui/profile/address/searchFields/departmentUrkPost";
import ParcelNovaPost from "@/src/components/ui/profile/address/searchFields/parcelNovaPost";
import { useLocalSearchParams, useRouter } from "expo-router";
import { XCircle } from 'phosphor-react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type SourceType = 'add' | 'change';
type CarrierType = 'nova' | 'ukr';
type SelectorType = 'department' | 'parcel';

export default function BranchFields() {
    const router = useRouter();
    const { source, carrier, type, city, id, title, address, codePostal } = useLocalSearchParams<{
        source?: SourceType;
        carrier?: CarrierType;
        type?: SelectorType;
        city?: string;
        id?: string;
        title?: string;
        address?: string;
        codePostal?: string;
    }>();

    const [query, setQuery] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const inputRef = useRef<TextInput>(null);

    const items = useMemo(() => {
        // For now, parcel list isn't provided; reuse structure with empty fallback
        if (!city) return [] as { name: string; address?: string }[];

        if (type === 'parcel') {
            const found = ParcelNovaPost.find(c => c.city === city);
            return found ? found.ParcelNovaPost : [];
        }

        if (carrier === 'ukr') {
            const found = DepartmentUrkPost.find(c => c.city === city);
            return found ? found.DepartmentUrkPost : [];
        }

        const found = DepartmentNovaPost.find(c => c.city === city);
        return found ? found.DepartmentNovaPost : [];
    }, [carrier, type, city]);

    const filtered = useMemo(() => {
        if (!query) return items;
        const q = query.toLowerCase();
        return items.filter(it =>
            it.name.toLowerCase().includes(q) || (it.address || '').toLowerCase().includes(q)
        );
    }, [items, query]);

    useEffect(() => {
        // keep selected highlighted if revisiting
        if (address) {
            setSelectedId(address as string);
        }
    }, [address]);

    const clearQuery = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    const selectItem = (value: string) => {
        setSelectedId(prev => (prev === value ? null : value));
    };

    const handleConfirm = () => {
        if (!selectedId) return;

        if (source === 'add') {
            router.replace({
                pathname: "/(tabs)/profile/addresses/addNewAddress",
                params: {
                    city: city || '',
                    third: selectedId,
                    title: title || '',
                    codePostal: codePostal || ''
                }
            });
            return;
        }

        router.replace({
            pathname: "/(tabs)/profile/addresses/changeAddress",
            params: {
                id: id || '',
                title: title || '',
                address: selectedId,
                city: city || '',
                codePostal: codePostal || '',
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Image source={search} style={styles.icon} resizeMode="contain" />
                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder="Пошук..."
                    placeholderTextColor="#999999"
                    onChangeText={setQuery}
                    value={query}
                    underlineColorAndroid="transparent"
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={clearQuery} style={{ marginRight: 11 }}>
                        <XCircle size={32} color="#ac94e8" />
                    </TouchableOpacity>
                )}
            </View>

            <ScrollView style={{ marginTop: 24 }}>
                {filtered.length === 0 ? (
                    <Text style={styles.notFoundText}>Нічого не знайдено</Text>
                ) : (
                    filtered.map((it) => {
                        const value = it.name;
                        return (
                            <Pressable
                                key={value}
                                style={[
                                    styles.itemContainer,
                                    selectedId === value && { backgroundColor: '#F5F4FE' }
                                ]}
                                onPress={() => selectItem(value)}
                            >
                                <View style={styles.itemTextContainer}>
                                    <Text style={styles.itemName}>{it.name}</Text>
                                    {it.address ? (
                                        <Text style={styles.itemAddress}>{it.address}</Text>
                                    ) : null}
                                </View>
                            </Pressable>
                        );
                    })
                )}

                {selectedId && (
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleConfirm}
                    >
                        <Text style={styles.saveButtonText}>Підтвердити</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        backgroundColor: Colors.white,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.grey400,
        paddingLeft: 10,
        height: 48,
        marginHorizontal: 20,
    },
    icon: {
        marginRight: 10,
        height: 24,
        width: 24,
    },
    input: {
        flex: 1,
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.blackMain,
        height: 48,
        outlineWidth: 0,
    },
    itemContainer: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    itemTextContainer: {
        flex: 1,
        marginLeft: 20,
    },
    itemName: {
        fontFamily: 'ManropeBold',
        fontSize: 14,
        color: Colors.blackMain,
    },
    itemAddress: {
        marginTop: 2,
        fontFamily: 'Manrope',
        fontSize: 12,
        color: Colors.grey500,
    },
    notFoundText: {
        textAlign: 'center',
        fontFamily: 'Manrope',
        fontSize: 16,
        color: Colors.grey500,
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: "#8E6CEF",
        height: 52,
        marginRight: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
        marginBottom: 40,
        marginLeft: 20,
    },
    saveButtonText: {
        color: "white",
        fontSize: 16,
        fontFamily: "ManropeBold",
    },
});


