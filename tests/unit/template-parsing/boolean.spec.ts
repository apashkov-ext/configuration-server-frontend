import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/types/option-value-type.enum';

describe('parse boolean', () => {

  describe('should return correct parsing result', () => {

    it('result should be not null', () => {
      const parser = new TemplateParser();
      const result = parser.parse('prop:true');
      assert.isNotNull(result);
    });

    it('type should be equal to OptionValueType.Boolean', () => {
      const parser = new TemplateParser();
      const result = parser.parse('prop:true');
      assert.equal(OptionValueType.Boolean, result?.type);
    });

    it('name should be equal to "prop"', () => {
      const parser = new TemplateParser();
      const result = parser.parse('prop:true');
      assert.equal('prop', result?.name);
    });


    describe('value should be of boolean type', () => {

      it('prop:true', () => {
        const parser = new TemplateParser();
        const result = parser.parse('prop:true');
        assert.typeOf(result?.value, 'boolean')
      });

      it('prop:True', () => {
        const parser = new TemplateParser();
        const result = parser.parse('prop:True');
        assert.typeOf(result?.value, 'boolean')
      });

      it('prop:false', () => {
        const parser = new TemplateParser();
        const result = parser.parse('prop:false');
        assert.typeOf(result?.value, 'boolean')
      });

      it('prop:False', () => {
        const parser = new TemplateParser();
        const result = parser.parse('prop:False');
        assert.typeOf(result?.value, 'boolean')
      });

      it(' prop : true ', () => {
        const parser = new TemplateParser();
        const result = parser.parse(' prop : true ');
        assert.typeOf(result?.value, 'boolean')
      });

      it(' prop : false ', () => {
        const parser = new TemplateParser();
        const result = parser.parse(' prop : false ');
        assert.typeOf(result?.value, 'boolean')
      });

    })

  });

});
