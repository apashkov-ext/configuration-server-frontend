import { Component, Vue, Prop } from 'vue-property-decorator';
import { DataView } from '@/types/data-view';
import { ChangeConfigEvent } from '@/types/events/change-config-event';

@Component
export class ContentEditor extends Vue {
  @Prop() data!: DataView;
  @Prop() busy!: boolean;
  @Prop() disabled!: boolean;

  get label(): string {
    const projName = this.data.projectName || '';
    if (this.data.configName) {
      return `${projName} (${this.data.configName})`
    }
    return `${projName} (default)`;
  }

  temp = this.data.content;
  editorMode = false;

  edit() {
    this.temp = this.data.content;
    this.editorMode = true;
  }

  cancel() {
    this.temp = this.data.content;
    this.editorMode = false;
  }

  commit(val: string) {
    if (this.data.content === val) {
      return;
    }
    this.$emit('onChange', <ChangeConfigEvent>{ projectName: this.data.projectName, configName: this.data.configName, data: val });
    this.editorMode = false;
  }

  handleInput(val: string) {
    this.temp = val;
  }
}