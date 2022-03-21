import { useRecoilValueLoadable } from "recoil";
import { countriesState } from "../../atoms/countries.state";
import { LoadingComponent } from "../../shared/LoadingComponent";
import { CountiesView } from "./CountiesView";

export function Home() {
  const countries = useRecoilValueLoadable(countriesState);

  return (
    <LoadingComponent recoilValue={countries}>
      {(value) => {
        return <CountiesView countries={value} />;
      }}
    </LoadingComponent>
  );
}
