import { OptionDto } from '@/types/dto/option-dto';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { OptionValueType } from '@/types/option-value-type.enum';
import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionGroupView from './option-group-view/option-group-view.vue'

@Component({
    components: { OptionGroupView }
})
export class ConfigEditor extends Vue {
    @Prop() content!: OptionGroupDto;

    // testContent = <OptionGroupDto>{
    //     nestedGroups: [
    //         <OptionGroupDto>{
    //             name: 'propertyObj',
    //             nestedGroups: [
    //                 <OptionGroupDto>{
    //                     name: 'otherProp',
    //                     options: [
    //                         <OptionDto>{
    //                             name: 'variable1',
    //                             value: 888,
    //                             type: OptionValueType.Number
    //                         },
    //                         <OptionDto>{
    //                             name: 'var2',
    //                             value: true,
    //                             type: OptionValueType.Boolean
    //                         }
    //                     ]
    //                 }
    //             ],
    //             options: [
    //                 <OptionDto>{
    //                     name: 'varString',
    //                     value: 'hello',
    //                     type: OptionValueType.String
    //                 },
    //                 <OptionDto>{
    //                     name: 'varNumb',
    //                     value: 34,
    //                     type: OptionValueType.Number
    //                 }
    //             ]
    //         }
    //     ]
    // };
 
}