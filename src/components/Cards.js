import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import PrototypeIcon from './PrototypeIcon';
import { colors, fonts, styles } from '../constants/theme';

export function JobCard({ job, setScreen, notify, compact = false, matchLabel, backTo = 'jobs' }) {
  const [saved, setSaved] = useState(job.saved);
  const openDetails = () => setScreen('jobDetails', { jobId: job.id, backTo });

  const toggleSaved = () => {
    setSaved(!saved);
    if (notify) notify(saved ? 'Vaga removida dos itens salvos.' : 'Vaga salva com sucesso.');
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.92} onPress={openDetails}>
      <View style={[styles.row, { alignItems: 'flex-start', gap: 14 }]}>
        <View style={styles.squareIcon}>
          {job.logoSource ? (
            <Image source={job.logoSource} style={local.companyLogo} resizeMode="contain" />
          ) : (
            <PrototypeIcon name={job.icon} size={28} color={job.color} />
          )}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 16, lineHeight: 20 }}>
            {job.title}
          </Text>
          <Text style={[styles.muted, { marginTop: 4 }]}>{job.company}</Text>
        </View>
        <TouchableOpacity onPress={toggleSaved} hitSlop={10}>
          <PrototypeIcon
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={saved ? colors.lightBlue : colors.muted}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.tagsWrap, { marginTop: 14 }]}>
        {matchLabel && <Text style={styles.greenTag}>{matchLabel}</Text>}
        <MetaPill icon="location" label={job.location} />
        <MetaPill icon="business-outline" label={job.mode} />
        <MetaPill icon="cash" label={job.salary} tone="green" />
      </View>

      {!compact && (
        <View style={[styles.between, { borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 15, marginTop: 15 }]}>
          <Text style={styles.muted}>{job.time}</Text>
          <TouchableOpacity
            style={{ borderRadius: 10, backgroundColor: '#EFF6FF', paddingHorizontal: 16, paddingVertical: 10 }}
            onPress={openDetails}
          >
            <Text style={styles.linkText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function CourseCard({ course, featured = false, notify }) {
  const [saved, setSaved] = useState(false);

  const openCourse = () => {
    if (notify) notify(`Curso aberto: ${course.title}`);
  };

  if (featured) {
    return (
      <TouchableOpacity
        style={[styles.card, { width: 230, marginRight: 14, padding: 0, overflow: 'hidden' }]}
        onPress={openCourse}
        activeOpacity={0.9}
      >
        <View style={local.featureMedia}>
          {course.imageSource ? (
            <Image source={course.imageSource} style={local.featureImage} resizeMode="cover" />
          ) : (
            <LinearGradient
              colors={[course.color, course.color === '#9333EA' ? '#EC4899' : '#7DD3FC']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={local.featureImage}
            >
              <PrototypeIcon name={course.image} size={48} color={colors.white} />
            </LinearGradient>
          )}
          <Text style={[styles.blueTag, local.featureTag, { backgroundColor: colors.white }]}>
            {course.level}
          </Text>
        </View>
        <View style={{ padding: 14 }}>
          <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14 }}>{course.title}</Text>
          <Text style={styles.muted}>{course.school}</Text>
          <View style={[styles.between, { marginTop: 14 }]}>
            <View style={local.metaLine}>
              <PrototypeIcon name="time-outline" size={14} color={colors.muted} />
              <Text style={styles.muted}>{course.hours}</Text>
            </View>
            <Text style={styles.linkText}>Acessar -&gt;</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={[styles.card, styles.row, { gap: 14 }]} onPress={openCourse} activeOpacity={0.9}>
      <View style={styles.squareIcon}>
        <PrototypeIcon name={course.image} size={30} color={course.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14 }}>{course.title}</Text>
        <Text style={[styles.muted, { marginTop: 5 }]}>{course.school}</Text>
        <View style={[styles.tagsWrap, { marginTop: 10 }]}>
          <MetaPill icon="time-outline" label={course.hours} />
          <Text style={styles.blueTag}>{course.level}</Text>
        </View>
      </View>
      <TouchableOpacity
        hitSlop={10}
        onPress={() => {
          setSaved(!saved);
          if (notify) notify(saved ? 'Curso removido dos salvos.' : 'Curso salvo para acessar depois.');
        }}
      >
        <PrototypeIcon name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={saved ? colors.lightBlue : colors.muted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export function EventCard({ event, notify }) {
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.between}>
        <Text style={styles.tag}>{event.category}</Text>
        <TouchableOpacity
          onPress={() => {
            setSaved(!saved);
            if (notify) notify(saved ? 'Evento removido dos salvos.' : 'Evento salvo na sua agenda.');
          }}
        >
          <PrototypeIcon name={saved ? 'bookmark' : 'bookmark-outline'} size={22} color={saved ? colors.lightBlue : colors.muted} />
        </TouchableOpacity>
      </View>
      <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14, marginTop: 12 }}>
        {event.title}
      </Text>
      <MetaLine icon="time-outline" label={event.time} />
      <MetaLine icon="location" label={event.place} />
      <MetaLine icon="people-outline" label={`Org: ${event.organizer}`} />
      <TouchableOpacity
        style={[styles.greenButton, { marginTop: 16, minHeight: 48 }]}
        onPress={() => notify && notify('Participação confirmada no evento.')}
      >
        <Text style={styles.primaryText}>Ver detalhes / Participar</Text>
      </TouchableOpacity>
    </View>
  );
}

function MetaPill({ icon, label, tone }) {
  const active = tone === 'green';

  return (
    <View style={[local.metaPill, active && local.metaPillGreen]}>
      <PrototypeIcon name={icon} size={13} color={active ? colors.green : colors.muted} />
      <Text style={[local.metaPillText, active && { color: colors.green }]}>{label}</Text>
    </View>
  );
}

function MetaLine({ icon, label }) {
  return (
    <View style={[local.metaLine, { marginTop: 8 }]}>
      <PrototypeIcon name={icon} size={16} color={colors.muted} />
      <Text style={styles.muted}>{label}</Text>
    </View>
  );
}

const local = StyleSheet.create({
  companyLogo: {
    width: 38,
    height: 38,
  },
  featureMedia: {
    height: 130,
    position: 'relative',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    padding: 14,
  },
  featureTag: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  metaPill: {
    borderRadius: 8,
    backgroundColor: colors.gray,
    paddingHorizontal: 9,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaPillGreen: {
    backgroundColor: '#D1FAE5',
  },
  metaPillText: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 11,
  },
  metaLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
});
