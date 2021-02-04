import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export class ExpandableCodeGroup extends Vue {
    @Prop() name!: string;
    @Prop() openBracket!: string;
    @Prop() closeBracket!: string;

    expanded = true;
}