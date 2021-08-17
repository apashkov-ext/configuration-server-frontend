import { assert } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/domain/option-value-type.enum';

describe('parse string array', () => {

    it('result should be not null', () => {
        const result = new TemplateParser().parse("arr:['elem']");
        assert.isNotNull(result);
    });

    it('type should be equal to string array', () => {
        const result = new TemplateParser().parse("arr:['elem']");
        assert.equal(OptionValueType.StringArray, result?.type);
    });

    it('name should be correct', () => {
        const result = new TemplateParser().parse("arr:['elem']");
        assert.equal('arr', result?.name);
    });

    it('result should be undefined', () => {
        const result = new TemplateParser().parse("arr:['']");
        assert.isUndefined(result);
    });

    describe('value should be correct', () => {

        it("arr:['elem']", () => {
            const result = new TemplateParser().parse("arr:['elem']");
            assert.isArray(result?.value);
            assert.includeDeepOrderedMembers(['elem'], result?.value);
        });

    })

});
