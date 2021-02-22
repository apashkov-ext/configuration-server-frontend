import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionGroupView from './option-group-view/option-group-view.vue';
import ConfigPreview from './config-preview/config-preview.vue';
import { EnvironmentDto } from '@/types/dto/environment-dto';
import { OptionGroupDto } from '@/types/dto/option-group-dto';

@Component({
  components: { ConfigPreview, OptionGroupView }
})
export class ConfigEditor extends Vue {
  @Prop() data!: EnvironmentDto;

  get preview() {
    return this.getPreview(this.data.optionGroup);
  }

  update(e: OptionGroupDto) {
    this.data.optionGroup = e;
  }

  private getPreview(input: OptionGroupDto): string {
    return JSON.stringify(ConfigEditor.convertOptionGroup(input), null, '\t');
  }

  private static convertOptionGroup(input: OptionGroupDto): any {
    const output = {} as any;

    const options = input.options;
    for (let i = 0; i < options.length; i++) {
      const o = options[i];
      output[ConfigEditor.toLowerCamelCase(o.name)] = o.value;
    }

    const groups = input.nestedGroups;
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      output[ConfigEditor.toLowerCamelCase(g.name)] = ConfigEditor.convertOptionGroup(g);
    }

    return output;
  }

  private static toLowerCamelCase(inp: string): string {
    return inp && `${inp[0].toLowerCase()}${inp.substr(1)}` || '';
  }

  download() {
    this.downloadString(this.preview, 'application/json', `config.${this.data.name}.json`);
  }

  importConfig() {

  }

  /**
   * Example: // downloadString("a,b,c\n1,2,3", "text/csv", "myCSV.csv")
   * @param content String to download.
   * @param fileType Mime-type.
   * @param fileName Filename.
   */
  private downloadString(content: string, fileType: string, fileName: string) {
    const blob = new Blob([content], { type: fileType });
    const a = document.createElement('a');
    a.download = fileName;
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }
}
