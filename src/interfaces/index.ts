export interface Weather {
  name: string;
  data: {
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    dt: number;
    sys: {
      sunrise: number;
      sunset: number;
    };
    timezone: number;
  };
}

export interface Search {
  state: boolean;
  results?: [{ name: string; country: string; state: string; lat: number; lon: number }];
}

export interface UserPreferences {
  unit: '°C' | '°F';
  location?: {
    city: string;
    lat: number;
    lon: number;
  };
}

export interface Screen {
  current: 'INTRO' | 'WEATHER' | 'PREFERENCES';
}
