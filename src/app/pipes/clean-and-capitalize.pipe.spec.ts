import { CleanAndCapitalizePipe } from './clean-and-capitalize.pipe';

describe('CleanAndCapitalizePipe', () => {
  it('create an instance', () => {
    const pipe = new CleanAndCapitalizePipe();
    expect(pipe).toBeTruthy();
  });
});
