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

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
