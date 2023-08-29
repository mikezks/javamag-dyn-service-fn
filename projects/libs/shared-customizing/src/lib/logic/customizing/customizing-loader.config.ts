import { HttpClient } from "@angular/common/http";
import { inject, InjectionToken } from "@angular/core";
import { map, Observable } from "rxjs";

export type CustomizingConfigType = 'routes' | 'services' | 'functions';
export type CustomizingRouteConfigType = 'routes' | 'component' | 'html' | 'card';

export interface DynToggleConfig {
  active: boolean;
}

export interface DynRouteConfig extends DynToggleConfig {
  type: CustomizingRouteConfigType;
  source: string[];
}

export interface CustomizingConfig {
  routes: Record<string, Record<string, DynRouteConfig>>;
  services: Record<string, DynToggleConfig>;
  functions: Record<string, DynToggleConfig>;
}

export interface CustomizingHead {
  id: number;
  category: CustomizingConfigType;
  scope: string;
}

export type CustomizingConfigDto = (
  (CustomizingHead & { path: 'string' } & DynRouteConfig) |
  (CustomizingHead & DynToggleConfig )
)[];

export function transformCustomizingConfig(
  configDto: CustomizingConfigDto
): CustomizingConfig {
  const initialConfig: CustomizingConfig = {
    routes: {},
    services: {},
    functions: {}
  };

  const config = configDto.reduce((acc, cur) => {
    const { id, category, scope, path, ...cfg } =
      cur as CustomizingHead & { path: 'string' } & DynRouteConfig;
    if (category === 'routes' && !acc[cur.category][cur.scope]) {
      acc[cur.category][cur.scope] = {};
    }
    if (category === 'routes') {
      (acc[cur.category][cur.scope] as Record<string, DynRouteConfig>)
        [(cur as { path: 'string' }).path] = cfg;
    } else {
      acc[cur.category][cur.scope] = cfg; 
    }
    
    return acc;
  }, initialConfig);

  return config;
}

export const CUSTOMIZING_CONFIG_URL = new InjectionToken<string>(
  'CUSTOMIZING_CONFIG_URL',
  {
    providedIn: 'root',
    // factory: () => './assets/config/customizing.config.json'
    factory: () => 'http://localhost:3000/customizing'
  }
);

export function defaultCustomizingConfigLoader(): Observable<CustomizingConfig> {
  return inject(HttpClient).get<CustomizingConfigDto>(inject(CUSTOMIZING_CONFIG_URL)).pipe(
    map(configDto => transformCustomizingConfig(configDto))
  );
}

export const CUSTOMIZING_CONFIG_LOADER = new InjectionToken<Observable<CustomizingConfig>>(
  'CUSTOMIZING_CONFIG_LOADER',
  {
    providedIn: 'root',
    factory: defaultCustomizingConfigLoader
  }
);
