export type SenderRole = 'niño' | 'maestro' | 'familia';

export interface ContactMessage {
  id?: string;
  senderName: string;
  senderEmail: string;
  senderRole: SenderRole;
  subject: string;
  message: string;
  createdAt: string;
}

export type GameType = 'cuestionario' | 'biomas' | 'sopa_letras';

export interface QuizAttempt {
  id?: string;
  playerName: string;
  gameType: GameType;
  score: number;
  totalQuestions: number;
  durationSeconds: number;
  completedAt: string;
}

export interface UserAccount {
  id?: string;
  email: string;
  createdAt: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ContaminantCategory {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  route: string;
}

export interface ContentSection {
  id: string;
  heading?: string;
  subheading?: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  bulletItems?: string[];
  numberedItems?: string[];
}

export interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: string;
}

export interface BiomeOption {
  id: string;
  imageUrl: string;
  label: string;
}

export interface BiomeChallenge {
  id: number;
  biomeName: string;
  question: string;
  correctOptionId: string;
  options: BiomeOption[];
}

export interface ExternalResource {
  title: string;
  url: string;
  language: 'es' | 'en';
}

export interface GameCardItem {
  id: GameType;
  title: string;
  description: string;
  imageUrl: string;
  route: string;
}
