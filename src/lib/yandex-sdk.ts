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
  // Modern API replacing getLeaderboards()
  leaderboards: {
    setLeaderboardScore: (name: string, score: number) => Promise<void>;
    getLeaderboardDescription: (name: string) => Promise<any>;
    getEntries: (name: string, options?: any) => Promise<any>;
  };
  getLeaderboards: () => Promise<any>; // Kept for legacy compatibility if needed internally
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
  console.log('Yandex SDK: Starting initialization...');

  const checkSDK = async (retries = 5): Promise<YandexSDK | null> => {
    if ((window as any).YaGames) {
      try {
        const sdk = await (window as any).YaGames.init();
        console.log('Yandex SDK: Initialized successfully.');
        return sdk;
      } catch (err) {
        console.error('Yandex SDK: Init Error:', err);
        return null;
      }
    }

    if (retries > 0) {
      console.log(`Yandex SDK: Not found, retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 500));
      return checkSDK(retries - 1);
    }

    console.warn('Yandex SDK: YaGames not found after all retries.');
    return null;
  };

  return checkSDK();
}

/**
 * Fetches the player profile if authorized.
 */
export async function getPlayerData(sdk: YandexSDK | null): Promise<{ name: string } | null> {
  if (!sdk) return null;
  console.log('Yandex SDK: Attempting to fetch player data...');
  try {
    // Attempt silent initialization (scopes: false) to get basic data without popups
    const player = await sdk.getPlayer({ scopes: false });
    const name = player.getName();
    console.log('Yandex SDK: Player data retrieved. Name:', name);
    return {
      name,
    };
  } catch (err) {
    console.warn('Yandex SDK: Player data fetch failed or declined:', err);
    return null;
  }
}

/**
 * Shows a full-screen advertisement.
 */
export async function showFullscreenAd(sdk: YandexSDK | null) {
  if (!sdk) {
    console.warn('Yandex SDK: Cannot show ad, SDK not initialized.');
    return;
  }
  console.log('Yandex SDK: Requesting fullscreen ad...');
  return new Promise<void>((resolve) => {
    sdk.adv.showFullscreenAdv({
      onOpen: () => {
        console.log('Yandex SDK: Ad opened.');
      },
      onClose: (wasShown) => {
        console.log('Yandex SDK: Ad closed. wasShown:', wasShown);
        resolve();
      },
      onError: (err) => {
        console.error('Yandex SDK: Ad error:', err);
        resolve();
      },
      onOffline: () => {
        console.log('Yandex SDK: Ad skipped: offline');
        resolve();
      }
    });
  });
}

/**
 * Safely submits a score to a specified leaderboard using the modern leaderboards API.
 */
export async function submitScoreToLeaderboard(sdk: YandexSDK | null, leaderboardName: string, score: number) {
  if (!sdk) {
    console.warn('Yandex SDK: Cannot submit score, SDK not initialized.');
    return;
  }
  console.log(`Yandex SDK: Submitting score ${score} to leaderboard "${leaderboardName}"...`);
  try {
    // Note: Some SDK versions provide 'leaderboards' as an async function, others as an object.
    const lb = typeof (sdk as any).leaderboards === 'function' 
      ? await (sdk as any).leaderboards() 
      : (sdk as any).leaderboards;

    if (lb && lb.setLeaderboardScore) {
      await lb.setLeaderboardScore(leaderboardName, score);
      console.log(`Yandex SDK: Score ${score} successfully submitted to "${leaderboardName}".`);
    } else {
      console.warn('Yandex SDK: Leaderboard API structure unexpected.');
    }
  } catch (err) {
    console.error(`Yandex SDK: Leaderboard submission failed for "${leaderboardName}":`, err);
  }
}

/**
 * Fetches the top N entries from a leaderboard.
 */
export async function getLeaderboardEntries(sdk: YandexSDK | null, leaderboardName: string, quantity: number = 5) {
  if (!sdk) {
    console.warn('Yandex SDK: Cannot fetch leaderboard, SDK not initialized.');
    return null;
  }
  console.log(`Yandex SDK: Fetching top ${quantity} entries for leaderboard "${leaderboardName}"...`);
  try {
    const lb = typeof (sdk as any).leaderboards === 'function' 
      ? await (sdk as any).leaderboards() 
      : (sdk as any).leaderboards;
    
    if (lb && lb.getEntries) {
      const res = await lb.getEntries(leaderboardName, { 
        quantityTop: quantity,
        includeUser: true
      });
      console.log('Yandex SDK: Leaderboard entries fetched:', res.entries);
      return res.entries;
    }
  } catch (err) {
    console.error('Yandex SDK: Could not fetch leaderboard entries', err);
  }
  return null;
}

/**
 * Fetches remote configuration from Yandex Games Console.
 */
export async function fetchRemoteConfig(sdk: YandexSDK | null): Promise<Record<string, any>> {
  if (!sdk) return {};
  console.log('Yandex SDK: Fetching remote config...');
  try {
    const config = await sdk.getRemoteConfig();
    console.log('Yandex SDK: Remote config loaded:', config);
    return config;
  } catch (err) {
    console.warn('Yandex SDK: Failed to fetch remote config:', err);
    return {};
  }
}

/**
 * Detects the user's language from the SDK environment.
 */
export function getLanguage(sdk: YandexSDK | null): 'en' | 'ru' {
  if (!sdk) return 'en';
  const lang = sdk.environment.i18n.lang;
  return lang.startsWith('ru') ? 'ru' : 'en';
}
