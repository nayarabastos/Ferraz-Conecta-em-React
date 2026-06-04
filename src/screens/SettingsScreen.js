import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import SectionHeader from '../components/SectionHeader';
import { colors, fonts, styles } from '../constants/theme';

export default function SettingsScreen({ setScreen, notify }) {
  const [jobAlerts, setJobAlerts] = useState(true);

  const options = [
    {
      title: 'Dados da conta',
      subtitle: 'Nome, cidade, contato e objetivo profissional',
      icon: 'person-outline',
      onPress: () => setScreen('profileAction', { mode: 'edit' }),
    },
    {
      title: 'Privacidade e segurança',
      subtitle: 'Senha, permissões e proteção dos seus dados',
      icon: 'shield',
      onPress: () => notify('Preferências de privacidade abertas.'),
    },
    {
      title: 'Notificações',
      subtitle: 'Vagas, entrevistas, cursos e mensagens',
      icon: 'notifications-outline',
      onPress: () => setScreen('notifications'),
    },
    {
      title: 'Ajuda e suporte',
      subtitle: 'Central de ajuda e atendimento da plataforma',
      icon: 'headset',
      onPress: () => notify('Suporte aberto.'),
    },
  ];

  const logout = () => {
    notify('Sessão encerrada.');
    setScreen('login');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader title="Configurações" setScreen={setScreen} backTo="profile" />

      <View style={local.summary}>
        <View style={local.summaryIcon}>
          <PrototypeIcon name="settings" size={21} color={colors.blue} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={local.summaryTitle}>Preferências do aplicativo</Text>
          <Text style={styles.muted}>Ajuste sua conta e os alertas do Ferraz Conecta.</Text>
        </View>
      </View>

      <SectionHeader title="Conta" />
      {options.map((item) => (
        <TouchableOpacity
          key={item.title}
          style={local.option}
          activeOpacity={0.9}
          onPress={item.onPress}
        >
          <View style={local.optionIcon}>
            <PrototypeIcon name={item.icon} size={18} color={colors.blue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={local.optionTitle}>{item.title}</Text>
            <Text style={styles.muted}>{item.subtitle}</Text>
          </View>
          <PrototypeIcon name="chevron-forward" size={16} color={colors.muted} />
        </TouchableOpacity>
      ))}

      <SectionHeader title="Preferências" />
      <View style={styles.softCard}>
        <Preference
          title="Alertas de vagas"
          subtitle="Receber oportunidades compatíveis com seu perfil"
          value={jobAlerts}
          onPress={() => {
            setJobAlerts(!jobAlerts);
            notify('Preferência de vagas atualizada.');
          }}
          last
        />
      </View>

      <TouchableOpacity style={local.logout} activeOpacity={0.9} onPress={logout}>
        <PrototypeIcon name="logout" size={18} color={colors.danger} />
        <Text style={local.logoutText}>Deslogar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Preference({ title, subtitle, value, onPress, last }) {
  return (
    <View style={[local.preference, last && { borderBottomWidth: 0, paddingBottom: 0 }]}>
      <View style={{ flex: 1, marginRight: 12 }}>
        <Text style={local.optionTitle}>{title}</Text>
        <Text style={styles.muted}>{subtitle}</Text>
      </View>
      <TouchableOpacity
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        style={[local.switch, !value && local.switchOff]}
        onPress={onPress}
      >
        <View style={local.knob} />
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  summary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    borderRadius: 14,
    padding: 15,
    marginBottom: 18,
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 5,
  },
  option: {
    minHeight: 74,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.gray2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionTitle: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 4,
  },
  preference: {
    minHeight: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
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
  logout: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  logoutText: {
    color: colors.danger,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 14,
  },
});
