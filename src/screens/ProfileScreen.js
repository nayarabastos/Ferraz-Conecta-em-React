import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import SectionHeader from '../components/SectionHeader';
import { jobs, profile } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

export default function ProfileScreen({ setScreen, notify }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader title="Meu Perfil" setScreen={setScreen} action="settings" onAction={() => setScreen('settings')} />

      <View style={[styles.softCard, { alignItems: 'center' }]}>
        <View style={local.avatar}>
          <Image source={require('../../assets/prototype/avatar-user.jpg')} style={local.avatarImage} />
          <View style={local.camera}>
            <PrototypeIcon name="camera" size={17} color={colors.white} />
          </View>
        </View>
        <Text style={[styles.h2, { color: colors.text, marginTop: 14 }]}>{profile.name}</Text>
        <Text style={[styles.muted, { fontSize: 13, marginTop: 6 }]}>{profile.role}</Text>
        <Text style={[styles.body, { textAlign: 'center', marginTop: 18 }]}>{profile.bio}</Text>
        <View style={[styles.row, { gap: 12, marginTop: 22 }]}>
          <TouchableOpacity style={[styles.outlineButton, { minHeight: 48, flex: 1 }]} onPress={() => setScreen('profileAction', { mode: 'edit' })}>
            <PrototypeIcon name="create" size={17} color={colors.lightBlue} />
            <Text style={styles.linkText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.primaryButton, { minHeight: 48, flex: 1 }]} onPress={() => setScreen('profileAction', { mode: 'cv' })} >
            <PrototypeIcon name="document-attach" size={17} color={colors.white} />
            <Text style={styles.primaryText}>Atualizar CV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SectionHeader title="Habilidades" action="+ Adicionar" onPress={() => setScreen('profileAction', { mode: 'tag' })} />
      <View style={styles.tagsWrap}>
        {profile.skills.map((item) => (
          <TouchableOpacity key={item} onPress={() => notify(`${item} selecionada.`)}>
            <Text style={styles.tag}>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setScreen('profileAction', { mode: 'tag' })}>
          <Text style={[styles.tag, { color: colors.lightBlue, backgroundColor: colors.white, borderWidth: 1, borderColor: '#BFDBFE' }]}>
            + Adicionar Tag
          </Text>
        </TouchableOpacity>
      </View>

      <SectionHeader title="Currículo" />
      <TouchableOpacity style={[styles.card, styles.row, { gap: 14 }]} onPress={() => setScreen('profileAction', { mode: 'cv' })}>
        <View style={[styles.squareIcon, { width: 48, height: 48 }]}>
          <PrototypeIcon name="file-pdf" size={27} color={colors.danger} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 13 }}>Ana_Silva_CV_2023.pdf</Text>
          <Text style={styles.muted}>Atualizado em 15/10/2023 - 2.4 MB</Text>
        </View>
        <PrototypeIcon name="eye" size={20} color={colors.blue} />
      </TouchableOpacity>

      <SectionHeader title="Experiências" action="+ Adicionar" onPress={() => setScreen('profileAction', { mode: 'experience' })} />
      <View style={local.timeline}>
        <Timeline title="Desenvolvedora Front-end Pleno" meta="Tech Solutions S/A - São Paulo, SP" active />
        <Timeline title="Desenvolvedora Front-end Junior" meta="Agência Digital XYZ - Ferraz de Vasconcelos, SP" />
      </View>

      <SectionHeader title="Minhas Candidaturas" />
      {jobs.slice(1).map((job, index) => (
        <View key={job.title} style={styles.card}>
          <View style={styles.between}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14 }}>{job.title}</Text>
              <Text style={[styles.muted, { marginTop: 4 }]}>{job.company}</Text>
            </View>
            <Text style={index === 0 ? styles.tag : styles.greenTag}>{index === 0 ? 'Em análise' : 'Aprovado'}</Text>
          </View>
          <View style={[styles.between, { marginTop: 16, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 14 }]}>
            <Text style={styles.muted}>Aplicado há {index === 0 ? '2 dias' : '2 semanas'}</Text>
            <TouchableOpacity onPress={() => setScreen('jobDetails', { jobId: job.id, backTo: 'profile' })}>
              <Text style={styles.linkText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function Timeline({ title, meta, active }) {
  return (
    <View style={local.timelineRow}>
      <View style={[local.dot, active && { backgroundColor: colors.lightBlue }]} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14 }}>{title}</Text>
        <Text style={[styles.muted, { marginTop: 5 }]}>{meta}</Text>
        <Text style={[styles.body, { fontSize: 14, marginTop: 8 }]}>
          Desenvolvimento de interfaces escaláveis, manutenção de design systems e integração com APIs RESTful.
        </Text>
      </View>
    </View>
  );
}

const local = StyleSheet.create({
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 47,
  },
  camera: {
    position: 'absolute',
    right: -2,
    bottom: 4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.lightBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  timeline: {
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    marginLeft: 14,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 22,
    marginLeft: -7,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#9CA3AF',
    marginTop: 4,
  },
});
