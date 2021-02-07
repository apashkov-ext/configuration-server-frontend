import { Component, Prop, Vue } from 'vue-property-decorator';
import EditableLabel from '@/components/editable-label/editable-label.vue';

@Component({
    components: { EditableLabel }
})
export class ExpandableCodeGroup extends Vue {
    @Prop() name!: string;
    @Prop() openBracket!: string;
    @Prop() closeBracket!: string;
    @Prop() tooltip!: string;

    expanded = true;

    changeName(e: string) {
        this.$emit('changeName', e);
    }
}