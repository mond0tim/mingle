// types/global.d.ts
import p5 from "p5";

declare global {
  type P5jsContainerRef = HTMLDivElement;
  type P5jsSketch = (p: p5, parentRef: P5jsContainerRef) => void;
  type P5jsContainer = ({
    sketch,
  }: {
    sketch: P5jsSketch;
  }) => React.JSX.Element;
  class ColorThief {
    getColor(sourceImage: HTMLImageElement | HTMLCanvasElement, quality?: number): [number, number, number];
    getPalette(sourceImage: HTMLImageElement | HTMLCanvasElement, colorCount?: number, quality?: number): [number, number, number][];
  }

}

declare module 'colorthief' {
  class ColorThief {
    getColor(sourceImage: HTMLImageElement | HTMLCanvasElement, quality?: number): [number, number, number];
    getPalette(sourceImage: HTMLImageElement | HTMLCanvasElement, colorCount?: number, quality?: number): [number, number, number][];
  }

  export = ColorThief;
}

declare module 'material-web-components-react/ripple' {
  const Ripple: any;
  export default Ripple;
}

declare module 'material-web-components-react/focus-ring' {
  const FocusRing: any;
  export default FocusRing;
}

declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}