import getSegmentsFromRanges from '../listbox-highlight';

describe('listbox highlight', () => {
  let sandbox;

  // The label we want to create segments out of, where each segment
  // can be either highlighted or non-highlighted.
  let label;

  beforeEach(() => {
    label = 'ABCDEFGHIJKLMNOPQRSTUVW';
  });

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.reset();
  });

  after(() => {
    sandbox.restore();
  });

  it('should return expected segments for one highlighted range only', () => {
    const ranges = [{ qCharPos: 1, qCharCount: 4 }];
    expect(getSegmentsFromRanges(label, ranges)).to.deep.equal([
      ['A', false],
      ['BCDE', true],
      ['FGHIJKLMNOPQRSTUVW', false],
    ]);
  });
  it('should return expected segment for a range starting with 0', () => {
    const ranges = [{ qCharPos: 0, qCharCount: 5 }];
    expect(getSegmentsFromRanges(label, ranges)).to.deep.equal([
      ['ABCDE', true],
      ['FGHIJKLMNOPQRSTUVW', false],
    ]);
  });

  it('should return expected segments for two highlighted ranges', () => {
    const ranges = [
      { qCharPos: 1, qCharCount: 4 },
      { qCharPos: 7, qCharCount: 10 },
    ];
    expect(getSegmentsFromRanges(label, ranges)).to.deep.equal([
      ['A', false],
      ['BCDE', true],
      ['FG', false],
      ['HIJKLMNOPQ', true],
      ['RSTUVW', false],
    ]);
  });

  it('should return expected segments for many highlighted ranges', () => {
    const ranges = [
      { qCharPos: 1, qCharCount: 4 },
      { qCharPos: 6, qCharCount: 3 },
      { qCharPos: 12, qCharCount: 2 },
    ];
    expect(getSegmentsFromRanges(label, ranges)).to.deep.equal([
      ['A', false],
      ['BCDE', true],
      ['F', false],
      ['GHI', true],
      ['JKL', false],
      ['MN', true],
      ['OPQRSTUVW', false],
    ]);
  });

  it('should return expected segments for many highlighted ranges starting with 0', () => {
    const ranges = [
      { qCharPos: 0, qCharCount: 5 },
      { qCharPos: 6, qCharCount: 3 },
      { qCharPos: 12, qCharCount: 2 },
    ];
    expect(getSegmentsFromRanges(label, ranges)).to.deep.equal([
      ['ABCDE', true],
      ['F', false],
      ['GHI', true],
      ['JKL', false],
      ['MN', true],
      ['OPQRSTUVW', false],
    ]);
  });

  it('should return expected segments when highlighting until the end of a label', () => {
    const ranges = [
      { qCharPos: 6, qCharCount: 3 },
      { qCharPos: 12, qCharCount: 11 },
    ];
    expect(getSegmentsFromRanges(label, ranges)).to.deep.equal([
      ['ABCDEF', false],
      ['GHI', true],
      ['JKL', false],
      ['MNOPQRSTUVW', true],
    ]);
  });
});
