import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

const prototypeIcons = {
  add: { name: 'plus', solid: true },
  attach: { name: 'paperclip', solid: true },
  'arrow-back': { name: 'arrow-left', solid: true },
  'arrow-forward': { name: 'arrow-right', solid: true },
  'bar-chart': { name: 'chart-line', solid: true },
  bookmark: { name: 'bookmark', solid: true },
  'bookmark-outline': { name: 'bookmark', solid: false },
  briefcase: { name: 'briefcase', solid: true },
  'briefcase-outline': { name: 'briefcase', solid: true },
  business: { name: 'building', solid: true },
  'business-outline': { name: 'building', solid: true },
  calendar: { name: 'calendar-alt', solid: true },
  'calendar-outline': { name: 'calendar-alt', solid: true },
  call: { name: 'phone', solid: true },
  camera: { name: 'camera', solid: true },
  cash: { name: 'money-bill-wave', solid: true },
  'chatbubble-outline': { name: 'comment-alt', solid: true },
  checkbox: { name: 'check-square', solid: false },
  checkmark: { name: 'check', solid: true },
  'checkmark-circle': { name: 'check', solid: true },
  'checkmark-done': { name: 'check-double', solid: true },
  'chevron-back': { name: 'chevron-left', solid: true },
  'chevron-down': { name: 'chevron-down', solid: true },
  'chevron-forward': { name: 'chevron-right', solid: true },
  close: { name: 'times', solid: true },
  'code-slash': { name: 'laptop-code', solid: true },
  'color-palette-outline': { name: 'figma', brand: true },
  create: { name: 'pen', solid: true },
  'create-outline': { name: 'pen', solid: true },
  'document-attach': { name: 'file-upload', solid: true },
  'document-text': { name: 'file-alt', solid: true },
  dumbbell: { name: 'dumbbell', solid: true },
  'ellipsis-vertical': { name: 'ellipsis-v', solid: true },
  eye: { name: 'eye', solid: true },
  'file-pdf': { name: 'file-pdf', solid: true },
  headset: { name: 'headset', solid: true },
  heart: { name: 'heartbeat', solid: true },
  home: { name: 'home', solid: true },
  'home-laptop': { name: 'laptop-house', solid: true },
  'home-outline': { name: 'home', solid: true },
  'laptop-outline': { name: 'laptop', solid: true },
  location: { name: 'map-marker-alt', solid: true },
  'location-outline': { name: 'map-marker-alt', solid: true },
  'lock-closed': { name: 'lock', solid: true },
  logout: { name: 'sign-out-alt', solid: true },
  'logo-google': { name: 'google', brand: true },
  'logo-linkedin': { name: 'linkedin', brand: true },
  'logo-nodejs': { name: 'node-js', brand: true },
  'logo-react': { name: 'react', brand: true },
  'mail-outline': { name: 'envelope', solid: false },
  'map-outline': { name: 'map-marker-alt', solid: true },
  medkit: { name: 'briefcase-medical', solid: true },
  menu: { name: 'bars', solid: true },
  notifications: { name: 'bell', solid: true },
  'notifications-outline': { name: 'bell', solid: false },
  options: { name: 'sliders-h', solid: true },
  'options-outline': { name: 'sliders-h', solid: true },
  'paper-plane': { name: 'paper-plane', solid: true },
  people: { name: 'users-cog', solid: true },
  'people-outline': { name: 'users', solid: true },
  person: { name: 'user', solid: true },
  'person-outline': { name: 'user', solid: false },
  'pie-chart': { name: 'chart-pie', solid: true },
  school: { name: 'graduation-cap', solid: true },
  'school-outline': { name: 'graduation-cap', solid: true },
  search: { name: 'search', solid: true },
  'search-outline': { name: 'search', solid: true },
  shield: { name: 'shield-alt', solid: true },
  send: { name: 'paper-plane', solid: true },
  settings: { name: 'cog', solid: true },
  'share-social': { name: 'share-alt', solid: true },
  'square-outline': { name: 'square', solid: false },
  star: { name: 'star', solid: true },
  'stats-chart-outline': { name: 'chart-pie', solid: true },
  'time-outline': { name: 'clock', solid: false },
  utensils: { name: 'utensils', solid: true },
};

export default function PrototypeIcon({ name, ...props }) {
  const icon = prototypeIcons[name] || { name, solid: true };

  return (
    <FontAwesome5
      name={icon.name}
      solid={icon.solid}
      brand={icon.brand}
      {...props}
    />
  );
}
