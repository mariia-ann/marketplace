import dropdown from "@/assets/images/profile/calendar/dropdown.png";
import pencil from "@/assets/images/profile/calendar/pencil.png";
import Colors from "@/constants/Colors";
import { CalendarBlank, CaretLeft, CaretRight } from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";

function formatDate(date: Date): string {
  return date.toLocaleDateString("uk-UA", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

function parseDateFromString(str: string): Date | null {
  const parts = str.split(".");
  if (parts.length === 3) {
    const [day, month, year] = parts.map(Number);
    const parsed = new Date(year, month - 1, day);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

export default function DataField() {
  const [date, setDate] = useState(new Date());
  const [textDate, setTextDate] = useState(date.toLocaleDateString("uk-UA"));
  const [modalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState(date);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const yearScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (showYearDropdown && yearScrollRef.current) {
      const selectedYearIndex = 2025 - tempDate.getFullYear();
      const scrollPosition = selectedYearIndex * 30;
      yearScrollRef.current.scrollTo({ y: scrollPosition, animated: true });
    }
  }, [showYearDropdown, tempDate]);

  function getDayMonthYear(date: Date): string {
    return date.toLocaleDateString("uk-UA", {
      weekday: "short",
      month: "long",
      day: "numeric",
    });
  }

  function handleConfirm() {
    setDate(tempDate);
    setTextDate(tempDate.toLocaleDateString("uk-UA"));
    setModalVisible(false);
    setShowYearDropdown(false);
    setEditModalVisible(false);
  }

  function handleCancel() {
    setTempDate(date);
    setModalVisible(false);
    setShowYearDropdown(false);
  }

  function renderCalendar() {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

    const current = new Date(tempDate);
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDay = firstDay.getDay();

    const weeks = [];

    weeks.push(
      <View key="header" style={styles.weekRow}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={styles.dayOfWeekText}>
            {day}
          </Text>
        ))}
      </View>,
    );

    let currentDay = 1 - startDay;

    for (let row = 0; row < 6; row++) {
      const days = [];
      for (let col = 0; col < 7; col++) {
        const thisDate = new Date(year, month, currentDay);
        const isCurrentMonth = thisDate.getMonth() === month;
        const isSelected = thisDate.toDateString() === tempDate.toDateString();
        const isToday = thisDate.toDateString() === new Date().toDateString();

        if (isCurrentMonth) {
          days.push(
            <TouchableOpacity
              key={col}
              style={[
                styles.dayCircle,
                isSelected && styles.selectedDay,
                isToday && styles.todayCircle,
              ]}
              onPress={() => setTempDate(thisDate)}
            >
              <Text
                style={[styles.dayText, isSelected && styles.selectedDayText]}
              >
                {thisDate.getDate()}
              </Text>
            </TouchableOpacity>,
          );
        } else {
          days.push(<View key={col} style={{ width: 48 }} />);
        }

        currentDay++;
      }

      weeks.push(
        <View key={row} style={styles.weekRow}>
          {days}
        </View>,
      );
    }

    return weeks;
  }

  return (
    <View>
      <Text style={styles.label}>Дата народження</Text>
      <View style={styles.dateInputContainer}>
        <TouchableOpacity
          onPress={() => setEditModalVisible(true)}
          activeOpacity={0.8}
        >
          <TextInputMask
            type={"datetime"}
            options={{ format: "DD.MM.YYYY" }}
            style={styles.input}
            value={textDate}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.dateIcon}
          onPress={() => setModalVisible(true)}
        >
          <CalendarBlank size={32} color="#170f2b" weight="thin" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={editModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEditModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainers}>
                <Text style={styles.label}>Дата народження</Text>
                <View style={styles.dateInputContainer}>
                  <TextInputMask
                    type={"datetime"}
                    options={{ format: "DD.MM.YYYY" }}
                    style={[
                      styles.inputModal,
                      isFocused && {
                        borderColor: Colors.softPurple,
                        borderWidth: 2,
                      },
                    ]}
                    value={textDate}
                    editable={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChangeText={(formatted) => {
                      setTextDate(formatted);
                      const parsed = parseDateFromString(formatted);
                      if (parsed) setDate(parsed);
                    }}
                    keyboardType="numeric"
                  />

                  <TouchableOpacity
                    style={styles.dateIcon}
                    onPress={() => setModalVisible(true)}
                  >
                    <CalendarBlank size={32} color="#170f2b" weight="thin" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>дд.мм.рік</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={handleCancel}
      >
        <TouchableWithoutFeedback onPress={() => setShowYearDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Обрати дату</Text>
              <View style={styles.modalHeaderRow}>
                <Text style={styles.modalDate}>
                  {getDayMonthYear(tempDate)}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(false);
                    setEditModalVisible(true);
                  }}
                >
                  <Image
                    source={pencil}
                    style={{ height: 36 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.divider} />
              <View style={styles.monthRow}>
                <View style={styles.monthDropdownWrapper}>
                  <TouchableOpacity
                    style={styles.monthDropdownButton}
                    onPress={() => setShowYearDropdown(!showYearDropdown)}
                  >
                    <Text style={styles.monthText}>
                      {tempDate.toLocaleDateString("uk-UA", {
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                    <View>
                      <Image
                        source={dropdown}
                        style={{ height: 5 }}
                        resizeMode="contain"
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.arrowRow}>
                  <Text
                    style={styles.arrow}
                    onPress={() =>
                      setTempDate(
                        new Date(
                          tempDate.getFullYear(),
                          tempDate.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                  >
                    <CaretLeft
                      size={18}
                      weight="bold"
                      color={Colors.blackMain}
                    />
                  </Text>
                  <Text
                    style={styles.arrow}
                    onPress={() =>
                      setTempDate(
                        new Date(
                          tempDate.getFullYear(),
                          tempDate.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                  >
                    <CaretRight
                      size={18}
                      weight="bold"
                      color={Colors.blackMain}
                    />
                  </Text>
                </View>
              </View>

              <View style={styles.calendarBody}>{renderCalendar()}</View>
              <View style={styles.buttonRow}>
                <Text style={styles.modalButton} onPress={handleCancel}>
                  Відміна
                </Text>
                <Text style={styles.modalButton} onPress={handleConfirm}>
                  OK
                </Text>
              </View>

              {showYearDropdown && (
                <View style={styles.yearDropdownContainer}>
                  <ScrollView
                    ref={yearScrollRef}
                    style={styles.yearDropdown}
                    contentContainerStyle={{ paddingVertical: 4 }}
                  >
                    {Array.from({ length: 101 }, (_, i) => 2025 - i).map(
                      (yr) => (
                        <TouchableOpacity
                          key={yr}
                          onPress={() => {
                            setTempDate(
                              new Date(
                                yr,
                                tempDate.getMonth(),
                                tempDate.getDate(),
                              ),
                            );
                            setShowYearDropdown(false);
                          }}
                        >
                          <Text
                            style={[
                              styles.yearOption,
                              yr === tempDate.getFullYear() &&
                                styles.selectedYear,
                            ]}
                          >
                            {yr}
                          </Text>
                        </TouchableOpacity>
                      ),
                    )}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: Colors.grey400,
    fontFamily: "Manrope",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey400,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "Manrope",
    color: Colors.blackMain,
  },
  dateInputContainer: {
    position: "relative",
  },
  dateIcon: {
    position: "absolute",
    right: 10,
    top: "17%",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#494459AA",
    justifyContent: "center",
    paddingHorizontal: 15,
    position: "relative",
  },
  modalContainer: {
    backgroundColor: "#fefcff",
    borderRadius: 28,
    padding: 16,
    position: "relative",
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: "ManropeBold",
    color: Colors.blackMain,
    marginBottom: 20,
    marginLeft: 20,
  },
  modalHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalDate: {
    fontSize: 32,
    fontFamily: "ManropeBold",
    color: Colors.blackMain,
    marginLeft: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#9a9997",
    marginBottom: 8,
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
    marginTop: 8,
  },
  monthText: {
    fontSize: 14,
    fontFamily: "ManropeBold",
    color: Colors.blackMain,
  },
  arrowRow: {
    flexDirection: "row",
    gap: 20,
  },
  arrow: {
    fontSize: 24,
    color: Colors.blackMain,
  },
  calendarBody: {
    position: "relative",
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  todayCircle: {
    borderWidth: 1,
    borderColor: Colors.softPurple,
  },
  selectedDay: {
    backgroundColor: Colors.softPurple,
  },
  dayText: {
    fontSize: 16,
    fontFamily: "Manrope",
    color: Colors.softPurple,
  },
  selectedDayText: {
    color: "#fefcff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 40,
    marginTop: 18,
    marginBottom: 8,
    marginRight: 12,
  },
  modalButton: {
    fontSize: 14,
    fontFamily: "Manrope-Bold",
    color: Colors.softPurple,
  },
  monthDropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  yearOption: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    fontFamily: "Manrope",
    color: Colors.blackMain,
    height: 30,
    textAlignVertical: "center",
  },
  selectedYear: {
    fontWeight: "bold",
    color: Colors.softPurple,
  },
  yearDropdownContainer: {
    position: "absolute",
    left: 0,
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 4,
    overflow: "hidden",
    maxHeight: 150,
    marginLeft: 20,
    marginTop: 165,
  },
  yearDropdown: {
    maxHeight: 150,
  },

  dayOfWeekText: {
    width: 48,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "ManropeBold",
    color: Colors.blackMain,
  },
  monthDropdownWrapper: {
    position: "relative",
  },
  inputModal: {
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "Manrope",
    color: Colors.blackMain,
    marginBottom: 8,
  },
  modalContainers: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    elevation: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  touchOutsideArea: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
