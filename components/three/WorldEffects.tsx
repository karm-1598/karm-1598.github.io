"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function WorldEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.75} luminanceThreshold={0.7} mipmapBlur />
    </EffectComposer>
  );
}
