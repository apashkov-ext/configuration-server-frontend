import { describe, it } from 'mocha';
import { expect } from 'chai';
import { TemplateParser } from '@/components/config-editor/option-group-view/template-parsing/template-parser';
import { OptionValueType } from '@/types/option-value-type.enum';

describe('parse boolean', () => {
    describe('should return correct parsing result', () => {
        it('result should be not null', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:true');
    
            expect(result).not.null;
        });

        it('isGroup should be false', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:true');
    
            expect(result?.isGroup).false;
        });

        it('type should be equal to boolean', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:true');
    
            expect(result?.type).eq(OptionValueType.Boolean);
        });

        it('name should be not empty', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:true');
    
            expect(result?.name).not.null;
        });

        it('value should be not empty', () => {
            const parser = new TemplateParser();
            const result = parser.parse('prop:true');
    
            expect(result?.value).is.of('boolean');
        });
    })
})