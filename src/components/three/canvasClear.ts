import type { RootState } from "@react-three/fiber";

/** Match site surfaces so mobile WebGL does not clear to black. */
export function onLightCanvasCreated(
  state: Pick<RootState, "gl">,
  tone: "paper" | "paper-2" = "paper-2"
) {
  const color = tone === "paper" ? 0xffffff : 0xf8f9fa;
  state.gl.setClearColor(color, 1);
}
