import { Vue, Prop } from 'vue-property-decorator';

export class ComponentWithData<T extends {}> extends Vue {
  @Prop() data!: T;

  private _backup!: T;

  protected backup() {
    this._backup = Object.assign({}, this.data);
  }

  protected rollback() {
    Object.assign(this.data, this._backup);
  }
}
