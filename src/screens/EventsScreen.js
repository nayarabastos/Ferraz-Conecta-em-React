import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import { EventCard } from '../components/Cards';
import Chips from '../components/Chips';
import PrototypeIcon from '../components/PrototypeIcon';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import ScreenGlow from '../components/ScreenGlow';
import { events } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

export default function EventsScreen({ setScreen, notify }) {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', '29', '30', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const [category, setCategory] = useState(0);
  const [selectedDay, setSelectedDay] = useState('15');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader title="Eventos da Cidade" setScreen={setScreen} backTo="home" />
      <SearchBar placeholder="Buscar eventos..." onFocus={() => setScreen('search')} />
      <Chips
        items={['Todos', 'Feiras', 'Cultura', 'Negócios']}
        activeIndex={category}
        onChange={(index) => {
          setCategory(index);
          notify('Categoria de evento selecionada.');
        }}
      />

      <View style={styles.softCard}>
        <View style={styles.between}>
          <Text style={[styles.h2, { fontSize: 14 }]}>Outubro 2026</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={() => notify('Exibindo setembro de 2026.')}>
              <PrototypeIcon name="chevron-back" size={21} color={colors.muted} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => notify('Exibindo novembro de 2026.')}>
              <PrototypeIcon name="chevron-forward" size={21} color={colors.muted} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={local.calendar}>
          {days.map((day, index) => {
            const active = day === selectedDay;
            const header = index < 7;
            return (
              <TouchableOpacity
                key={`${day}-${index}`}
                disabled={header}
                style={[local.day, active && local.dayActive]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[local.dayText, header && local.dayHeader, active && local.dayTextActive]}>
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <SectionHeader title={`Eventos em ${selectedDay} de Outubro`} />
      {events.map((event) => (
        <EventCard key={event.title} event={event} notify={notify} />
      ))}
    </ScrollView>
  );
}

const local = StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },
  day: {
    width: '14.285%',
    aspectRatio: 1,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayActive: {
    backgroundColor: colors.lightBlue,
  },
  dayText: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 12,
  },
  dayHeader: {
    color: colors.muted,
  },
  dayTextActive: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
});
