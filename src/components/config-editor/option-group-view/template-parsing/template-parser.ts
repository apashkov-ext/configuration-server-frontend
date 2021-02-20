import { OptionValueType } from '@/types/option-value-type.enum';
import { ParsedValueType, Template } from './template';
import { TemplateParsingResult } from './template-parsing-result';

const splitter = /,'s*/;
const searchValue = /'|,$/g;

function replacer(val: string): string {
  return val.replace("''", ',').replace(searchValue, '').trim();
}

export class TemplateParser {
  private static templates: Template[] = [
    {
      regexp: new RegExp('^(?<propName>[a-z]+)\\s*:\\s*{\\s*}$', 'i'),
      resultType: ParsedValueType.Object,
      order: 0
    },
    {
      regexp: new RegExp('^(?<propName>[a-z]+)\\s*:\\s*\\[(?<propValue>([\\d]+,?\\s*)+)\\]$', 'i'),
      resultType: OptionValueType.NumberArray,
      order: 1,
      parseValue: val => {
        const modified = val ? replacer(val) : val;
        return modified?.split(splitter).map(m => +m);
      }
    },

    {
      regexp: new RegExp("^(?<propName>[a-z]+)\\s*:\\s*\\[(?<propValue>('[\\w()\\s-_$&#@,.а-я+=;<>!?/\\*:№\"%]+',?\\s*)+)\\]$", 'i'),
      resultType: OptionValueType.StringArray,
      order: 2,
      parseValue: val => {
        const modified = val ? replacer(val) : val;
        return modified?.split(splitter);
      }
    },
    {
      regexp: new RegExp('^(?<propName>[a-z]+)\\s*:\\s*(?<propValue>true|false)$', 'i'),
      resultType: OptionValueType.Boolean,
      order: 3,
      parseValue: val => {
        const modified = val?.toLowerCase();
        return modified === 'true' ? true : false;
      }
    },
    {
      regexp: new RegExp('^(?<propName>[a-z]+)\\s*:\\s*(?<propValue>\\d+)', 'i'),
      resultType: OptionValueType.Number,
      order: 4,
      parseValue: val => !val ? 0 : +val
    },
    {
      regexp: new RegExp('^(?<propName>[a-z]+)\\s*:\\s*(?<propValue>[\\w()\\s-_$&#@,.а-я+=;<>!?/\\*:№"%]+)$', 'i'),
      resultType: OptionValueType.String,
      order: 5,
      parseValue: val => val?.trim()
    }
  ];

  parse(input: string): TemplateParsingResult | undefined {
    const trimmed = (input || '').trim();
    const sorted = TemplateParser.templates.sort((l, r) => l.order === r.order ? 0 : l.order > r.order ? 1 : -1);

    for (let i = 0; i < sorted.length; i++) {
      const res = this.getResult(trimmed, sorted[i]);
      if (res !== undefined) {
        return res;
      }
    }

    return undefined;
  }

  private getResult(input: string, tmp: Template): TemplateParsingResult | undefined {
    if (!tmp.regexp.test(input)) {
      return undefined;
    }

    const groups = tmp.regexp.exec(input)?.groups;
    const name = groups?.propName;
    if (!name) {
      return undefined;
    }

    const str = groups?.propValue;
    const value = tmp.parseValue ? tmp.parseValue(str) : str;

    return {
      name,
      value,
      type: tmp.resultType
    };
  }
}
