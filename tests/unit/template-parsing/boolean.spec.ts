import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/types/option-value-type.enum';

describe('parse boolean', () => {

  it('result should be not null', () => {
    const result = new TemplateParser().parse('prop:true');
    assert.isNotNull(result);
  });

  it('type should be equal to OptionValueType.Boolean', () => {
    const result = new TemplateParser().parse('prop:true');
    assert.equal(OptionValueType.Boolean, result?.type);
  });

  it('name should be equal to "prop"', () => {
    const result = new TemplateParser().parse('prop:true');
    assert.equal('prop', result?.name);
  });


  describe('value should be of boolean type', () => {

    it('prop:true', () => {

      const result = new TemplateParser().parse('prop:true');
      assert.typeOf(result?.value, 'boolean')
    });

    it('prop:True', () => {

      const result = new TemplateParser().parse('prop:True');
      assert.typeOf(result?.value, 'boolean')
    });

    it('prop:false', () => {

      const result = new TemplateParser().parse('prop:false');
      assert.typeOf(result?.value, 'boolean')
    });

    it('prop:False', () => {

      const result = new TemplateParser().parse('prop:False');
      assert.typeOf(result?.value, 'boolean')
    });

    it('" prop : true "', () => {

      const result = new TemplateParser().parse(' prop : true ');
      assert.typeOf(result?.value, 'boolean')
    });

    it('" prop : false "', () => {

      const result = new TemplateParser().parse(' prop : false ');
      assert.typeOf(result?.value, 'boolean')
    });

  })

});
