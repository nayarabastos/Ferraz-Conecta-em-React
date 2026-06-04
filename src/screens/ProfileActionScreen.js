import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import FormField from '../components/FormField';
import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import { colors, fonts, styles } from '../constants/theme';

const modes = {
  edit: {
    title: 'Editar perfil',
    description: 'Atualize as informações que aparecem para empresas e recrutadores.',
    icon: 'person-outline',
    button: 'Salvar alterações',
    toast: 'Perfil atualizado com sucesso.',
    fields: [
      ['Nome completo', 'person-outline', 'Ana Silva'],
      ['Cargo desejado', 'briefcase-outline', 'Desenvolvedora Front-end Pleno'],
      ['Cidade', 'location-outline', 'Ferraz de Vasconcelos'],
    ],
    multilineLabel: 'Sobre você',
    multiline: 'Apaixonada por criar interfaces intuitivas e acessíveis. Experiência de 4 anos com React, Tailwind CSS e TypeScript.',
  },
  tag: {
    title: 'Adicionar habilidade',
    description: 'Inclua uma nova tag para melhorar suas recomendações de vagas.',
    icon: 'add',
    button: 'Adicionar tag',
    toast: 'Habilidade adicionada ao perfil.',
    fields: [['Habilidade', 'star', 'React Native']],
  },
  experience: {
    title: 'Adicionar experiência',
    description: 'Registre uma experiência para fortalecer seu currículo na plataforma.',
    icon: 'briefcase-outline',
    button: 'Salvar experiência',
    toast: 'Experiência adicionada ao perfil.',
    fields: [
      ['Cargo', 'briefcase-outline', 'Desenvolvedora Front-end'],
      ['Empresa', 'business-outline', 'Tech Solutions S/A'],
      ['Período', 'calendar-outline', 'Jan 2022 - Atual'],
    ],
    multilineLabel: 'Descrição',
    multiline: 'Descreva suas principais atividades, tecnologias utilizadas e resultados alcançados.',
  },
  cv: {
    title: 'Atualizar currículo',
    description: 'Envie uma versão recente para candidaturas e recomendações.',
    icon: 'document-attach',
    button: 'Salvar currículo',
    toast: 'Currículo atualizado.',
    fields: [['Nome do arquivo', 'document-text', 'Ana_Silva_CV_2026.pdf']],
  },
};

const suggestions = ['React Native', 'UX Writing', 'SQL', 'Node.js', 'Acessibilidade'];

export default function ProfileActionScreen({ setScreen, notify, mode = 'edit' }) {
  const config = modes[mode] || modes.edit;
  const [values, setValues] = useState(() => config.fields.map((field) => field[2]));
  const [textArea, setTextArea] = useState(config.multiline || '');
  const [uploaded, setUploaded] = useState(false);

  const updateValue = (index, value) => {
    const next = [...values];
    next[index] = value;
    setValues(next);
  };

  const finish = () => {
    notify(config.toast);
    setScreen('profile');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader title={config.title} setScreen={setScreen} backTo="profile" action="checkmark" onAction={finish} />

      <View style={local.hero}>
        <View style={local.heroIcon}>
          <PrototypeIcon name={config.icon} size={22} color={colors.blue} />
        </View>
        <Text style={local.heroTitle}>{config.title}</Text>
        <Text style={[styles.body, { textAlign: 'center', marginTop: 7 }]}>{config.description}</Text>
      </View>

      {mode === 'cv' && (
        <TouchableOpacity
          style={local.upload}
          activeOpacity={0.9}
          onPress={() => {
            setUploaded(true);
            notify('Arquivo selecionado para envio.');
          }}
        >
          <View style={local.uploadIcon}>
            <PrototypeIcon name={uploaded ? 'checkmark' : 'document-attach'} size={23} color={uploaded ? colors.green : colors.lightBlue} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={local.optionTitle}>{uploaded ? 'Arquivo pronto para salvar' : 'Selecionar currículo'}</Text>
            <Text style={styles.muted}>PDF ou DOCX até 5 MB</Text>
          </View>
          <PrototypeIcon name="chevron-forward" size={16} color={colors.muted} />
        </TouchableOpacity>
      )}

      {config.fields.map(([label, icon], index) => (
        <View key={label}>
          <Text style={styles.label}>{label}</Text>
          <FormField
            icon={icon}
            placeholder={label}
            value={values[index]}
            onChangeText={(value) => updateValue(index, value)}
          />
        </View>
      ))}

      {mode === 'tag' && (
        <View style={{ marginTop: 18 }}>
          <Text style={local.smallTitle}>Sugestões</Text>
          <View style={styles.tagsWrap}>
            {suggestions.map((item) => (
              <TouchableOpacity key={item} onPress={() => updateValue(0, item)}>
                <Text style={[styles.tag, values[0] === item && local.activeTag]}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {!!config.multilineLabel && (
        <View>
          <Text style={styles.label}>{config.multilineLabel}</Text>
          <View style={[styles.inputWrap, local.textAreaWrap]}>
            <TextInput
              multiline
              textAlignVertical="top"
              style={[styles.input, local.textArea]}
              placeholder={config.multilineLabel}
              placeholderTextColor="#9CA3AF"
              value={textArea}
              onChangeText={setTextArea}
            />
          </View>
        </View>
      )}

      <TouchableOpacity style={[styles.primaryButton, { marginTop: 24 }]} activeOpacity={0.9} onPress={finish}>
        <Text style={styles.primaryText}>{config.button}</Text>
        <PrototypeIcon name="checkmark" size={17} color={colors.white} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.outlineButton, { marginTop: 12 }]} activeOpacity={0.9} onPress={() => setScreen('profile')}>
        <Text style={{ color: colors.blue, fontFamily: fonts.semibold, fontWeight: '600', fontSize: 13 }}>Cancelar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  hero: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#EEF2F7',
    borderRadius: 14,
    padding: 18,
    marginBottom: 10,
    alignItems: 'center',
  },
  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 17,
  },
  upload: {
    minHeight: 76,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  uploadIcon: {
    width: 42,
    height: 42,
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
  smallTitle: {
    color: colors.blue,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 13,
    marginBottom: 10,
  },
  activeTag: {
    color: colors.white,
    backgroundColor: colors.blue,
  },
  textAreaWrap: {
    minHeight: 118,
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  textArea: {
    minHeight: 104,
    width: '100%',
  },
});
