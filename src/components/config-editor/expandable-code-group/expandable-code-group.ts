import { Component, Prop, Vue } from 'vue-property-decorator';
import PropertyName from '@/components/config-editor/property-name/property-name.vue';

@Component({
    components: { PropertyName }
})
export class ExpandableCodeGroup extends Vue {
    @Prop() name!: string;
    @Prop() openBracket!: string;
    @Prop() closeBracket!: string;

    expanded = true;

    changePropName(e: string) {
        this.$emit('changePropName', e);
    }
}