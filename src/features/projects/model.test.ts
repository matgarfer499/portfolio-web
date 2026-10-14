import { describe, expect, it } from 'vitest';
import { caseText, findCase, nextCase } from './model';

describe('findCase / nextCase', () => {
  it('finds a case study by slug and nothing for an unknown one', () => {
    expect(findCase('chefory')?.slug).toBe('chefory');
    expect(findCase('nope')).toBeUndefined();
  });

  it('links each case to the next one and wraps after the last', () => {
    expect(nextCase('chefory').slug).toBe('tech-lead');
    expect(nextCase('tech-lead').slug).toBe('chefory');
  });
});

describe('caseText', () => {
  it('uses the text, or the pending note in brackets so titles never read empty', () => {
    expect(caseText(findCase('chefory')!.name, 'en')).toBe('Chefory');
    expect(caseText(findCase('tech-lead')!.name, 'es')).toBe(
      '[Producto que lideraste como Tech Lead]',
    );
  });
});
