import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FormField from '../components/FormField';
import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import { colors, fonts, styles } from '../constants/theme';

export default function RegisterScreen({ setScreen, notify }) {
  const [interests, setInterests] = useState(['Empregos']);
  const [agreed, setAgreed] = useState(false);

  const toggleInterest = (item) => {
    setInterests(interests.includes(item)
      ? interests.filter((interest) => interest !== item)
      : [...interests, item]);
  };

  const continueRegistration = () => {
    if (!agreed) {
      notify('Aceite os termos para continuar.');
      return;
    }
    notify('Perfil de candidato criado. Bem-vinda ao Ferraz Conecta!');
    setScreen('home');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <View style={[styles.between, { paddingTop: 22 }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setScreen('login')}>
          <PrototypeIcon name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.muted, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 11 }}>CANDIDATO</Text>
        <View style={{ width: 44 }} />
      </View>

      <Text style={[styles.h1, { marginTop: 28 }]}>Criar perfil</Text>
      <Text style={[styles.body, { marginTop: 8, marginBottom: 28 }]}>
        Cadastro exclusivo para candidatos. Encontre vagas, cursos e eventos em Ferraz.
      </Text>

      <Text style={styles.label}>Nome completo</Text>
      <FormField icon="person-outline" placeholder="João da Silva" />

      <Text style={styles.label}>E-mail</Text>
      <FormField icon="mail-outline" placeholder="seu@email.com" keyboardType="email-address" />

      <Text style={styles.label}>Telefone (WhatsApp)</Text>
      <FormField icon="call" placeholder="(11) 90000-0000" keyboardType="phone-pad" />

      <Text style={[styles.h2, { marginTop: 28 }]}>Endereço</Text>
      <Text style={styles.label}>CEP</Text>
      <View style={[styles.row, { gap: 10 }]}>
        <View style={{ flex: 1 }}>
          <FormField icon="location-outline" placeholder="00000-000" />
        </View>
        <TouchableOpacity
          accessibilityLabel="Buscar CEP"
          style={[styles.outlineButton, { width: 112 }]}
          onPress={() => notify('CEP localizado: Ferraz de Vasconcelos.')}
        >
          <Text style={styles.linkText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Rua / Avenida</Text>
      <FormField icon="map-outline" placeholder="Rua Exemplo" />

      <View style={[styles.row, { gap: 12 }]}>
        <View style={{ flex: 0.44 }}>
          <Text style={styles.label}>Número</Text>
          <FormField icon="home-outline" placeholder="123" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Cidade</Text>
          <FormField icon="business-outline" placeholder="Ferraz de Vasconcelos" />
        </View>
      </View>

      <Text style={[styles.h2, { marginTop: 28 }]}>Áreas de Interesse</Text>
      <Text style={[styles.muted, { marginVertical: 12 }]}>Selecione o que você procura na plataforma:</Text>
      <View style={styles.tagsWrap}>
        {['Empregos', 'Cursos Técnicos', 'Eventos Locais', 'Voluntariado'].map((item) => (
          <TouchableOpacity key={item} onPress={() => toggleInterest(item)}>
            <Text style={interests.includes(item) ? [styles.tag, { backgroundColor: colors.blue, color: colors.white }] : styles.tag}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity accessibilityLabel="Aceitar termos" style={local.terms} onPress={() => setAgreed(!agreed)}>
        <PrototypeIcon name={agreed ? 'checkbox' : 'square-outline'} size={22} color={agreed ? colors.blue : colors.muted} />
        <Text style={[styles.body, { flex: 1, fontSize: 14 }]}>
          Li e concordo com os <Text style={styles.linkText}>Termos de Uso</Text> e{' '}
          <Text style={styles.linkText}>Política de Privacidade</Text> da plataforma Ferraz Conecta.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity accessibilityLabel="Criar perfil de candidato" style={[styles.primaryButton, { marginTop: 24 }]} onPress={continueRegistration}>
        <Text style={styles.primaryText}>Criar perfil</Text>
        <PrototypeIcon name="arrow-forward" size={18} color={colors.white} />
      </TouchableOpacity>

      <Text style={[styles.muted, { textAlign: 'center', marginTop: 18 }]}>Já tem uma conta?</Text>
      <TouchableOpacity onPress={() => setScreen('login')}>
        <Text style={[styles.h2, { marginTop: 8 }]}>Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  terms: {
    backgroundColor: colors.gray2,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 28,
  },
});
