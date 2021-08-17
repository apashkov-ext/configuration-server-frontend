import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/domain/option-value-type.enum';

describe('parse number', () => {

    it('result should be not null', () => {
        const result = new TemplateParser().parse('prop:3');
        assert.isNotNull(result)
    });

    it('type should be equal to number', () => {
        const result = new TemplateParser().parse('prop:3');
        assert.equal(OptionValueType.Number, result?.type)
    });

    it('name should be equal to "prop"', () => {
        const result = new TemplateParser().parse('prop:3');
        assert.equal('prop', result?.name)
    });

    describe('value should be of number type', () => {

        it('prop:3', () => {
            const result = new TemplateParser().parse('prop:3');
            assert.typeOf(result?.value, 'number')
        });

        it('prop:34343434', () => {
            const result = new TemplateParser().parse('prop:3434343');
            assert.typeOf(result?.value, 'number')
        });

        it('" prop : 3 "', () => {
            const result = new TemplateParser().parse(' prop : 3 ');
            assert.typeOf(result?.value, 'number')
        });

    })

});
