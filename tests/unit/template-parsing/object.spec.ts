import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { ParsedValueType } from '@/components/config-editor/option-group-view/template-parsing/template';

describe('parse object', () => {

    it('result should be not null', () => {
        const result = new TemplateParser().parse('obj:{}');
        assert.isNotNull(result)
    });

    it('type should be equal to ParsedValueType.Object', () => {
        const result = new TemplateParser().parse('obj:{}');
        assert.equal(ParsedValueType.Object, result?.type)
    });

    describe('name should be correct', () => {

        it('obj:{}', () => {
            const result = new TemplateParser().parse('obj:{}');
            assert.equal('obj', result?.name);
        });

        it(' obj : { } ', () => {
            const result = new TemplateParser().parse(' obj : { } ');
            assert.equal('obj', result?.name);
        });

    })

});
