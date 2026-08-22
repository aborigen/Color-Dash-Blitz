// Bridge for Yandex Games SDK
// We use window.YaGames as defined by the script in layout.tsx

export interface Player {
  getName: () => string;
  getPhoto: (size: 'small' | 'medium' | 'large') => string;
  getUniqueID: () => string;
}

export interface YandexSDK {
  adv: {
    showFullscreenAdv: (callbacks: { 
      onOpen?: () => void; 
      onClose?: (wasShown: boolean) => void; 
      onError?: (error: any) => void;
      onOffline?: () => void;
    }) => void;
    showRewardedVideo: (callbacks: { 
      onOpen?: () => void; 
      onRewarded?: () => void; 
      onClose?: () => void; 
      onError?: (error: any) => void; 
    }) => void;
  };
  features: {
    LoadingAPI?: {
      ready: () => void;
    };
    LoadingProgress?: {
      ready: () => void;
    };
  };
  leaderboards: {
    setLeaderboardScore: (name: string, score: number) => Promise<void>;
    getLeaderboardDescription: (name: string) => Promise<any>;
    getEntries: (name: string, options?: any) => Promise<any>;
    getLeaderboardPlayerEntry: (name: string) => Promise<any>;
  };
  getLeaderboards: () => Promise<any>;
  getRemoteConfig: (options?: { clientParams?: Record<string, string> }) => Promise<Record<string, any>>;
  getPlayer: (options?: { scopes?: boolean }) => Promise<Player>;
  environment: {
    i18n: {
      lang: string;
    };
  };
}

/**
 * Initializes the Yandex SDK with a retry mechanism to account for async script loading.
 */
export async function initYandexSDK(): Promise<YandexSDK | null> {
  if (typeof window === 'undefined') return null;
  console.log('Yandex SDK: [Initialization] Starting process...');

  const checkSDK = async (retries = 5): Promise<YandexSDK | null> => {
    if ((window as any).YaGames) {
      try {
        const sdk = await (window as any).YaGames.init();
        console.log('Yandex SDK: [Initialization] Success! SDK is ready.');
        return sdk;
      } catch (err) {
        console.error('Yandex SDK: [Initialization] Critical Error:', err);
        return null;
      }
    }

    if (retries > 0) {
      console.log(`Yandex SDK: [Initialization] Not found yet, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return checkSDK(retries - 1);
    }

    console.warn('Yandex SDK: [Initialization] Failed. YaGames not found after all retries.');
    return null;
  };

  return checkSDK();
}

/**
 * Fetches the player profile if authorized.
 */
export async function getPlayerData(sdk: YandexSDK | null): Promise<{ name: string } | null> {
  if (!sdk) return null;
  console.log('Yandex SDK: [Player] Attempting to fetch profile data...');
  try {
    const player = await sdk.getPlayer({ scopes: false });
    const name = player.getName();
    console.log('Yandex SDK: [Player] Data retrieved. Name:', name);
    return { name };
  } catch (err) {
    console.warn('Yandex SDK: [Player] Data fetch failed or declined:', err);
    return null;
  }
}

/**
 * Shows a full-screen advertisement.
 */
export async function showFullscreenAd(sdk: YandexSDK | null) {
  if (!sdk) {
    console.warn('Yandex SDK: [Ads] Cannot show ad, SDK not initialized.');
    return;
  }
  console.log('Yandex SDK: [Ads] Requesting fullscreen advertisement...');
  return new Promise<void>((resolve) => {
    sdk.adv.showFullscreenAdv({
      onOpen: () => {
        console.log('Yandex SDK: [Ads] Event: onOpen');
      },
      onClose: (wasShown) => {
        console.log('Yandex SDK: [Ads] Event: onClose. WasShown:', wasShown);
        resolve();
      },
      onError: (err) => {
        console.error('Yandex SDK: [Ads] Event: onError.', err);
        resolve();
      },
      onOffline: () => {
        console.log('Yandex SDK: [Ads] Event: onOffline. Ad skipped.');
        resolve();
      }
    });
  });
}

/**
 * Increments the score on a leaderboard by fetching current score first.
 */
export async function submitScoreToLeaderboard(sdk: YandexSDK | null, leaderboardName: string, roundScore: number) {
  if (!sdk) {
    console.warn('Yandex SDK: [Leaderboard] Cannot submit score, SDK not initialized.');
    return;
  }
  
  console.log(`Yandex SDK: [Leaderboard] Incrementing score for "${leaderboardName}" by ${roundScore}...`);
  
  try {
    const lb = typeof (sdk as any).leaderboards === 'function' 
      ? await (sdk as any).leaderboards() 
      : (sdk as any).leaderboards;

    if (lb && lb.setLeaderboardScore) {
      let currentTotal = 0;
      try {
        const entry = await lb.getLeaderboardPlayerEntry(leaderboardName);
        currentTotal = entry?.score || 0;
        console.log(`Yandex SDK: [Leaderboard] Found existing total score: ${currentTotal}`);
      } catch (e) {
        console.log('Yandex SDK: [Leaderboard] No existing score found or not logged in, starting from 0.');
      }

      const newTotal = currentTotal + roundScore;
      await lb.setLeaderboardScore(leaderboardName, newTotal);
      console.log(`Yandex SDK: [Leaderboard] New total ${newTotal} submitted to "${leaderboardName}".`);
    } else {
      console.warn('Yandex SDK: [Leaderboard] Error: leaderboards API structure unexpected.');
    }
  } catch (err) {
    console.error(`Yandex SDK: [Leaderboard] Submission failed for "${leaderboardName}":`, err);
  }
}

/**
 * Fetches the top N entries from a leaderboard.
 */
export async function getLeaderboardEntries(sdk: YandexSDK | null, leaderboardName: string, quantity: number = 5) {
  if (!sdk) {
    console.warn('Yandex SDK: [Leaderboard] Cannot fetch entries, SDK not initialized.');
    return null;
  }
  console.log(`Yandex SDK: [Leaderboard] Fetching top ${quantity} entries for "${leaderboardName}"...`);
  try {
    const lb = typeof (sdk as any).leaderboards === 'function' 
      ? await (sdk as any).leaderboards() 
      : (sdk as any).leaderboards;
    
    if (lb && lb.getEntries) {
      const res = await lb.getEntries(leaderboardName, { 
        quantityTop: quantity,
        includeUser: true
      });
      console.log('Yandex SDK: [Leaderboard] Successfully retrieved entries:', res.entries.length);
      return res.entries;
    }
  } catch (err) {
    console.error('Yandex SDK: [Leaderboard] Error fetching entries:', err);
  }
  return null;
}

/**
 * Fetches remote configuration from Yandex Games Console.
 */
export async function fetchRemoteConfig(sdk: YandexSDK | null): Promise<Record<string, any>> {
  if (!sdk) return {};
  console.log('Yandex SDK: [Config] Fetching remote configuration...');
  try {
    const config = await sdk.getRemoteConfig();
    console.log('Yandex SDK: [Config] Loaded:', config);
    return config;
  } catch (err) {
    console.warn('Yandex SDK: [Config] Failed to fetch. Using defaults.', err);
    return {};
  }
}

/**
 * Detects the user's language from the SDK environment.
 */
export function getLanguage(sdk: YandexSDK | null): 'en' | 'ru' {
  if (!sdk) return 'en';
  const lang = sdk.environment.i18n.lang;
  const result = lang.startsWith('ru') ? 'ru' : 'en';
  console.log(`Yandex SDK: [Environment] Detected language: ${lang} (mapped to: ${result})`);
  return result as 'en' | 'ru';
}
