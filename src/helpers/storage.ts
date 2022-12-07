import { UserPreferences } from '../interfaces';

export function getPreferences() {
  const prefs = localStorage.getItem('preferences');

  if (prefs) {
    const data = JSON.parse(prefs);

    return data;
  }

  return undefined;
}

export function storagePreferences(prefs: UserPreferences) {
  localStorage.setItem('preferences', JSON.stringify(prefs));
}
