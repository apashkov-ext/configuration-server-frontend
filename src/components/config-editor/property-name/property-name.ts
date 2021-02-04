import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export class PropertyName extends Vue {
    @Prop() value!: string;
}