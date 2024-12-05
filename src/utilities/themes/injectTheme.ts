import { ThemeVariables } from "@/models/frontend/themes";

export const injectTheme = (
  formContainer: HTMLDivElement,
  themeVariables: ThemeVariables
) => {
  for (const themeVariable of Object.entries(themeVariables)) {
    const [varName, varValue] = themeVariable;
    formContainer.style.setProperty("--" + varName, varValue);
  }
};
