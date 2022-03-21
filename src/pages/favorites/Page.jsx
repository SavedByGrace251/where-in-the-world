import { useRecoilValueLoadable } from "recoil";
import { favoriteCountriesSelector } from "../../atoms/favorites.state";
import { LoadingComponent } from "../../shared/LoadingComponent";
import { FavoritesView } from "./FavoritesView";

export function Favorites() {
  const favoriteCountries = useRecoilValueLoadable(favoriteCountriesSelector);

  return (
    <LoadingComponent recoilValue={favoriteCountries}>
      {(value) => <FavoritesView countries={value} />}
    </LoadingComponent>
  );
}
