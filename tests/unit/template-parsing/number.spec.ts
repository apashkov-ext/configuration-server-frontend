import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/types/option-value-type.enum';

describe('parse number', () => {

    describe('should return correct parsing result', () => {

        it('result should be not null', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:3');
            assert.isNotNull(result)
        });

        it('type should be equal to number', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:3');
            assert.equal(OptionValueType.Number, result?.type)
        });

        it('name should be equal to "prop"', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:3');
            assert.equal('prop', result?.name)
        });

        describe('value should be of number type', () => {

            it('prop:3', (val) => {
                const parser = new TemplateParser();
                const result = parser.parse('prop:3');
                assert.typeOf(result?.value, 'number')
            });

            it('prop:34343434', (val) => {
                const parser = new TemplateParser();
                const result = parser.parse('prop:34343434');
                assert.typeOf(result?.value, 'number')
            });

            it(' prop : 3 ', (val) => {
                const parser = new TemplateParser();
                const result = parser.parse(' prop : 3 ');
                assert.typeOf(result?.value, 'number')
            });

        })

    });

});
