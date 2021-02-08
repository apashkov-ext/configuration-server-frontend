import { OptionValueType } from '@/types/option-value-type.enum';
import { Template } from './template';
import { TemplateParsingResult } from './template-parsing-result';

export class TemplateParser {
  private static templates: Template[] = [
    {
      regexp: new RegExp('^(?<propName>[a-z]+)\\s*:\\s*{\\s*}$', 'i'),
      priority: 0
    },
    {
      regexp: new RegExp(
        '^(?<propName>[a-z]+)\\s*:\\s*\\[(?<propValue>([\\d]+,?\\s*)+)\\]$',
        'i'
      ),
      resultType: OptionValueType.NumberArray,
      priority: 1,
      parseValue: val => {
        const modified = val?.replace("''", ',').replace("'", '');
        return modified?.split(',').map(m => +m);
      }
    },

    {
      regexp: new RegExp(
        "^(?<propName>[a-z]+)\\s*:\\s*\\[(?<propValue>('[\\w()\\s-_$&#@,.а-я+=;<>!?/\\*:№\"%]+',?\\s*)+)\\]$",
        'i'
      ),
      resultType: OptionValueType.StringArray,
      priority: 2,
      parseValue: val => {
        const modified = val?.replace("''", ',').replace("'", '');
        return modified?.split(',').map(m => m.trim());
      }
    },
    {
      regexp: new RegExp(
        '^(?<propName>[a-z]+)\\s*:\\s*(?<propValue>true|false)$',
        'i'
      ),
      resultType: OptionValueType.Boolean,
      priority: 3,
      parseValue: val => {
        const modified = val?.toLowerCase();
        return modified === 'true' ? true : false;
      }
    },
    {
      regexp: new RegExp(
        '^(?<propName>[a-z]+)\\s*:\\s*(?<propValue>\\d+)',
        'i'
      ),
      resultType: OptionValueType.Number,
      priority: 4,
      parseValue: val => {
        return !val ? 0 : +val;
      }
    },
    {
      regexp: new RegExp(
        '^(?<propName>[a-z]+)\\s*:\\s*(?<propValue>[\\w()\\s-_$&#@,.а-я+=;<>!?/\\*:№"%]+)$',
        'i'
      ),
      resultType: OptionValueType.String,
      priority: 5
    }
  ];

  parse(input: string): TemplateParsingResult | undefined {
    const trimmed = (input || '').trim();
    const sorted = TemplateParser.templates.sort((l, r) =>
      l.priority === r.priority ? 0 : l.priority > r.priority ? 1 : -1
    );

    for (let i = 0; i < sorted.length; i++) {
      const res = this.getResult(trimmed, sorted[i]);
      if (res !== undefined) {
        return res;
      }
    }

    return undefined;
  }

  getResult(input: string, tmp: Template): TemplateParsingResult | undefined {
    if (!tmp.regexp.test(input)) {
      return undefined;
    }

    const groups = tmp.regexp.exec(input)?.groups;
    const name = groups?.propName;
    if (!name) {
      return undefined;
    }

    const str = groups?.propValue;
    const value = (tmp.parseValue && tmp.parseValue(str)) || str;

    return {
      name,
      value,
      isGroup: !value,
      type: tmp.resultType
    };
  }
}
