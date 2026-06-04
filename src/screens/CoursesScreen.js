import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import CarouselControls from '../components/CarouselControls';
import { CourseCard } from '../components/Cards';
import Chips from '../components/Chips';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import ScreenGlow from '../components/ScreenGlow';
import { courses, recommendedCourses } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

const categories = ['Todos', 'Tecnologia', 'Saúde', 'Idiomas'];

export default function CoursesScreen({ setScreen, notify }) {
  const [category, setCategory] = useState(0);
  const recommendedRef = useRef(null);
  const [recommendedSlide, setRecommendedSlide] = useState(0);
  const selectedCategory = categories[category];

  const filterCourse = (course) => selectedCategory === 'Todos' || course.category === selectedCategory;
  const filteredRecommended = recommendedCourses.filter(filterCourse);
  const filteredCourses = courses.filter(filterCourse);

  const goToRecommended = (nextIndex) => {
    if (!filteredRecommended.length) return;

    const boundedIndex = (nextIndex + filteredRecommended.length) % filteredRecommended.length;
    setRecommendedSlide(boundedIndex);
    recommendedRef.current?.scrollTo({ x: boundedIndex * 244, animated: true });
  };

  useEffect(() => {
    setRecommendedSlide(0);
    recommendedRef.current?.scrollTo({ x: 0, animated: false });
  }, [category]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader title="Cursos e Capacitações" setScreen={setScreen} backTo="home" />
      <SearchBar placeholder="Buscar cursos..." onFocus={() => setScreen('search')} />
      <Chips
        items={[
          'Todos',
          { label: 'Tecnologia', icon: 'laptop-outline' },
          { label: 'Saúde', icon: 'medkit' },
          'Idiomas',
        ]}
        activeIndex={category}
        onChange={(index) => {
          setCategory(index);
          notify(index === 0 ? 'Mostrando todos os cursos.' : 'Categoria de cursos atualizada.');
        }}
      />

      <SectionHeader
        title="Recomendados para Você"
        action={filteredRecommended.length > 1 ? 'Ver todos' : undefined}
        onPress={() => goToRecommended(recommendedSlide + 1)}
      />
      {filteredRecommended.length ? (
        <>
          <ScrollView ref={recommendedRef} horizontal showsHorizontalScrollIndicator={false}>
            {filteredRecommended.map((course) => (
              <CourseCard key={course.title} course={course} featured notify={notify} />
            ))}
          </ScrollView>
          <CarouselControls
            index={recommendedSlide}
            total={filteredRecommended.length}
            onPrevious={() => goToRecommended(recommendedSlide - 1)}
            onNext={() => goToRecommended(recommendedSlide + 1)}
            onSelect={goToRecommended}
          />
        </>
      ) : (
        <EmptyState title="Nenhum curso recomendado" />
      )}

      <SectionHeader title="Catálogo de Cursos" />
      {filteredCourses.map((course) => (
        <CourseCard key={course.title} course={course} notify={notify} />
      ))}
      {!filteredCourses.length && <EmptyState title="Nenhum curso encontrado" />}
    </ScrollView>
  );
}

function EmptyState({ title }) {
  return (
    <View style={styles.softCard}>
      <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 14 }}>
        {title}
      </Text>
      <Text style={[styles.body, { marginTop: 6 }]}>Tente escolher outra categoria para ver mais opções.</Text>
    </View>
  );
}
