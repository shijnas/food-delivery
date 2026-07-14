import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kayikk.app',
  appName: 'Kayikk',
  webDir: 'out',
  server: {
    androidScheme: 'http',
    cleartext: true
  }
};

export default config;
