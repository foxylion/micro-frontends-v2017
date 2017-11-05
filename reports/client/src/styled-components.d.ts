declare module "styled-components/lib/models/StyleSheet" {
  export class StyleSheet {
    public toHTML(): string;
  }

  export class Instance {
      public instance: StyleSheet;
  }

  const instance: Instance;

  export default instance;
}
