declare module "*.png" {
  const value: string;

  export default value;
}

declare module "*.svg" {
  const value: string;

  export default value;
}

declare global {
  interface Window {
    google: { maps: string[] };
  }
}
