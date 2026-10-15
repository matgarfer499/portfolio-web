import { describe, expect, it } from 'vitest';
import { pending, type CaseStudy } from '@content/index';
import { caseMeta, caseOg, caseSlugs, caseText, caseTransition, findCase, nextCase } from './model';

// No real case is pending today; this one keeps the bracketed-note paths covered.
const unwritten: CaseStudy = {
  slug: 'unwritten',
  name: pending({ en: 'Product name' }),
  tagline: pending({ en: 'One-line description' }),
  summary: pending({ en: 'What it is and the result' }),
  stack: [],
  sections: [],
};

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

describe('caseText', () => {
  it('uses the text, or the pending note in brackets so titles never read empty', () => {
    expect(caseText(findCase('chefory')!.name, 'en')).toBe('Chefory');
    expect(caseText(unwritten.name, 'en')).toBe('[Product name]');
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
    expect(caseMeta(unwritten, 'en', 'Matías García')).toEqual({
      title: '[Product name] — Matías García',
      description: '[What it is and the result]',
    });
  });

  it('gives each case its own shared-element name for the title', () => {
    expect(caseTransition('title', 'miot')).toBe('case-title-miot');
    expect(caseTransition('title', 'miot')).not.toBe(caseTransition('title', 'rat'));
  });

  it('gives the share image the case name and tagline, or their bracketed notes', () => {
    expect(caseOg(findCase('rat')!, 'en')).toEqual({
      title: 'R.A.T.',
      kicker: 'Social deduction party game',
    });
    expect(caseOg(unwritten, 'en')).toEqual({
      title: '[Product name]',
      kicker: '[One-line description]',
    });
  });
});
