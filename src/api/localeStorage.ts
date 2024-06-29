class LocalStorageService {

  static getFavorites(): number[] {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  }

  static setFavorites(favorites: number[]) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
}

export { LocalStorageService };
