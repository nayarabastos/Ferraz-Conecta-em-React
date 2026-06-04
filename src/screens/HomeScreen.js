import React, { useRef, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppHeader from '../components/AppHeader';
import CarouselControls from '../components/CarouselControls';
import { CourseCard, JobCard } from '../components/Cards';
import PrototypeIcon from '../components/PrototypeIcon';
import SectionHeader from '../components/SectionHeader';
import SearchBar from '../components/SearchBar';
import { homeCourses, homeJobs, news } from '../data/mockData';
import { colors, fonts, shadow, styles } from '../constants/theme';

export default function HomeScreen({ setScreen, notify, openMenu }) {
  const coursesRef = useRef(null);
  const [courseSlide, setCourseSlide] = useState(0);

  const goToCourseSlide = (nextIndex) => {
    const boundedIndex = (nextIndex + homeCourses.length) % homeCourses.length;
    setCourseSlide(boundedIndex);
    coursesRef.current?.scrollTo({ x: boundedIndex * 244, animated: true });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <AppHeader showLogo setScreen={setScreen} action="menu" onAction={openMenu} flushBottom />

        <LinearGradient
          colors={['#DBEAFE', '#ECFDF5', '#FFFFFF']}
          locations={[0, 0.52, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={local.hero}
        >
          <Text style={local.eyebrow}>A plataforma da sua cidade</Text>
          <Text style={local.heroTitle}>
            Conectando pessoas às <Text style={{ color: colors.lightBlue }}>oportunidades</Text>
          </Text>
          <Text style={[styles.body, { marginVertical: 22 }]}>
            Encontre vagas locais, capacite-se com cursos gratuitos e participe dos melhores eventos em Ferraz.
          </Text>
          <View style={[styles.row, { gap: 8 }]}>
            <SearchBar
              placeholder="Buscar vagas, cursos..."
              onFocus={() => setScreen('search')}
              containerStyle={{ flex: 1, marginBottom: 0 }}
            />
            <TouchableOpacity style={local.searchButton} onPress={() => setScreen('search')}>
              <Text style={local.searchButtonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.row, { gap: 12, marginTop: 18 }]}>
            <TouchableOpacity style={[styles.greenButton, { flex: 1 }]} onPress={() => setScreen('jobs')}>
              <Text style={styles.primaryText}>Explorar</Text>
              <PrototypeIcon name="arrow-forward" size={18} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.outlineButton, { flex: 1 }]} onPress={() => setScreen('register')}>
              <PrototypeIcon name="person-outline" size={18} color={colors.blue} />
              <Text style={{ color: colors.blue, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 13 }}>Criar Perfil</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <SectionHeader large title="Vagas em Destaque" action="Ver todas" onPress={() => setScreen('jobs')} />
        {homeJobs.map((job) => (
          <JobCard key={job.title} job={job} setScreen={setScreen} notify={notify} backTo="home" />
        ))}

        <SectionHeader large title="Cursos Populares" action="Ver todos" onPress={() => setScreen('courses')} />
        <ScrollView ref={coursesRef} horizontal showsHorizontalScrollIndicator={false}>
          {homeCourses.map((course) => (
            <CourseCard key={course.title} course={course} featured notify={notify} />
          ))}
        </ScrollView>
        <CarouselControls
          index={courseSlide}
          total={homeCourses.length}
          onPrevious={() => goToCourseSlide(courseSlide - 1)}
          onNext={() => goToCourseSlide(courseSlide + 1)}
          onSelect={goToCourseSlide}
        />

        <SectionHeader large title="Últimas Notícias" action="Ver alertas" onPress={() => setScreen('notifications')} />
        {news.map((item) => (
          <TouchableOpacity
            key={item.title}
            style={local.newsRow}
            onPress={() => notify('Notícia aberta para leitura.')}
          >
            <Image source={item.imageSource} style={local.newsThumb} resizeMode="cover" />
            <View style={{ flex: 1 }}>
              <Text style={{ color: item.category === 'EVENTOS' ? colors.lightBlue : colors.green, fontFamily: fonts.bold, fontWeight: '700', fontSize: 10 }}>
                {item.category}
              </Text>
              <Text style={{ color: colors.text, fontFamily: fonts.bold, fontWeight: '700', fontSize: 14, marginTop: 3 }}>
                {item.title}
              </Text>
              <Text style={[styles.muted, { marginTop: 6 }]}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
}

const local = StyleSheet.create({
  hero: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9EEF5',
    color: colors.blue,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 14,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 26,
  },
  heroTitle: {
    color: colors.blue,
    fontFamily: fonts.bold,
    fontSize: 36,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: 0,
  },
  newsRow: {
    flexDirection: 'row',
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 18,
    marginBottom: 18,
  },
  newsThumb: {
    width: 78,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow,
  },
  searchButton: {
    height: 50,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 13,
  },
});
