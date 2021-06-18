import { Action } from "overmind";
import { Page } from "./state";

export const showHomePage: Action = ({ state }) => {
  state.router = { currentPage: Page.Home };
};

export const showArtistPage: Action<{ id: string }> = ({ state }, payload) => {
  state.router = { currentPage: Page.Artist, id: payload.id };
};

export const showAlbumPage: Action<{ id: string }> = ({ state }, payload) => {
  state.router = { currentPage: Page.Album, id: payload.id };
};
