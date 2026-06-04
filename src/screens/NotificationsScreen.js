import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import Chips from '../components/Chips';
import PrototypeIcon from '../components/PrototypeIcon';
import SectionHeader from '../components/SectionHeader';
import ScreenGlow from '../components/ScreenGlow';
import { notifications } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

export default function NotificationsScreen({ setScreen, notify }) {
  const [activeTab, setActiveTab] = useState(0);
  const [allRead, setAllRead] = useState(false);
  const [preferences, setPreferences] = useState([true, true, true, false]);
  const tabFilters = ['Tudo', 'Nova Vaga', 'Candidatura', 'Recomendação'];
  const displayedNotifications = activeTab === 0
    ? notifications
    : notifications.filter((item) => item.type === tabFilters[activeTab]);

  const togglePreference = (index) => {
    const updated = [...preferences];
    updated[index] = !updated[index];
    setPreferences(updated);
    notify('Preferência de notificação atualizada.');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader
        title="Notificações"
        setScreen={setScreen}
        backTo="home"
        action="checkmark-done"
        onAction={() => {
          setAllRead(true);
          notify('Todas as notificações foram marcadas como lidas.');
        }}
      />
      <Chips
        items={['Tudo', 'Vagas', 'Candidaturas', 'Recomenda']}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      {displayedNotifications.map((item) => (
        <NotificationCard key={item.title} item={item} read={allRead} setScreen={setScreen} notify={notify} />
      ))}

      <TouchableOpacity style={{ alignItems: 'center', marginVertical: 12 }} onPress={() => notify('Não há novas notificações para carregar.')}>
        <Text style={styles.linkText}>Carregar mais notificações</Text>
      </TouchableOpacity>

      <SectionHeader title="Preferências de Notificação" />
      <View style={styles.softCard}>
        {['Novas Vagas', 'Status de Candidaturas', 'Mensagens de Empresas', 'Alertas Promocionais'].map((item, index) => (
          <View key={item} style={[styles.between, local.preference, index === 3 && { borderBottomWidth: 0 }]}>
            <View>
              <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 13 }}>{item}</Text>
              <Text style={styles.muted}>{index === 3 ? 'Novidades e eventos da plataforma' : 'Alertas no seu perfil'}</Text>
            </View>
            <TouchableOpacity
              style={[local.switch, !preferences[index] && local.switchOff]}
              onPress={() => togglePreference(index)}
            >
              <View style={local.knob} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function NotificationCard({ item, read, setScreen, notify }) {
  const active = item.tone !== 'gray' && !read;
  const toneColor = item.tone === 'green' ? colors.green : colors.lightBlue;

  return (
    <View style={[styles.card, active && { borderLeftWidth: 4, borderLeftColor: toneColor }]}>
      <View style={[styles.row, { alignItems: 'flex-start', gap: 14 }]}>
        <View style={[local.noticeIcon, { backgroundColor: active ? `${toneColor}20` : colors.gray }]}>
          <PrototypeIcon name={item.icon} size={22} color={active ? toneColor : colors.muted} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.between}>
            <Text style={[styles.tag, active && { color: toneColor }]}>{item.type}</Text>
            <Text style={styles.muted}>{item.time}</Text>
          </View>
          <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14, marginTop: 8 }}>
            {item.title}
          </Text>
          <Text style={[styles.body, { fontSize: 14, marginTop: 4 }]}>{item.text}</Text>
          {item.action && (
            <TouchableOpacity
              style={item.tone === 'green' ? [styles.primaryButton, { minHeight: 46, marginTop: 14, backgroundColor: colors.lightBlue }] : [styles.outlineButton, { minHeight: 46, marginTop: 14 }]}
              onPress={() => item.type === 'Nova Vaga' ? setScreen('jobDetails', { jobId: 'front-end-react', backTo: 'notifications' }) : notify('Detalhes da recomendação abertos.')}
            >
              <Text style={item.tone === 'green' ? styles.primaryText : styles.linkText}>{item.action}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  noticeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  preference: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  switch: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.lightBlue,
    padding: 3,
    alignItems: 'flex-end',
  },
  switchOff: {
    backgroundColor: '#D1D5DB',
    alignItems: 'flex-start',
  },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.white,
  },
  knobOff: {
    backgroundColor: colors.white,
  },
});
