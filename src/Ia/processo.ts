
import { IaResponde } from "./ia";
import { falar } from "./fala";

export const processo = async (hist: any) => {
  const res = await IaResponde(hist);

  await falar(res);

  return res ?? "";
};
