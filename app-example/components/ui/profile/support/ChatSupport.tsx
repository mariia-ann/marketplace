import Colors from '@/constants/Colors';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

interface Message {
  id: string;
  text: string;
  time: string;
  isUser: boolean;
}

export default function ChatSupport() {
  const [currentDate, setCurrentDate] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [supportMessageTime, setSupportMessageTime] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [showSupportMessage, setShowSupportMessage] = useState(false);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [hasSelectedOrder, setHasSelectedOrder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dayjs.locale('uk');
    setCurrentDate(dayjs().format('DD MMMM YYYY р.'));
    setOpenTime(dayjs().format('HH:mm'));
  }, []);


  const addOrderMessage = (orderNumber: number) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: `№ ${orderNumber}`,
      time: dayjs().format('HH:mm'),
      isUser: true,
    };
    setMessages(prev => [...prev, newMessage]);
    setHasSelectedOrder(true);

    setTimeout(() => {
      setSupportMessageTime(dayjs().format('HH:mm'));
      setShowSupportMessage(true);

      setTimeout(() => {
        setShowAdditionalButtons(true);
      }, 1000);
    }, 2000);
  };

  React.useEffect(() => {
    (global as any).addOrderMessage = addOrderMessage;
    return () => {
      delete (global as any).addOrderMessage;
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={{ paddingBottom: 138 }}>
        <Text style={styles.date}>{currentDate}</Text>

        <View style={{ marginTop: 16, marginLeft: 20 }}>
          <Text style={styles.support}>Customer Support</Text>
        </View>

        <View style={styles.chatBubble}>
          <Text style={styles.chatText}>
            Вітаємо!{'\n'}
            {'\n'}
            - Якщо хочете задати питання щодо конкретного замовлення - натисніть кнопку “Питання щодо товару або посилки”{'\n'}
            {'\n'}
            - Якщо ви не бачите у профілі свої замовлення - натисніть кнопку “Замовлення не відображаються у профілі”{'\n'}
            {'\n'}
            - Якщо маєте інші питання - натисніть кнопку “Інші питання”
          </Text>
          <Text style={styles.time}>{openTime}</Text>
        </View>


        {messages.map((message) => (
          <View key={message.id} style={[styles.chatBubble, styles.userMessage]}>
            <Text style={[styles.chatText, styles.userMessageText]}>{message.text}</Text>
            <Text style={[styles.time, styles.time]}>{message.time}</Text>
          </View>
        ))}


        {showSupportMessage && (
          <>
            <View style={{ marginTop: 16, marginLeft: 20 }}>
              <Text style={styles.support}>Customer Support</Text>
            </View>
            <View style={[styles.chatBubble, { marginTop: 8 }]}>
              <Text style={styles.chatText}>
                Оберіть, будь ласка, тему звернення:
              </Text>
              <Text style={styles.time}>{supportMessageTime}</Text>
            </View>
          </>
        )}



        {!hasSelectedOrder && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={[styles.button, { height: 56 }]}>
              <Text style={styles.buttonText}>Замовлення не відображаються у профілі</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { height: 56, marginTop: 12 }]}>
              <Text style={styles.buttonText}
                onPress={() => router.push("/(tabs)/profile/support/chat/selectOrder")}>
                Питання щодо товару або посилки</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { height: 38, marginTop: 12 }]}>
              <Text style={styles.buttonText}>Інші питання</Text>
            </TouchableOpacity>
          </View>
        )}


        {showAdditionalButtons && (
          <View style={[styles.buttonWrapper, { marginTop: 24 }]}>
            <TouchableOpacity style={[styles.button, { height: 56 }]}>
              <Text style={styles.buttonText}>Питання щодо доставки або відправки</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { height: 56, marginTop: 12 }]}>
              <Text style={styles.buttonText}>Питання щодо якості та комплектації товару</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { height: 56, marginTop: 12 }]}>
              <Text style={styles.buttonText}>Зміна адреси доставки замовлення до відправки</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { height: 38, marginTop: 12 }]}>
              <Text style={styles.buttonText}>Інше питання</Text>
            </TouchableOpacity>
          </View>
        )}

        {showAdditionalButtons && <View style={{ height: 16 }} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  date: {
    fontSize: 16,
    fontFamily: 'Manrope',
    color: Colors.grey500,
    textAlign: 'center',
    marginTop: 16,
  },
  support: {
    fontSize: 14,
    fontFamily: 'Manrope',
    color: Colors.grey500,
  },
  chatBubble: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
    marginTop: 8,
    marginLeft: 20,
    maxWidth: screenWidth * 0.7,
    minWidth: 120,
    width: 'auto',
  },
  chatText: {
    fontSize: 16,
    fontFamily: 'Manrope',
    color: Colors.blackMain,
  },
  time: {
    fontSize: 14,
    fontFamily: 'Manrope',
    color: Colors.grey500,
    textAlign: 'right',
    marginTop: 8,
  },
  buttonWrapper: {
    marginTop: 28,
    paddingHorizontal: 20,
  },
  button: {
    borderColor: Colors.softPurple,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'ManropeBold',
    color: Colors.softPurple,
    textAlign: 'center',
  },
  userMessage: {
    backgroundColor: Colors.purple200,
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 20,
    maxWidth: screenWidth * 0.7,
    minWidth: 120,
    width: 'auto',
  },
  userMessageText: {
    color: Colors.blackMain,
    fontFamily: 'ManropeBold',
    fontSize: 16,
  },
});