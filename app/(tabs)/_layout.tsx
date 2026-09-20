import { RequireAuth } from '@/src/features/auth/guards';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';

import {
  Handbag,
  Heart,
  House,
  MagnifyingGlass,
  User,
} from 'phosphor-react-native';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useBasketStore } from '@/src/state/useBasketStore';
import Colors from '@/constants/Colors';

function renderLabel(title: string, focused: boolean) {
  return (
    <Text
      style={{
        fontSize: 11,
        fontFamily: focused ? 'ManropeBold' : 'Manrope',
        color: focused ? '#8E6CEF' : '#170F2B',
        marginTop: 2,
      }}
    >
      {title}
    </Text>
  );
}

function BasketTabIcon({ focused }: { focused: boolean }) {
  const itemsCount = useBasketStore((state) => state.items.length);

  return (
    <View
      style={
        {
          position: 'absolute',
          top: -40,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 32,
          width: 62,
          height: 62,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          shadowColor: '#48238F',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 10,
          elevation: 6,
          boxShadow: '0px 4px 12px 0px rgba(72, 35, 143, 0.18)',
        } as any
      }
    >
      <Handbag
        size={28}
        color={focused ? '#8E6CEF' : '#170F2B'}
        weight={focused ? 'regular' : 'thin'}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
      {itemsCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: '#6831D0',
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            paddingHorizontal: 4,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: '#FFFFFF',
          }}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 11,
              fontFamily: 'ManropeBold',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {itemsCount > 9 ? '9+' : itemsCount}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <RequireAuth to='/auth/login'>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#AC94E8',
          headerShown: false,
          headerShadowVisible: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'Manrope',
          },
          tabBarStyle: {
            borderTopWidth: 0,
            shadowColor: '#00000040',
            shadowOpacity: 0.6,
            shadowRadius: 15,
            elevation: 10,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Головна',
            tabBarLabel: ({ focused }) => renderLabel('Головна', focused),
            tabBarIcon: ({ focused }) => (
              <House
                color={focused ? '#8E6CEF' : '#170F2B'}
                size={32}
                weight={focused ? 'regular' : 'thin'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='search'
          options={{
            title: 'Пошук',
            tabBarLabel: ({ focused }) => renderLabel('Пошук', focused),
            tabBarIcon: ({ focused }) => (
              <MagnifyingGlass
                color={focused ? '#8E6CEF' : '#170F2B'}
                size={32}
                weight={focused ? 'regular' : 'thin'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='basket'
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  position: 'absolute',
                  top: -30,
                  backgroundColor: '#fff',
                  borderRadius: 35,
                  width: 60,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.25,
                  shadowRadius: 4.65,
                  elevation: 4,
                }}
              >
                <Handbag
                  size={32}
                  color={focused ? '#8E6CEF' : '#170F2B'}
                  weight={focused ? 'regular' : 'thin'}
                />
              </View>
            ),
          }}
        />
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: '#8E6CEF',
            tabBarInactiveTintColor: '#170F2B',
            headerShown: false,
            headerShadowVisible: false,
            tabBarLabelStyle: {
              fontSize: 11,
              fontFamily: 'Manrope',
            },
            tabBarBackground: () => (
              <BlurView
                tint='light'
                intensity={Platform.OS === 'android' ? 60 : 80}
                experimentalBlurMethod='dimezisBlurView'
                style={[
                  StyleSheet.absoluteFill,
                  {
                    overflow: 'hidden',
                    backgroundColor:
                      Platform.OS === 'web'
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(255, 255, 255, 0)',
                    borderWidth: 1,
                    borderColor: 'rgba(255, 255, 255, 0)',
                  },
                  Platform.OS === 'web'
                    ? ({
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                      } as any)
                    : {},
                ]}
              />
            ),
            tabBarStyle: {
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 24 : 50,
              height: 72,
              borderTopWidth: 0,
              backgroundColor: 'transparent',
              elevation: 8,
              shadowColor: '#48238F',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.14,
              shadowRadius: 16,
              boxShadow:
                '0px 1px 2px 0px rgba(255, 255, 255, 0.4) inset, 0px 4px 20px 0px rgba(72, 35, 143, 0.14)',
              paddingBottom: Platform.OS === 'ios' ? 8 : 10,
              paddingTop: 10,
            } as any,
          }}
        >
          <Tabs.Screen
            name='index'
            options={{
              title: 'Головна',
              tabBarLabel: ({ focused }) => renderLabel('Головна', focused),
              tabBarIcon: ({ focused }) => (
                <House
                  color={focused ? '#8E6CEF' : '#170F2B'}
                  size={28}
                  weight={focused ? 'regular' : 'thin'}
                />
              ),
            }}
          />
          <Tabs.Screen
            name='search'
            options={{
              title: 'Каталог',
              tabBarLabel: ({ focused }) => renderLabel('Каталог', focused),
              tabBarIcon: ({ focused }) => (
                <MagnifyingGlass
                  color={focused ? '#8E6CEF' : '#170F2B'}
                  size={28}
                  weight={focused ? 'regular' : 'thin'}
                />
              ),
            }}
          />
          <Tabs.Screen
            name='basket'
            options={{
              tabBarLabel: () => null,
              tabBarIcon: ({ focused }) => <BasketTabIcon focused={focused} />,
            }}
          />

          <Tabs.Screen
            name='favorite'
            options={{
              title: 'Обрані',
              tabBarLabel: ({ focused }) => renderLabel('Обрані', focused),
              tabBarIcon: ({ focused }) => (
                <Heart
                  color={focused ? '#8E6CEF' : '#170F2B'}
                  size={32}
                  weight={focused ? 'regular' : 'thin'}
                />
              ),
            }}
          />
          <Tabs.Screen
            name='profile'
            options={{
              title: 'Профіль',
              tabBarLabel: ({ focused }) => renderLabel('Профіль', focused),
              tabBarIcon: ({ focused }) => (
                <User
                  color={focused ? '#8E6CEF' : '#170F2B'}
                  size={32}
                  weight={focused ? 'regular' : 'thin'}
                />
              ),
            }}
          />
          <Tabs.Screen
            name='category'
            options={{
              href: null,
            }}
          />
        </Tabs>
      </Tabs>
    </RequireAuth>
  );
}
