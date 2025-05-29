// import { Link } from "expo-router";
// import { PencilSimple } from 'phosphor-react-native';
// import React, { ReactElement } from 'react';
// import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// interface AddressCardProps {
//     title: string;
//     address: string;
//     logo: ReactElement;
//     active: boolean;
//     onPress: () => void;
//     isSwitchEnabled: boolean;
//     onToggleSwitch: () => void;
// }

// export default function AddressCard({ title, address, logo, active, onPress, isSwitchEnabled, onToggleSwitch }: AddressCardProps) {
//     return (
//         <TouchableOpacity onPress={onPress} activeOpacity={0.9}
//             style={[styles.container, (active || isSwitchEnabled) && styles.activeBorder]}>

//             <View style={styles.header}>
//                 <View style={styles.logoTitle}>
//                     {logo}
//                     <Text style={styles.title}>{title}</Text>
//                 </View>
//                 {/* <CustomSwitch value={isSwitchEnabled} onToggle={onToggleSwitch} /> */}
//             </View>

//             <View style={styles.address}>
//                 <Text numberOfLines={3} style={styles.addressText}>{address}</Text>
//                 <Link href="/(tabs)/profile/addresses/ChangeAddress" asChild>
//                     <Pressable>
//                         <PencilSimple size={24} color="#170F2B" style={styles.pencilIcon} />
//                     </Pressable>
//                 </Link>
//             </View>

//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         height: 135,
//         borderRadius: 10,
//         backgroundColor: '#FFFFFF',
//         marginHorizontal: 20,
//         marginTop: 24,
//         marginBottom: 16,
//         paddingHorizontal: 10,
//         paddingTop: 14,
//         paddingBottom: 14,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 15,
//         elevation: 4,
//     },
//     activeBorder: {
//         borderWidth: 1,
//         borderColor: '#8E6CEF',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     logoTitle: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     title: {
//         fontWeight: 700,
//         fontSize: 16,
//         color: '#170F2B',
//         marginLeft: 18,
//     },
//     address: {
//         flexDirection: 'row',
//         marginTop: 16,
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//     },
//     addressText: {
//         fontFamily: 'Manrope',
//         fontSize: 16,
//         color: '#170F2B',
//         width: '75%',
//     },
//     pencilIcon: {
//         marginRight: 10,
//         marginTop: 14,
//     },
// });
