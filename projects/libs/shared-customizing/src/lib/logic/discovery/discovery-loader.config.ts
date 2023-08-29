import { LoadRemoteModuleOptions } from "@angular-architects/module-federation-runtime";
import { HttpClient } from "@angular/common/http";
import { InjectionToken, inject } from "@angular/core";
import { Observable, map } from "rxjs";


export interface DiscoveryLoadConfig {
  [key: string]: LoadRemoteModuleOptions
};

export interface DiscoveryLoadConfigHead {
  id: number;
  key: string;
}

export type DiscoveryLoadConfigDto =
  (DiscoveryLoadConfigHead & LoadRemoteModuleOptions)[];

export function transformDiscoveryLoadConfig(
  configDto: DiscoveryLoadConfigDto
): DiscoveryLoadConfig {
  const initialConfig: DiscoveryLoadConfig = {}

  const config = configDto.reduce((acc, cur) => {
    const { id, key, ...cfg } = cur;
    acc[key] = cur;

    return acc;
  }, initialConfig);

  return config;
}

export const DISCOVERY_CONFIG_URL = new InjectionToken<string>(
  'DISCOVERY_CONFIG_URL',
  {
    providedIn: 'root',
    // factory: () => './assets/config/discovery.config.json'
    factory: () => 'http://localhost:3000/discovery'
  }
);

export function defaultDiscoveryConfigLoader(): Observable<DiscoveryLoadConfig> {
  return inject(HttpClient).get<DiscoveryLoadConfigDto>(inject(DISCOVERY_CONFIG_URL)).pipe(
    map(configDto => transformDiscoveryLoadConfig(configDto))
  );
}

export const DISCOVERY_CONFIG_LOADER = new InjectionToken<Observable<DiscoveryLoadConfig>>(
  'DISCOVERY_CONFIG_LOADER',
  {
    providedIn: 'root',
    factory: defaultDiscoveryConfigLoader
  }
);
