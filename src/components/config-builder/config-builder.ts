import { OptionDto } from '@/types/dto/option-dto';
import { OptionGroupDto } from '@/types/dto/option-group-dto';
import { Component, Vue, Prop } from 'vue-property-decorator';
import OptionGroupView from './option-group-view/option-group-view.vue'

@Component({
    components: { OptionGroupView }
})
export class ConfigBuilder extends Vue {

    testContent = <OptionGroupDto>{
        nestedGroups: [
            <OptionGroupDto>{
                name: 'propertyObj',
                nestedGroups: [
                    <OptionGroupDto>{
                        name: 'otherProp',
                        options: [
                            <OptionDto>{
                                name: 'variable1',
                                value: 888
                            },
                            <OptionDto>{
                                name: 'var2',
                                value: true
                            }
                        ]
                    }
                ],
                options: [
                    <OptionDto>{
                        name: 'varString',
                        value: 'hello'
                    },
                    <OptionDto>{
                        name: 'varNumb',
                        value: 34
                    }
                ]
            }
        ]
    };
 
}