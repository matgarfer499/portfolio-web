import { describe, expect, it } from 'vitest';
import { caseMeta, caseOg, caseSlugs, caseText, caseTransition, findCase, nextCase } from './model';

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

describe('case pages', () => {
  it('has one static page per case study', () => {
    expect(caseSlugs()).toEqual(['chefory', 'tech-lead']);
  });

  it('titles a pending case with its bracketed note', () => {
    expect(caseMeta(findCase('tech-lead')!, 'en', 'Matías García')).toEqual({
      title: '[Product you led as Tech Lead] — Matías García',
      description: '[Problem, your role, the team, what shipped and the result]',
    });
  });

  it('gives each case its own shared-element names for the title and the shot', () => {
    expect(caseTransition('title', 'chefory')).toBe('case-title-chefory');
    expect(caseTransition('shot', 'chefory')).not.toBe(caseTransition('shot', 'tech-lead'));
  });

  it('gives the share image a pending case its bracketed title', () => {
    expect(caseOg('tech-lead', 'en')).toEqual({
      title: '[Product you led as Tech Lead]',
      kicker: '[One-line description of the product]',
    });
  });
});
