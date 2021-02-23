import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export class ConfigPreview extends Vue {
  @Prop() data!: string;

  get rows() {
    return (this.data.match(/\n/g) || '').length + 1;
  }
}
