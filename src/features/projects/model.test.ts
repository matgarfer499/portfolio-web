import { describe, expect, it } from 'vitest';
import { caseMeta, caseOg, caseSlugs, caseTransition, findCase, nextCase } from './model';

describe('findCase / nextCase', () => {
  it('finds a case study by slug and nothing for an unknown one', () => {
    expect(findCase('miot')?.slug).toBe('miot');
    expect(findCase('nope')).toBeUndefined();
  });

  it('links each case to the next one and wraps after the last', () => {
    expect(nextCase('miot').slug).toBe('rat');
    expect(nextCase('rascame-esta').slug).toBe('miot');
  });
});

describe('case pages', () => {
  it('has one static page per case study, the featured one first', () => {
    expect(caseSlugs()).toEqual(['miot', 'rat', 'physics-sketchbook', 'chefory', 'rascame-esta']);
  });

  it('titles a case with its name and describes it with its summary', () => {
    expect(caseMeta(findCase('miot')!, 'en', 'Matías García').title).toBe(
      'MIOT Sentra — Matías García',
    );
  });

  it('gives each case its own shared-element name for the title', () => {
    expect(caseTransition('title', 'miot')).toBe('case-title-miot');
    expect(caseTransition('title', 'miot')).not.toBe(caseTransition('title', 'rat'));
  });

  it('gives the share image the case name and tagline', () => {
    expect(caseOg(findCase('rat')!, 'en')).toEqual({
      title: 'R.A.T.',
      kicker: 'Social deduction party game',
    });
  });
});
