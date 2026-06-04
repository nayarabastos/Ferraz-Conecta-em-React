import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import { jobs } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

export default function JobDetailsScreen({ setScreen, notify, jobId, backTo = 'jobs' }) {
  const job = jobs.find((item) => item.id === jobId) || jobs[0];
  const [saved, setSaved] = useState(!!job.saved);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    setSaved(!!job.saved);
    setApplied(false);
  }, [job.id, job.saved]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader
        title="Detalhes da Vaga"
        setScreen={setScreen}
        backTo={backTo}
        action="share-social"
        onAction={() => notify('Link da vaga pronto para compartilhar.')}
      />

      <View style={[styles.softCard, { alignItems: 'center', paddingTop: 26 }]}>
        <TouchableOpacity
          style={{ position: 'absolute', right: 18, top: 18 }}
          onPress={() => {
            setSaved(!saved);
            notify(saved ? 'Vaga removida dos salvos.' : 'Vaga salva.');
          }}
        >
          <PrototypeIcon name={saved ? 'bookmark' : 'bookmark-outline'} size={26} color={saved ? colors.lightBlue : colors.muted} />
        </TouchableOpacity>
        <View style={styles.squareIcon}>
          <PrototypeIcon name={job.icon} size={34} color={job.color} />
        </View>
        <Text style={[styles.h2, { color: colors.text, fontSize: 20, textAlign: 'center', marginTop: 18 }]}>
          {job.title}
        </Text>
        <Text style={[styles.muted, { fontSize: 13, marginTop: 6 }]}>{job.company}</Text>

        <View style={local.infoGrid}>
          <InfoBox icon="location" label="LOCAL" value={job.location} />
          <InfoBox icon="laptop-outline" label="MODO" value={job.mode} />
          <InfoBox icon="cash" label="SALÁRIO" value={job.salary} salary />
        </View>
      </View>

      <Text style={[styles.h2, { marginBottom: 12 }]}>Sobre a Vaga</Text>
      <Text style={styles.body}>
        {job.description}
      </Text>
      <Text style={[styles.body, { marginTop: 14 }]}>
        {job.aboutCompany}
      </Text>

      <Text style={[styles.h2, { marginTop: 28, marginBottom: 12 }]}>Requisitos</Text>
      {job.requirements.map((item) => (
        <Text key={item} style={[styles.body, { marginBottom: 9 }]}>✓ {item}</Text>
      ))}

      <Text style={[styles.h2, { marginTop: 20, marginBottom: 12 }]}>Habilidades Desejadas</Text>
      <View style={styles.tagsWrap}>
        {job.skills.map((item) => (
          <Text key={item} style={styles.tag}>{item}</Text>
        ))}
      </View>

      <Text style={[styles.h2, { marginTop: 28, marginBottom: 12 }]}>Benefícios</Text>
      <View style={local.benefits}>
        {job.benefits.map(([icon, item]) => (
          <View key={item} style={local.benefit}>
            <PrototypeIcon name={icon} size={18} color={colors.green} />
            <Text style={{ color: colors.muted, fontFamily: fonts.regular, fontSize: 13, flex: 1 }}>{item}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { marginTop: 18, backgroundColor: applied ? colors.green : colors.blue }]}
        onPress={() => {
          setApplied(true);
          notify(applied ? 'Sua candidatura já foi enviada.' : 'Candidatura enviada com sucesso!');
        }}
      >
        <Text style={styles.primaryText}>{applied ? 'Candidatura enviada' : 'Candidatar-se à Vaga'}</Text>
        <PrototypeIcon name={applied ? 'checkmark' : 'paper-plane'} size={18} color={colors.white} />
      </TouchableOpacity>
    </ScrollView>
  );
}

function InfoBox({ icon, label, value, salary }) {
  return (
    <View style={[local.infoBox, salary && { width: '100%', backgroundColor: '#F0FDF7' }]}>
      <View style={styles.row}>
        <PrototypeIcon name={icon} size={13} color={salary ? colors.green : colors.muted} />
        <Text style={[local.infoLabel, salary && { color: colors.green }]}>{label}</Text>
      </View>
      <Text style={[local.infoValue, salary && { fontSize: 18 }]}>{value}</Text>
    </View>
  );
}

const local = StyleSheet.create({
  infoGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 24,
  },
  infoBox: {
    width: '48%',
    borderRadius: 12,
    backgroundColor: colors.gray2,
    padding: 14,
  },
  infoLabel: {
    color: colors.muted,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 10,
    marginLeft: 5,
  },
  infoValue: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 13,
    marginTop: 8,
  },
  benefits: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  benefit: {
    width: '48%',
    minHeight: 66,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.white,
  },
});
