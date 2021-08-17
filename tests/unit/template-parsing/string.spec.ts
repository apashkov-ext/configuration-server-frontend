import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/domain/option-value-type.enum';

describe('parse string', () => {

  it('result should be not null', () => {
    const result = new TemplateParser().parse('prop:some string');
    assert.isNotNull(result);
  });

  it('type should be equal to OptionValueType.String', () => {
    const result = new TemplateParser().parse('prop:some string');
    assert.equal(OptionValueType.String, result?.type);
  });

  it('name should be equal to "prop"', () => {
    const result = new TemplateParser().parse('prop:some string');
    assert.equal('prop', result?.name);
  });


  describe('value should be of string type', () => {

    it('prop:some string', () => {
      const result = new TemplateParser().parse('prop:some string');
      assert.typeOf(result?.value, 'string')
    });

    it('prop:some string', () => {
      const result = new TemplateParser().parse('prop:some string');
      assert.typeOf(result?.value, 'string')
    });

  })

  describe('value should be not a string', () => {

    it('prop:{dfd}', () => {
      const result = new TemplateParser().parse('prop:{dfd}');
      assert.isUndefined(result);
    });

    it('prop:[ghg]', () => {
      const result = new TemplateParser().parse('prop:[ghg]');
      assert.isUndefined(result);
    });

  })

});
