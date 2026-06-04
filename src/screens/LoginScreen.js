import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import FormField from '../components/FormField';
import PrototypeIcon from '../components/PrototypeIcon';
import ScreenGlow from '../components/ScreenGlow';
import { colors, fonts, shadow, styles } from '../constants/theme';

export default function LoginScreen({ setScreen, notify }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, local.auth]}>
      <ScreenGlow />
      <Image
        source={require('../../assets/logo_azul.png')}
        style={local.logo}
        resizeMode="contain"
      />
      <Text style={local.logoTitle}>Ferraz Conecta</Text>

      <View style={local.illustration}>
        <Image
          source={require('../../assets/prototype/login-illustration.png')}
          style={local.illustrationImage}
          resizeMode="cover"
        />
        <View style={local.badge}>
          <PrototypeIcon name="briefcase" size={14} color={colors.green} />
          <Text style={local.badgeText}>Vagas</Text>
        </View>
        <View style={[local.badge, { alignSelf: 'flex-end' }]}>
          <PrototypeIcon name="school" size={14} color={colors.lightBlue} />
          <Text style={local.badgeText}>Cursos</Text>
        </View>
      </View>

      <FormField icon="mail-outline" placeholder="seu@email.com" keyboardType="email-address" />

      <View style={styles.between}>
        <Text style={styles.label}>Senha</Text>
        <TouchableOpacity onPress={() => notify('Link de recuperação enviado para seu e-mail.')}>
          <Text style={styles.linkText}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
      <FormField icon="lock-closed" placeholder="********" secureTextEntry />

      <TouchableOpacity style={[styles.primaryButton, { marginTop: 26 }]} onPress={() => setScreen('home')}>
        <Text style={styles.primaryText}>Entrar</Text>
        <PrototypeIcon name="arrow-forward" size={18} color={colors.white} />
      </TouchableOpacity>

      <View style={local.dividerRow}>
        <View style={local.divider} />
        <Text style={styles.muted}>ou continue com</Text>
        <View style={local.divider} />
      </View>

      <View style={[styles.row, { gap: 14 }]}>
        <TouchableOpacity style={local.social} onPress={() => notify('Continuando com Google...')}>
          <PrototypeIcon name="logo-google" size={17} color="#4285F4" />
          <Text style={local.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={local.social} onPress={() => notify('Continuando com LinkedIn...')}>
          <PrototypeIcon name="logo-linkedin" size={18} color="#0A66C2" />
          <Text style={local.socialText}>LinkedIn</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.muted, { textAlign: 'center', marginTop: 30 }]}>Ainda não tem uma conta?</Text>
      <TouchableOpacity onPress={() => setScreen('register')}>
        <Text style={{ color: colors.green, fontFamily: fonts.semibold, textAlign: 'center', fontWeight: '600', fontSize: 14, marginTop: 6 }}>
          Criar perfil de candidato
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const local = StyleSheet.create({
  auth: {
    paddingTop: 38,
  },
  logo: {
    width: 112,
    height: 112,
    alignSelf: 'center',
    marginBottom: 2,
  },
  logoTitle: {
    color: colors.blue,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 18,
  },
  illustration: {
    minHeight: 262,
    borderRadius: 14,
    backgroundColor: 'rgba(248,250,252,0.92)',
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 18,
    ...shadow,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  illustrationImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    ...shadow,
    zIndex: 1,
  },
  badgeText: {
    color: colors.blue,
    fontFamily: fonts.bold,
    fontWeight: '700',
    fontSize: 10,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  social: {
    flex: 1,
    minHeight: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.white,
  },
  socialText: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 14,
  },
});
