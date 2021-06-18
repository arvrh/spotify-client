import page from "page";

type IParams = {
  [param: string]: string;
} | void;

export const router = {
  initialize(routes: { [url: string]: (params: IParams) => void }) {
    Object.keys(routes).forEach((url) => {
      page(url, ({ params }) => routes[url](params));
    });
    page.start();
  },
  open: (url: string) => page.show(url),
};
