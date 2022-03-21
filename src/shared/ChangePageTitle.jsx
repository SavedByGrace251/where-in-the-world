import { useEffect } from "react";

// Taken from Stack overflow https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react
export const ChangePageTitle = ({ pageTitle }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = pageTitle;
    return () => {
      document.title = prevTitle;
    };
  });

  return <></>;
};
