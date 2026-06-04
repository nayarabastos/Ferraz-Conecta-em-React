import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import SectionHeader from '../components/SectionHeader';
import {
  candidateApplicationPeriods,
  recentApplications,
  upcomingInterview,
} from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

const periods = Object.keys(candidateApplicationPeriods);

const tones = {
  blue: { main: colors.lightBlue, soft: '#EFF6FF', pill: '#DBEAFE' },
  green: { main: colors.green, soft: '#ECFDF5', pill: '#D1FAE5' },
  yellow: { main: '#B45309', soft: '#FFFBEB', pill: '#FEF3C7' },
  red: { main: colors.danger, soft: '#FEF2F2', pill: '#FEE2E2' },
};

export default function AdminPanelScreen({ setScreen, notify }) {
  const [period, setPeriod] = useState(periods[0]);
  const selectedData = candidateApplicationPeriods[period];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <View style={local.header}>
        <Image source={require('../../assets/prototype/avatar-user.jpg')} style={local.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.muted}>Olá, Ana Silva</Text>
          <Text style={styles.h2}>Minhas candidaturas</Text>
        </View>
        <TouchableOpacity
          accessibilityLabel="Abrir notificações"
          style={styles.iconButton}
          onPress={() => setScreen('notifications')}
        >
          <PrototypeIcon name="notifications" size={20} color={colors.blue} />
        </TouchableOpacity>
      </View>

      <Text style={styles.h1}>Meu desempenho</Text>
      <Text style={[styles.body, { marginTop: 7, marginBottom: 18 }]}>
        Acompanhe o andamento das vagas e prepare-se para as próximas etapas.
      </Text>

      <View style={local.periodControl}>
        {periods.map((item) => (
          <TouchableOpacity
            key={item}
            accessibilityRole="button"
            accessibilityLabel={`Ver dados dos últimos ${item}`}
            style={[local.periodButton, period === item && local.periodButtonActive]}
            onPress={() => {
              setPeriod(item);
              notify(`Estatísticas dos últimos ${item} exibidas.`);
            }}
          >
            <Text style={[local.periodText, period === item && local.periodTextActive]}>
              Últimos {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={local.statsGrid}>
        {selectedData.stats.map((stat) => (
          <StatCard
            key={stat.label}
            stat={stat}
            onPress={() => notify(`Detalhes: ${stat.label}.`)}
          />
        ))}
      </View>

      <View style={[styles.softCard, { marginTop: 18 }]}>
        <View style={styles.between}>
          <View>
            <Text style={styles.h2}>Funil de candidaturas</Text>
            <Text style={[styles.muted, { marginTop: 5 }]}>Conversão no período selecionado</Text>
          </View>
          <PrototypeIcon name="stats-chart-outline" size={21} color={colors.blue} />
        </View>
        <View style={{ marginTop: 20 }}>
          {selectedData.funnel.map((step) => (
            <View key={step.label} style={local.funnelRow}>
              <View style={styles.between}>
                <Text style={local.funnelLabel}>{step.label}</Text>
                <Text style={local.funnelValue}>{step.value}</Text>
              </View>
              <View style={local.track}>
                <View
                  style={[
                    local.fill,
                    { width: `${step.percentage}%`, backgroundColor: tones[step.tone].main },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <SectionHeader title="Próxima entrevista" />
      <View style={styles.card}>
        <View style={styles.between}>
          <StatusTag label={upcomingInterview.stage} tone="green" />
          <TouchableOpacity onPress={() => notify('Lembrete da entrevista ativado.')}>
            <PrototypeIcon name="notifications-outline" size={19} color={colors.muted} />
          </TouchableOpacity>
        </View>
        <Text style={local.interviewTitle}>{upcomingInterview.title}</Text>
        <Text style={[styles.muted, { marginTop: 5 }]}>{upcomingInterview.company}</Text>
        <View style={local.schedule}>
          <DetailLine icon="calendar" label={upcomingInterview.date} />
          <DetailLine icon="laptop-outline" label={upcomingInterview.mode} />
        </View>
        <View style={[styles.row, { gap: 10, marginTop: 17 }]}>
          <TouchableOpacity
            style={[styles.primaryButton, { minHeight: 46, flex: 1 }]}
            onPress={() => setScreen('jobDetails', { jobId: upcomingInterview.jobId, backTo: 'admin' })}
          >
            <Text style={[styles.primaryText, { fontSize: 14 }]}>Ver detalhes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.outlineButton, { minHeight: 46, flex: 1 }]}
            onPress={() => notify('Entrevista adicionada à sua agenda.')}
          >
            <Text style={[styles.linkText, { fontSize: 13 }]}>Agendar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionHeader title="Candidaturas recentes" action="Ver vagas" onPress={() => setScreen('jobs')} />
      {recentApplications.map((application) => (
        <TouchableOpacity
          key={application.title}
          style={local.application}
          activeOpacity={0.9}
          onPress={() => setScreen('jobDetails', { jobId: application.jobId, backTo: 'admin' })}
        >
          <View style={[styles.between, { alignItems: 'flex-start' }]}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={local.applicationTitle}>{application.title}</Text>
              <Text style={[styles.muted, { marginTop: 5 }]}>{application.company}</Text>
            </View>
            <StatusTag label={application.status} tone={application.tone} />
          </View>
          <View style={[styles.between, local.applicationFooter]}>
            <Text style={styles.muted}>{application.updated}</Text>
            <Text style={styles.linkText}>Ver detalhes</Text>
          </View>
        </TouchableOpacity>
      ))}

      <SectionHeader title="Ações rápidas" />
      <View style={[styles.row, { gap: 12 }]}>
        <TouchableOpacity style={local.quickAction} onPress={() => setScreen('jobs')}>
          <PrototypeIcon name="search" size={21} color={colors.lightBlue} />
          <Text style={local.quickLabel}>Buscar vagas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={local.quickAction} onPress={() => setScreen('profileAction', { mode: 'cv' })}>
          <PrototypeIcon name="document-attach" size={21} color={colors.green} />
          <Text style={local.quickLabel}>Atualizar CV</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function StatCard({ stat, onPress }) {
  const tone = tones[stat.tone];

  return (
    <TouchableOpacity style={local.statCard} activeOpacity={0.9} onPress={onPress}>
      <View style={[local.statIcon, { backgroundColor: tone.soft }]}>
        <PrototypeIcon name={stat.icon} size={18} color={tone.main} />
      </View>
      <Text style={local.statValue}>{stat.value}</Text>
      <Text style={local.statLabel}>{stat.label}</Text>
      <Text style={[local.statNote, { color: tone.main, backgroundColor: tone.soft }]}>
        {stat.note}
      </Text>
    </TouchableOpacity>
  );
}

function StatusTag({ label, tone }) {
  const style = tones[tone];

  return (
    <Text style={[local.statusTag, { color: style.main, backgroundColor: style.pill }]}>
      {label}
    </Text>
  );
}

function DetailLine({ icon, label }) {
  return (
    <View style={local.detailLine}>
      <PrototypeIcon name={icon} size={15} color={colors.muted} />
      <Text style={[styles.muted, { fontWeight: '700' }]}>{label}</Text>
    </View>
  );
}

const local = StyleSheet.create({
  header: {
    minHeight: 78,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 14,
    marginBottom: 22,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderBottomColor: '#F1F5F9',
    borderBottomWidth: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  periodControl: {
    flexDirection: 'row',
    backgroundColor: colors.gray,
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },
  periodButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.blue,
  },
  periodText: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontSize: 12,
    fontWeight: '500',
  },
  periodTextActive: {
    color: colors.white,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    minHeight: 174,
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 13,
  },
  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 25,
    fontWeight: '700',
    marginTop: 12,
  },
  statLabel: {
    minHeight: 34,
    color: colors.text,
    fontSize: 12,
    fontFamily: fonts.medium,
    fontWeight: '500',
    lineHeight: 16,
    marginTop: 3,
  },
  statNote: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
    fontSize: 10,
    fontFamily: fonts.medium,
    fontWeight: '500',
    marginTop: 8,
  },
  funnelRow: {
    marginBottom: 17,
  },
  funnelLabel: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 13,
  },
  funnelValue: {
    color: colors.blue,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 13,
  },
  track: {
    height: 8,
    width: '100%',
    borderRadius: 4,
    backgroundColor: colors.gray,
    overflow: 'hidden',
    marginTop: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
  interviewTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
    marginTop: 14,
  },
  schedule: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 15,
  },
  detailLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  statusTag: {
    maxWidth: 126,
    overflow: 'hidden',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 11,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    textAlign: 'center',
  },
  application: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
  },
  applicationTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 19,
  },
  applicationFooter: {
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 12,
  },
  quickAction: {
    flex: 1,
    minHeight: 72,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    flexDirection: 'row',
    gap: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 13,
    fontWeight: '600',
  },
});
