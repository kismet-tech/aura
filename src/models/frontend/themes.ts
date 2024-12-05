export interface ThemeVariables {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  radius: string;
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
}

// These are the radius presets provided by shadcn-ui
// They are arbitrary but reasonable options
export const radiusPresets = {
  none: "0rem",
  sm: "0.3rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
};

// This is the default theme we use
// The values in this object are the fallback values for the CSS variables in globals.css
export const neutralTheme: ThemeVariables = {
  background: "0 0% 100%",
  foreground: "0 0% 3.9%",
  card: "0 0% 100%",
  "card-foreground": "0 0% 3.9%",
  popover: "0 0% 100%",
  "popover-foreground": "0 0% 3.9%",
  primary: "0 0% 9%",
  "primary-foreground": "0 0% 98%",
  secondary: "0 0% 96.1%",
  "secondary-foreground": "0 0% 9%",
  muted: "0 0% 96.1%",
  "muted-foreground": "0 0% 45.1%",
  accent: "0 0% 96.1%",
  "accent-foreground": "0 0% 9%",
  destructive: "0 84.2% 60.2%",
  "destructive-foreground": "0 0% 98%",
  border: "0 0% 89.8%",
  input: "0 0% 89.8%",
  ring: "0 0% 3.9%",
  radius: radiusPresets.md,
  "chart-1": "12 76% 61%",
  "chart-2": "173 58% 39%",
  "chart-3": "197 37% 24%",
  "chart-4": "43 74% 66%",
  "chart-5": "27 87% 67%",
};

// This is just an example of a custom theme
export const blueTheme: ThemeVariables = {
  background: "0 0% 100%",
  foreground: "222.2 84% 4.9%",
  card: "0 0% 100%",
  "card-foreground": "222.2 84% 4.9%",
  popover: "0 0% 100%",
  "popover-foreground": "222.2 84% 4.9%",
  primary: "221.2 83.2% 53.3%",
  "primary-foreground": "210 40% 98%",
  secondary: "210 40% 96.1%",
  "secondary-foreground": "222.2 47.4% 11.2%",
  muted: "210 40% 96.1%",
  "muted-foreground": "215.4 16.3% 46.9%",
  accent: "210 40% 96.1%",
  "accent-foreground": "222.2 47.4% 11.2%",
  destructive: "0 84.2% 60.2%",
  "destructive-foreground": "210 40% 98%",
  border: "214.3 31.8% 91.4%",
  input: "214.3 31.8% 91.4%",
  ring: "221.2 83.2% 53.3%",
  radius: radiusPresets.lg,
  "chart-1": "12 76% 61%",
  "chart-2": "173 58% 39%",
  "chart-3": "197 37% 24%",
  "chart-4": "43 74% 66%",
  "chart-5": "27 87% 67%",
};

export const knollcroftTheme: ThemeVariables = {
  background: "55 52% 96%",
  foreground: "55 5% 10%",
  card: "55 50% 96%",
  "card-foreground": "55 5% 15%",
  popover: "55 52% 96%;",
  "popover-foreground": "55 95% 10%",
  primary: "55 10.8% 56.5%",
  "primary-foreground": "0 0% 100%",
  secondary: "55 30% 90%",
  "secondary-foreground": "0 0% 0%",
  muted: "17 30% 95%",
  "muted-foreground": "55 5% 40%",
  accent: "17 30% 90%",
  "accent-foreground": "55 5% 15%",
  destructive: "0 52% 50%",
  "destructive-foreground": "55 5% 96%",
  border: "55 30% 82%",
  input: "55 30% 50%",
  ring: "55 10.8% 56.5%",
  radius: radiusPresets.sm,
  "chart-1": "12 76% 61%",
  "chart-2": "173 58% 39%",
  "chart-3": "197 37% 24%",
  "chart-4": "43 74% 66%",
  "chart-5": "27 87% 67%",
};

// :root  {
//   --background: 55 52% 96%;
//   --foreground: 55 5% 10%;
//   --card: 55 50% 96%;
//   --card-foreground: 55 5% 15%;
//   --popover: 55 52% 96%;
//   --popover-foreground: 55 95% 10%;
//   --primary: 55 10.8% 56.5%;
//   --primary-foreground: 0 0% 100%;
//   --secondary: 55 30% 90%;
//   --secondary-foreground: 0 0% 0%;
//   --muted: 17 30% 95%;
//   --muted-foreground: 55 5% 40%;
//   --accent: 17 30% 90%;
//   --accent-foreground: 55 5% 15%;
//   --destructive: 0 52% 50%;
//   --destructive-foreground: 55 5% 96%;
//   --border: 55 30% 82%;
//   --input: 55 30% 50%;
//   --ring: 55 10.8% 56.5%;
//   --radius: 0.5rem;
// }
// .dark  {
//   --background: 55 50% 10%;
//   --foreground: 55 5% 96%;
//   --card: 55 50% 10%;
//   --card-foreground: 55 5% 96%;
//   --popover: 55 50% 5%;
//   --popover-foreground: 55 5% 96%;
//   --primary: 55 10.8% 56.5%;
//   --primary-foreground: 0 0% 100%;
//   --secondary: 55 30% 20%;
//   --secondary-foreground: 0 0% 100%;
//   --muted: 17 30% 25%;
//   --muted-foreground: 55 5% 65%;
//   --accent: 17 30% 25%;
//   --accent-foreground: 55 5% 95%;
//   --destructive: 0 52% 50%;
//   --destructive-foreground: 55 5% 96%;
//   --border: 55 30% 50%;
//   --input: 55 30% 50%;
//   --ring: 55 10.8% 56.5%;
//   --radius: 0.5rem;
// }
