import { IConfig } from "overmind";
import { merge, namespaced } from "overmind/config";
import { createHook, createStateHook } from "overmind-react";
import effects from "./effects";
import { onInitialize } from "./onInitialize";

import * as router from "./namespaces/router";

export const config = merge({ effects, onInitialize }, namespaced({ router }));

declare module "overmind" {
  interface Config extends IConfig<typeof config> {}
}
export const useOvermind = createHook<typeof config>();
export const useState = createStateHook<typeof config>();
