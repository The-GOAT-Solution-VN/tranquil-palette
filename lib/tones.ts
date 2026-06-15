/**
 * Gradient "tones" ported verbatim from the original Tranquil Palette export.
 * These are used as graceful fallbacks behind every artwork / editorial image:
 * when a Sanity image is absent, the tone renders so the layout never breaks.
 */
export const tones = {
  sage: "radial-gradient(120% 90% at 22% 16%,#F4F8EA 0%,rgba(244,248,234,0) 55%),radial-gradient(110% 85% at 84% 82%,#B7C98A 0%,rgba(183,201,138,0) 60%),linear-gradient(150deg,#DCE7C4,#A9BD79)",
  peach: "radial-gradient(120% 90% at 25% 18%,#FCEEDD 0%,rgba(252,238,221,0) 55%),radial-gradient(110% 85% at 82% 84%,#F0A765 0%,rgba(240,167,101,0) 60%),linear-gradient(150deg,#FBE3CB,#EBA257)",
  gold: "radial-gradient(120% 90% at 24% 16%,#FCF4DF 0%,rgba(252,244,223,0) 55%),radial-gradient(110% 85% at 84% 84%,#E6C457 0%,rgba(230,196,87,0) 60%),linear-gradient(150deg,#FBF0D6,#E4BE54)",
  green: "radial-gradient(120% 90% at 22% 16%,#EAF1DA 0%,rgba(234,241,218,0) 55%),radial-gradient(110% 85% at 84% 82%,#8FA85C 0%,rgba(143,168,92,0) 60%),linear-gradient(150deg,#CDDCA8,#7E9648)",
  orange: "radial-gradient(120% 90% at 24% 16%,#FCE7D2 0%,rgba(252,231,210,0) 55%),radial-gradient(110% 85% at 84% 84%,#EE8A3A 0%,rgba(238,138,58,0) 60%),linear-gradient(150deg,#F8D6B6,#E97E27)",
  warm: "radial-gradient(120% 90% at 30% 20%,#F4EEE3 0%,rgba(244,238,227,0) 55%),radial-gradient(110% 90% at 80% 85%,#D2BD9F 0%,rgba(210,189,159,0) 60%),linear-gradient(150deg,#EFE7DA,#C9B393)",
} as const;

export type Tone = keyof typeof tones;

export const TONE_VALUES = Object.keys(tones) as Tone[];

export function toneGradient(tone: string | undefined | null): string {
  return tones[(tone as Tone) ?? "sage"] ?? tones.sage;
}
