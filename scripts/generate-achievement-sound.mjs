// Synthesizes the achievement chime so the repo carries no opaque binary audio asset.
// Run with: node scripts/generate-achievement-sound.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const SAMPLE_RATE = 44_100;
const NOTES = [523.25, 659.25, 783.99, 1046.5]; // C5 · E5 · G5 · C6 arpeggio
const NOTE_DURATION = 0.11;
const TAIL = 0.2;

const totalSeconds = NOTES.length * NOTE_DURATION + TAIL;
const sampleCount = Math.floor(SAMPLE_RATE * totalSeconds);
const samples = new Float32Array(sampleCount);

NOTES.forEach((frequency, noteIndex) => {
  const start = Math.floor(noteIndex * NOTE_DURATION * SAMPLE_RATE);
  const voiceSamples = Math.floor((NOTE_DURATION + TAIL) * SAMPLE_RATE);
  for (let s = 0; s < voiceSamples; s += 1) {
    const index = start + s;
    if (index >= sampleCount) break;
    const time = s / SAMPLE_RATE;
    const attack = Math.min(1, time / 0.005);
    const decay = Math.exp(-time * 9);
    const tone =
      Math.sin(2 * Math.PI * frequency * time) * 0.7 +
      Math.sin(2 * Math.PI * frequency * 2 * time) * 0.15;
    samples[index] += tone * attack * decay * 0.5;
  }
});

let peak = 0;
for (const value of samples) peak = Math.max(peak, Math.abs(value));
const gain = peak > 0 ? 0.89 / peak : 1;

const bytesPerSample = 2;
const dataSize = sampleCount * bytesPerSample;
const buffer = Buffer.alloc(44 + dataSize);
let offset = 0;
const writeString = (text) => {
  buffer.write(text, offset);
  offset += text.length;
};
const writeU32 = (value) => {
  buffer.writeUInt32LE(value, offset);
  offset += 4;
};
const writeU16 = (value) => {
  buffer.writeUInt16LE(value, offset);
  offset += 2;
};

writeString('RIFF');
writeU32(36 + dataSize);
writeString('WAVE');
writeString('fmt ');
writeU32(16);
writeU16(1); // PCM
writeU16(1); // mono
writeU32(SAMPLE_RATE);
writeU32(SAMPLE_RATE * bytesPerSample);
writeU16(bytesPerSample);
writeU16(16); // bits per sample
writeString('data');
writeU32(dataSize);

for (let i = 0; i < sampleCount; i += 1) {
  const clamped = Math.max(-1, Math.min(1, samples[i] * gain));
  buffer.writeInt16LE(Math.round(clamped * 32_767), offset);
  offset += 2;
}

const out = 'public/sfx/achievement.wav';
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, buffer);
console.log(`Wrote ${out} — ${(buffer.length / 1024).toFixed(1)} KB, ${totalSeconds.toFixed(2)}s`);
