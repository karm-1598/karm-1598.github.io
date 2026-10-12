export const zoneIds = [
  "hero",
  "work",
  "capabilities",
  "build",
  "database",
  "contact",
] as const;

export type ZoneId = (typeof zoneIds)[number];

type ScrollSnapshot = {
  progress: number;
  zones: Record<ZoneId, number>;
};

export const scrollSnapshot: ScrollSnapshot = {
  progress: 0,
  zones: {
    hero: 0,
    work: 0,
    capabilities: 0,
    build: 0,
    database: 0,
    contact: 0,
  },
};

export function setPageProgress(progress: number) {
  scrollSnapshot.progress = Math.max(0, Math.min(1, progress));
}

export function setZoneProgress(zone: ZoneId, progress: number) {
  scrollSnapshot.zones[zone] = Math.max(0, Math.min(1, progress));
}
