export const SHELF_KEYS = {
  READING: 'reading',
  DECK: 'deck',
  RECENT: 'recent',
  ALL: 'all',
};

export interface IShelf {
  key: (typeof SHELF_KEYS)[keyof typeof SHELF_KEYS];
  title: string;
  className?: string;
}

export const SHELVES = [
  { key: SHELF_KEYS.READING, title: 'Reading', className: 'reading' },
  { key: SHELF_KEYS.DECK, title: 'On Deck' },
  { key: SHELF_KEYS.RECENT, title: 'Recently Read' },
  { key: SHELF_KEYS.ALL, title: 'Library' },
];
