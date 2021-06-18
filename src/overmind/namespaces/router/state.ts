export enum Page {
  Home = "home_page",
  Artist = "artist_page",
  Album = "album_page",
}
type State =
  | { currentPage: Page.Home }
  | { currentPage: Page.Artist; id: string }
  | { currentPage: Page.Album; id: string };

export const state: State = {
  currentPage: Page.Home,
};
