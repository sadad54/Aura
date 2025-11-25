import axios, { AxiosInstance, AxiosError } from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('aura_auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          localStorage.removeItem('aura_auth_token');
          localStorage.removeItem('aura_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth methods
  async register(email: string, password: string, name: string) {
    const response = await this.client.post('/auth/register', { email, password, name });
    if (response.data.token) {
      localStorage.setItem('aura_auth_token', response.data.token);
      localStorage.setItem('aura_user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('aura_auth_token', response.data.token);
      localStorage.setItem('aura_user', JSON.stringify(response.data.user));
    }
    return response.data;
  }

  async getProfile() {
    const response = await this.client.get('/auth/profile');
    return response.data.user;
  }

  async updateProfile(name: string) {
    const response = await this.client.put('/auth/profile', { name });
    localStorage.setItem('aura_user', JSON.stringify(response.data.user));
    return response.data;
  }

  logout() {
    localStorage.removeItem('aura_auth_token');
    localStorage.removeItem('aura_user');
    localStorage.removeItem('aura_onboarding_complete');
  }

  // Journal methods
  async createJournal(data: {
    title?: string;
    content: string;
    mood: string;
    moodIntensity: number;
    tags?: string[];
    isVoice?: boolean;
    hasPhoto?: boolean;
  }) {
    const response = await this.client.post('/journal', data);
    return response.data;
  }

  async getJournals(params?: { page?: number; limit?: number; mood?: string; tags?: string[] }) {
    const response = await this.client.get('/journal', { params });
    return response.data;
  }

  async getJournalById(id: string) {
    const response = await this.client.get(`/journal/${id}`);
    return response.data.journal;
  }

  async updateJournal(id: string, data: Partial<{
    title: string;
    content: string;
    mood: string;
    moodIntensity: number;
    tags: string[];
  }>) {
    const response = await this.client.put(`/journal/${id}`, data);
    return response.data;
  }

  async deleteJournal(id: string) {
    const response = await this.client.delete(`/journal/${id}`);
    return response.data;
  }

  async getJournalStats() {
    const response = await this.client.get('/journal/stats');
    return response.data.stats;
  }

  // Habit methods
  async createHabit(data: {
    title: string;
    description?: string;
    icon?: string;
    gradient?: string;
    category: string;
    timeOfDay?: string;
  }) {
    const response = await this.client.post('/habits', data);
    return response.data;
  }

  async getHabits(category?: string) {
    const response = await this.client.get('/habits', { params: { category } });
    return response.data.habits;
  }

  async updateHabit(id: string, data: Partial<{
    title: string;
    description: string;
    icon: string;
    gradient: string;
    category: string;
    timeOfDay: string;
    isActive: boolean;
  }>) {
    const response = await this.client.put(`/habits/${id}`, data);
    return response.data;
  }

  async deleteHabit(id: string) {
    const response = await this.client.delete(`/habits/${id}`);
    return response.data;
  }

  async completeHabit(id: string, note?: string) {
    const response = await this.client.post(`/habits/${id}/complete`, { note });
    return response.data;
  }

  async getHabitCompletions(id: string, days = 30) {
    const response = await this.client.get(`/habits/${id}`, { params: { days } });
    return response.data.completions;
  }

  async getHabitStats() {
    const response = await this.client.get('/habits/stats');
    return response.data.stats;
  }

  // Mood methods
  async logMood(data: {
    mood: string;
    intensity: number;
    note?: string;
    triggers?: string[];
  }) {
    const response = await this.client.post('/moods', data);
    return response.data;
  }

  async getMoods(days = 7) {
    const response = await this.client.get('/moods', { params: { days } });
    return response.data.moods;
  }

  async getMoodStats(days = 30) {
    const response = await this.client.get('/moods/stats', { params: { days } });
    return response.data.stats;
  }

  // Sleep methods
  async createSleepSession(data: {
    bedTime: Date;
    wakeTime: Date;
    quality?: number;
    deepSleep?: number;
    remSleep?: number;
    lightSleep?: number;
    note?: string;
  }) {
    const response = await this.client.post('/sleep', data);
    return response.data;
  }

  async getSleepSessions(days = 7) {
    const response = await this.client.get('/sleep', { params: { days } });
    return response.data.sessions;
  }

  async updateSleepSession(id: string, data: Partial<{
    quality: number;
    deepSleep: number;
    remSleep: number;
    lightSleep: number;
    note: string;
  }>) {
    const response = await this.client.put(`/sleep/${id}`, data);
    return response.data;
  }

  async getSleepStats(days = 30) {
    const response = await this.client.get('/sleep/stats', { params: { days } });
    return response.data.stats;
  }

  // Soundscape methods
  async logSoundscape(data: {
    soundscape: string;
    duration: number;
    volume: number;
  }) {
    const response = await this.client.post('/soundscapes', data);
    return response.data;
  }

  async getSoundscapeHistory(days = 30) {
    const response = await this.client.get('/soundscapes/history', { params: { days } });
    return response.data;
  }

  // Reflection methods
  async createReflection(data: {
    title: string;
    content: string;
    mood: string;
    intensity: number;
    tags?: string[];
    peaceScore?: number;
  }) {
    const response = await this.client.post('/reflections', data);
    return response.data;
  }

  async getReflections(days = 7) {
    const response = await this.client.get('/reflections', { params: { days } });
    return response.data.reflections;
  }

  async getReflectionTimeline(days = 7) {
    const response = await this.client.get('/reflections/timeline', { params: { days } });
    return response.data;
  }

  // Analytics methods
  async getDashboardAnalytics(days = 7) {
    const response = await this.client.get('/analytics/dashboard', { params: { days } });
    return response.data.analytics;
  }

  async getDetailedAnalytics(days = 30) {
    const response = await this.client.get('/analytics/detailed', { params: { days } });
    return response.data.detailedAnalytics;
  }
}

export const apiClient = new ApiClient();
