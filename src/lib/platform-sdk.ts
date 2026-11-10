
/**
 * Multi-Platform SDK Bridge for Color Dash Blitz.
 * Handles initialization and communication for Yandex, VK, and Sber platforms.
 */

export type Platform = 'GENERIC' | 'YANDEX' | 'VK' | 'SBER';

export const CURRENT_PLATFORM: Platform = (process.env.NEXT_PUBLIC_GAME_PLATFORM as Platform) || 'GENERIC';

class PlatformSDKBridge {
  private initialized = false;
  private sdk: any = null;

  async init(): Promise<void> {
    if (typeof window === 'undefined' || this.initialized) return;

    try {
      switch (CURRENT_PLATFORM) {
        case 'YANDEX':
          if ((window as any).YaGames) {
            this.sdk = await (window as any).YaGames.init();
            console.log('Yandex SDK Initialized');
          }
          break;
        case 'VK':
          if ((window as any).vkBridge) {
            await (window as any).vkBridge.send('VKWebAppInit');
            console.log('VK SDK Initialized');
          }
          break;
        case 'SBER':
          // Sber SmartMarket integration typically uses the Assistant SDK
          // This is a placeholder for specific initialization logic
          console.log('Sber SDK (Simulated) Initialized');
          break;
        default:
          console.log('Running on Generic Platform');
      }
      this.initialized = true;
    } catch (error) {
      console.error('Failed to initialize SDK:', error);
    }
  }

  async reportScore(score: number): Promise<void> {
    if (!this.initialized) return;

    try {
      switch (CURRENT_PLATFORM) {
        case 'YANDEX':
          if (this.sdk && this.sdk.getLeaderboards) {
            const lb = await this.sdk.getLeaderboards();
            // Note: Replace 'topBlitzers' with your actual leaderboard name if configured
            lb.setLeaderboardScore('topBlitzers', score);
          }
          break;
        case 'VK':
          if ((window as any).vkBridge) {
            await (window as any).vkBridge.send('VKWebAppShowWallPostBox', {
              message: `I scored ${score} in Color Dash Blitz! Can you beat me?`
            });
          }
          break;
        case 'SBER':
          // Sber specific score reporting
          break;
      }
    } catch (error) {
      console.warn('Score reporting not available or failed:', error);
    }
  }

  async showInterstitial(): Promise<void> {
    if (!this.initialized) return;

    try {
      switch (CURRENT_PLATFORM) {
        case 'YANDEX':
          if (this.sdk) {
            this.sdk.adv.showFullscreenAdv({
              callbacks: {
                onClose: (wasShown: boolean) => console.log('Ad closed, shown:', wasShown),
                onError: (error: any) => console.error('Ad error:', error)
              }
            });
          }
          break;
        // VK and Sber have their own ad methods
      }
    } catch (error) {
      console.warn('Ad playback failed:', error);
    }
  }
}

export const platformSDK = new PlatformSDKBridge();
