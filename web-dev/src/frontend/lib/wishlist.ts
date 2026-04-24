export type MockWishlistItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

const WISHLIST_STORAGE_KEY = "velora.mock.wishlist";

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStorageValue<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorageValue<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function readWishlist() {
  return readStorageValue<MockWishlistItem[]>(WISHLIST_STORAGE_KEY, []);
}

export function writeWishlist(items: MockWishlistItem[]) {
  writeStorageValue(WISHLIST_STORAGE_KEY, items);
}

export function addWishlistItem(item: MockWishlistItem) {
  const existing = readWishlist();
  const alreadySaved = existing.some((entry) => entry.productId === item.productId);
  const next = alreadySaved ? existing : [item, ...existing];
  writeWishlist(next);
  return next;
}

export function removeWishlistItem(productId: string) {
  const next = readWishlist().filter((item) => item.productId !== productId);
  writeWishlist(next);
  return next;
}

export function clearWishlist() {
  writeWishlist([]);
}

export function getWishlistCount(items?: MockWishlistItem[]) {
  const source = items ?? readWishlist();
  return source.length;
}
