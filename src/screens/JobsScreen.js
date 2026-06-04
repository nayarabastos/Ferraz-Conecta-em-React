import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import { JobCard } from '../components/Cards';
import Chips from '../components/Chips';
import PrototypeIcon from '../components/PrototypeIcon';
import SearchBar from '../components/SearchBar';
import ScreenGlow from '../components/ScreenGlow';
import { jobs } from '../data/mockData';
import { colors, fonts, styles } from '../constants/theme';

export default function JobsScreen({ setScreen, notify }) {
  const [activeFilter, setActiveFilter] = useState(0);
  const filters = [
    { label: 'Todos', icon: 'options' },
    'Tecnologia',
    'Remoto',
    'R$ 3k - 5k',
  ];
  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === 1) return job.category === 'Tecnologia';
    if (activeFilter === 2) return job.mode.toLowerCase().includes('remoto');
    if (activeFilter === 3) return job.salary.includes('3.500') || job.salary.includes('5.000');
    return true;
  });

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader title="Vagas" setScreen={setScreen} />
      <SearchBar placeholder="Buscar cargo, empresa ou palavra-chave" onFocus={() => setScreen('search')} />
      <Chips
        items={filters}
        activeIndex={activeFilter}
        onChange={(index) => {
          setActiveFilter(index);
          notify(index === 0 ? 'Mostrando todas as vagas.' : 'Filtro aplicado.');
        }}
      />

      <View style={[styles.between, { marginTop: 14, marginBottom: 18 }]}>
        <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 14 }}>
          {filteredJobs.length} {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
        </Text>
        <View style={styles.row}>
          <Text style={styles.muted}>Mais recentes</Text>
          <PrototypeIcon name="chevron-down" size={15} color={colors.muted} />
        </View>
      </View>

      {filteredJobs.map((job) => (
        <JobCard key={job.title} job={job} setScreen={setScreen} notify={notify} />
      ))}
      {!filteredJobs.length && (
        <View style={styles.softCard}>
          <Text style={{ color: colors.text, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 14 }}>
            Nenhuma vaga encontrada
          </Text>
          <Text style={[styles.body, { marginTop: 6 }]}>Tente remover ou trocar o filtro selecionado.</Text>
        </View>
      )}
    </ScrollView>
  );
}
