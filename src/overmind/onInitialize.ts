import { OnInitialize } from "overmind";
export const onInitialize: OnInitialize = ({ actions, effects }) => {
  effects.router.initialize({
    "/": actions.router.showHomePage,
    //@ts-ignore
    "/artist/:id": actions.router.showArtistPage,
    //@ts-ignore
    "/album/:id": actions.router.showAlbumPage,
  });
};
