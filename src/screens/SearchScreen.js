import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import { CourseCard, EventCard, JobCard } from '../components/Cards';
import PrototypeIcon from '../components/PrototypeIcon';
import SearchBar from '../components/SearchBar';
import ScreenGlow from '../components/ScreenGlow';
import { events, searchCourses, searchJobs } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

const resultTabs = [
  { label: 'Todos', count: '124' },
  { label: 'Vagas', count: '45' },
  { label: 'Cursos', count: '32' },
  { label: 'Eventos', count: '47' },
];

export default function SearchScreen({ setScreen, notify, openMenu }) {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [activeFilters, setActiveFilters] = useState(['Match com Perfil', 'Até 10km']);
  const [saved, setSaved] = useState(false);

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter((item) => item !== filter));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader showLogo setScreen={setScreen} action="menu" onAction={openMenu} />

      <Text style={[styles.h1, { color: colors.text, marginTop: 2 }]}>Busca Avançada</Text>
      <Text style={[styles.muted, { marginTop: 5, marginBottom: 18 }]}>
        Encontre oportunidades que combinam com seu perfil
      </Text>

      <View style={[styles.row, { gap: 10, marginBottom: 20 }]}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Salvar Busca"
          style={[styles.outlineButton, { flex: 1, minHeight: 45 }]}
          onPress={() => {
            setSaved(!saved);
            notify(saved ? 'Busca removida dos itens salvos.' : 'Busca salva com sucesso.');
          }}
        >
          <PrototypeIcon name={saved ? 'bookmark' : 'bookmark-outline'} size={16} color={colors.blue} />
          <Text style={{ color: colors.blue, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 12 }}>Salvar Busca</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Criar Alerta"
          style={[styles.primaryButton, { flex: 1, minHeight: 45 }]}
          onPress={() => notify('Alerta ativado para novos resultados.')}
        >
          <PrototypeIcon name="notifications-outline" size={16} color={colors.white} />
          <Text style={[styles.primaryText, { fontSize: 13 }]}>Criar Alerta</Text>
        </TouchableOpacity>
      </View>

      <View style={local.tabs}>
        {resultTabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.label}
            style={[local.tab, activeTab === index && local.tabActive]}
            onPress={() => setActiveTab(index)}
          >
            <Text style={[local.tabLabel, activeTab === index && local.tabLabelActive]}>{tab.label}</Text>
            <Text style={[local.tabCount, activeTab === index && local.tabCountActive]}>{tab.count}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SearchBar
        placeholder="Buscar por cargo, habilidade, curso..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity
        style={[styles.outlineButton, { marginBottom: 14, minHeight: 48 }]}
        onPress={() => setFiltersVisible(!filtersVisible)}
      >
        <PrototypeIcon name="options-outline" size={18} color={colors.blue} />
        <Text style={{ color: colors.blue, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 13 }}>
          {filtersVisible ? 'Ocultar Filtros' : 'Filtros'}
        </Text>
      </TouchableOpacity>

      {filtersVisible && (
        <View style={local.filters}>
          <Text style={local.filtersLabel}>FILTROS ATIVOS:</Text>
          {activeFilters.map((filter) => (
            <TouchableOpacity key={filter} style={local.filterTag} onPress={() => removeFilter(filter)}>
              <Text style={local.filterText}>{filter}</Text>
              <PrototypeIcon name="close" size={13} color={colors.green} />
            </TouchableOpacity>
          ))}
          {!!activeFilters.length && (
            <TouchableOpacity onPress={() => setActiveFilters([])}>
              <Text style={styles.linkText}>Limpar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {(activeTab === 0 || activeTab === 1) && (
        <>
          <ResultHeading icon="briefcase" title="Vagas de Emprego" count="45" onPress={() => setScreen('jobs')} />
          {searchJobs.map((job, index) => (
            <JobCard
              key={job.title}
              job={job}
              setScreen={setScreen}
              notify={notify}
              compact
              backTo="search"
              matchLabel={index === 0 ? 'ALTA COMPATIBILIDADE' : 'Match Parcial'}
            />
          ))}
        </>
      )}

      {(activeTab === 0 || activeTab === 2) && (
        <>
          <ResultHeading icon="school" title="Cursos e Capacitações" count="32" onPress={() => setScreen('courses')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {searchCourses.slice(0, activeTab === 2 ? 2 : 1).map((course) => (
              <CourseCard key={course.title} course={course} featured notify={notify} />
            ))}
          </ScrollView>
        </>
      )}

      {activeTab === 3 && (
        <>
          <ResultHeading icon="calendar" title="Eventos da Cidade" count="47" onPress={() => setScreen('events')} />
          {events.map((event) => (
            <EventCard key={event.title} event={event} notify={notify} />
          ))}
        </>
      )}
    </ScrollView>
  );
}

function ResultHeading({ icon, title, count, onPress }) {
  return (
    <View style={[styles.between, { marginTop: 20, marginBottom: 12 }]}>
      <View style={[styles.row, { gap: 8 }]}>
        <PrototypeIcon name={icon} size={19} color={colors.blue} />
        <Text style={[styles.h2, { fontSize: 16, color: colors.text }]}>{title}</Text>
        <Text style={styles.muted}>({count})</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.linkText}>Ver todos</Text>
      </TouchableOpacity>
    </View>
  );
}

const local = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingBottom: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.blue,
  },
  tabLabel: {
    color: colors.muted,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 12,
  },
  tabLabelActive: {
    color: colors.blue,
  },
  tabCount: {
    borderRadius: 8,
    backgroundColor: colors.gray,
    color: colors.muted,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 10,
  },
  tabCountActive: {
    backgroundColor: colors.blue,
    color: colors.white,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  filtersLabel: {
    color: colors.muted,
    fontSize: 11,
    fontFamily: fonts.semibold,
    fontWeight: '600',
  },
  filterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 12,
    backgroundColor: '#E7FBF3',
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  filterText: {
    color: colors.green,
    fontFamily: fonts.medium,
    fontWeight: '500',
    fontSize: 11,
  },
});
