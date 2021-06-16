import { IConfig } from "overmind";
import { createHook } from "overmind-react";

export const config = {};

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}
export const useOvermind = createHook<typeof config>();
