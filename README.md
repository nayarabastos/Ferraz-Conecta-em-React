# Ferraz Conecta

Aplicativo mobile/web em React Native com Expo para conectar moradores de Ferraz de Vasconcelos a vagas de emprego, cursos, eventos locais, notificações e acompanhamento de candidaturas.

O projeto foi construido a partir de um protótipo visual e organizado em telas separadas, componentes reutilizaveis, assets locais e dados mockados para demonstração.

## Como abrir

Acesse: https://snack.expo.dev/@nayarabp/ferrazconecta

ou

## Requisitos

- Node.js instalado
- npm instalado
- Expo CLI via `npx`

## Como rodar

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm start
```

Para abrir direto no navegador:

```bash
npm run web
```

Para abrir no Android ou iOS:

```bash
npm run android
npm run ios
```

No Expo, você também pode escanear o QR Code exibido no terminal usando o app Expo Go.

## Estrutura do projeto

```text
.
├── App.js
├── app.json
├── package.json
├── assets/
│   ├── logo.png
│   ├── logo_azul.png
│   ├── logo_titulo.png
│   ├── brand-mark-navy.png
│   └── prototype/
├── src/
│   ├── components/
│   ├── constants/
│   ├── data/
│   └── screens/
├── figma-export/
├── snack-ready/
└── dist/
```
## Observações

- O app usa navegação por estado interno em `App.js`, sem React Navigation.
- As informações exibidas sao mockadas e ficam em `src/data/mockData.js`.
- Os filtros de vagas e cursos funcionam localmente sobre os dados mockados.
- Algumas ações exibem feedback visual ou simulam comportamento real, como salvar vaga, atualizar perfil e participar de evento.

## Status

Projeto em fase de protótipo funcional, pronto para demonstração visual, navegação entre telas e evolução para integração com backend.
