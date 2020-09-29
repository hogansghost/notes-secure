import { bem } from './bem';

describe('bem (util)', () => {
  it('outputs an empty string if nothing is passed', () => {
    expect(bem()).toEqual('');
  });

  it('outputs the base class name only if anything other than an object of array of strings is passed as a modifier', () => {
    expect(bem('resident-evil')).toEqual('resident-evil');
    expect(bem('resident-evil', () => {})).toEqual('resident-evil');
  });

  it('outputs the base class name only if an empty array of modifier names', () => {
    expect(bem('resident-evil', [])).toEqual('resident-evil');
  });

  it('appends a single modifier class with a passed array of modifier names', () => {
    expect(bem('resident-evil', ['two-remake'])).toEqual('resident-evil resident-evil--two-remake');
  });

  it('appends multiple modifier classes with a passed array of modifier names', () => {
    expect(bem('resident-evil', ['two-remake', 'villiage'])).toEqual('resident-evil resident-evil--two-remake resident-evil--villiage');
  });

  it('appends a single modifier class based on the object keyname if it\s value is true', () => {
    expect(bem('resident-evil', { twoRemake: true, villiage: false })).toEqual('resident-evil resident-evil--two-remake');
  });
});
