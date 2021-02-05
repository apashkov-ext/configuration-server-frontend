import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionView from '../option-view/option-view.vue'
import NewItem from '@/components/new-item.vue'
import ExpandableCodeGroup from '../expandable-code-group/expandable-code-group.vue'
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { PropInject } from 'di-corate';
import { OptionGroupsApi } from './option-group-api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BusyOverlay } from '@/core/busy-overlay';
import { TemplateParser } from './template-parsing/template-parser';
import { OptionValueType } from '@/types/option-value-type.enum';
import { OptionsApi } from '../option-view/options-api';
import { OptionDto } from '@/types/dto/option-dto';

@Component({
    components: { OptionView, NewItem, ExpandableCodeGroup }
})
export class OptionGroupView extends Vue {
    private unsubscribe = new Subject();

    @Prop() content!: OptionGroupDto;
    @PropInject(OptionGroupsApi) private readonly api!: OptionGroupsApi;
    @PropInject(OptionsApi) private readonly optionsApi!: OptionsApi;
    @PropInject('BusyOverlay') private readonly busy!: BusyOverlay;

    add(template: string) {
        const result = new TemplateParser().parse(template);
        if (!result) {
            return;
        }

        if (result.isGroup) {
            this.addNested(result.name);
        } else if (result.type !== undefined) {
            this.addProperty(result.name, result.value, result.type);
        }
    }

    addNested(name: string) {
        this.busy.showBusy();
        this.api.create(this.content.id, name);
    }

    addProperty(name: string, value: any, type: OptionValueType) {
        this.busy.showBusy();
        this.optionsApi.create(this.content.id, name, '', value, type);
    }

    changeGroupName(e: string) {
        this.content.name = e;
    }

    created() {
        this.api.created.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
            this.content.nestedGroups.push(<OptionGroupDto>{
                id: x.id,
                name: x.name,
                description: x.description,
                nestedGroups: [],
                options: []
            });
            this.busy.hideBusy();
        });

        this.api.updated.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
            this.content.name = x.name;
            this.content.description = x.description;
            this.busy.hideBusy();
        });

        this.optionsApi.created.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
            this.content.options.push(<OptionDto>{
                id: x.id,
                name: x.name,
                description: x.description,
                value: x.value,
                type: x.type
            });
            this.busy.hideBusy();
        });
    }

    beforeDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }
}