import React, { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AppHeader from '../components/AppHeader';
import Chips from '../components/Chips';
import PrototypeIcon from '../components/PrototypeIcon';
import SearchBar from '../components/SearchBar';
import ScreenGlow from '../components/ScreenGlow';
import { colors, fonts, styles } from '../constants/theme';

const conversations = [
  {
    name: 'RH Tech Solutions',
    time: '09:41',
    preview: 'Olá! Recebemos seu currículo e...',
    unread: 1,
    icon: 'business',
    imageSource: require('../../assets/prototype/avatar-rh.jpg'),
    online: true,
    category: 'Empresas',
  },
  {
    name: 'Suporte Ferraz Conecta',
    time: 'Ontem',
    preview: 'Sua dúvida foi resolvida. Podemos...',
    icon: 'headset',
    category: 'Suporte',
  },
  {
    name: 'Indústrias Silva',
    time: 'Segunda',
    preview: 'Currículo_Atualizado.pdf',
    icon: 'document-attach',
    imageSource: require('../../assets/prototype/avatar-company.jpg'),
    category: 'Empresas',
  },
];

export default function MessagesScreen({ setScreen, notify, openMenu }) {
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const visible = useMemo(() => conversations.filter((conversation) => {
    const fitsText = conversation.name.toLowerCase().includes(search.toLowerCase());
    const fitsFilter = filter === 0
      || (filter === 1 && conversation.unread)
      || (filter === 2 && conversation.category === 'Empresas')
      || (filter === 3 && conversation.category === 'Suporte');
    return fitsText && fitsFilter;
  }), [filter, search]);

  if (selected) {
    return (
      <View style={styles.screen}>
        <View style={[styles.content, { flex: 1, paddingBottom: 20 }]}>
          <ScreenGlow />
          <View style={local.chatHeader}>
            <TouchableOpacity accessibilityLabel="Voltar para mensagens" style={styles.iconButton} onPress={() => setSelected(null)}>
              <PrototypeIcon name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
            <ConversationAvatar conversation={selected} />
            <View style={{ flex: 1 }}>
              <Text style={local.title}>{selected.name}</Text>
              <Text style={[styles.muted, { color: colors.green }]}>Online agora</Text>
            </View>
            <TouchableOpacity accessibilityLabel="Opções da conversa" onPress={() => notify('Opções da conversa abertas.')}>
              <PrototypeIcon name="ellipsis-vertical" size={21} color={colors.muted} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={local.messages}>
            <Text style={local.date}>HOJE</Text>
            <View style={local.inBubble}>
              <Text style={local.bubbleText}>
                Olá! Vimos seu perfil e achamos muito interessante para nossa vaga de Desenvolvedor Front-end.
              </Text>
            </View>
            <View style={local.inBubble}>
              <Image
                source={require('../../assets/prototype/chat-workspace.png')}
                style={local.attachmentImage}
              />
              <Text style={[local.bubbleText, { marginTop: 8 }]}>Conheça um pouco do nosso ambiente de trabalho.</Text>
            </View>
            <View style={local.outBubble}>
              <Text style={[local.bubbleText, { color: colors.white }]}>
                Olá! Agradeço o contato. Sim, tenho disponibilidade amanhã às 14h.
              </Text>
            </View>
            {!!sentMessage && (
              <View style={local.outBubble}>
                <Text style={[local.bubbleText, { color: colors.white }]}>{sentMessage}</Text>
              </View>
            )}
          </ScrollView>

          <View style={local.composer}>
            <TouchableOpacity accessibilityLabel="Anexar arquivo" onPress={() => notify('Selecione um anexo para enviar.')}>
              <PrototypeIcon name="attach" size={22} color={colors.muted} />
            </TouchableOpacity>
            <TextInput
              style={local.composerInput}
              placeholder="Digite sua mensagem..."
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              accessibilityLabel="Enviar mensagem"
              style={local.sendButton}
              onPress={() => {
                setSentMessage(message || 'Perfeito, confirmo a conversa.');
                setMessage('');
                notify('Mensagem enviada.');
              }}
            >
              <PrototypeIcon name="send" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenGlow />
      <AppHeader showLogo setScreen={setScreen} action="menu" onAction={openMenu} />

      <View style={[styles.between, { marginBottom: 14 }]}>
        <Text style={[styles.h2, { color: colors.text }]}>Mensagens</Text>
        <TouchableOpacity onPress={() => notify('Nova mensagem iniciada.')}>
          <PrototypeIcon name="create-outline" size={20} color={colors.muted} />
        </TouchableOpacity>
      </View>
      <SearchBar placeholder="Buscar conversas..." value={search} onChangeText={setSearch} />
      <Chips items={['Todas', 'Não lidas 2', 'Empresas', 'Suporte']} activeIndex={filter} onChange={setFilter} />

      <View style={{ marginHorizontal: -24 }}>
        {visible.map((conversation, index) => (
          <TouchableOpacity
            key={conversation.name}
            style={[local.conversation, index === 0 && filter === 0 && local.highlight]}
            onPress={() => setSelected(conversation)}
          >
            <ConversationAvatar conversation={conversation} />
            <View style={{ flex: 1 }}>
              <View style={styles.between}>
                <Text style={local.title}>{conversation.name}</Text>
                <Text style={[styles.muted, conversation.unread && { color: colors.lightBlue }]}>{conversation.time}</Text>
              </View>
              <View style={styles.between}>
                <Text numberOfLines={1} style={[styles.muted, { flex: 1, marginTop: 5 }]}>{conversation.preview}</Text>
                {!!conversation.unread && <Text style={local.unread}>{conversation.unread}</Text>}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function ConversationAvatar({ conversation }) {
  return (
    <View style={local.avatar}>
      {conversation.imageSource ? (
        <Image source={conversation.imageSource} style={local.avatarImage} />
      ) : (
        <PrototypeIcon name={conversation.icon} size={22} color={colors.blue} />
      )}
      {conversation.online && <View style={local.onlineDot} />}
    </View>
  );
}

const local = StyleSheet.create({
  conversation: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    backgroundColor: colors.white,
  },
  highlight: {
    borderLeftWidth: 4,
    borderLeftColor: '#00D1D2',
    backgroundColor: '#F0FEFE',
    paddingLeft: 20,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: colors.gray2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.green,
    borderWidth: 2,
    borderColor: colors.white,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 14,
  },
  unread: {
    width: 20,
    height: 20,
    borderRadius: 10,
    color: colors.white,
    backgroundColor: '#00D1D2',
    textAlign: 'center',
    paddingTop: 2,
    fontSize: 11,
    fontFamily: fonts.bold,
    fontWeight: '700',
  },
  chatHeader: {
    minHeight: 70,
    marginHorizontal: -24,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  messages: {
    paddingVertical: 24,
    gap: 14,
  },
  date: {
    textAlign: 'center',
    color: colors.muted,
    fontFamily: fonts.semibold,
    fontWeight: '600',
    fontSize: 11,
  },
  inBubble: {
    maxWidth: '82%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 13,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outBubble: {
    maxWidth: '82%',
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
    borderRadius: 16,
    padding: 13,
  },
  bubbleText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 20,
  },
  attachmentImage: {
    width: 214,
    height: 112,
    borderRadius: 10,
  },
  composer: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  composerInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.regular,
    color: colors.text,
    paddingVertical: 12,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
