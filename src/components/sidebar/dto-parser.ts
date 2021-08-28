import { ProjectDto, EnvironmentDto, OptionGroupDto, OptionDto } from '@/types/dto';
import { Project, Environment, OptionGroup, Option } from '@/domain';

export class DtoParser {
  static toProject(dto: ProjectDto): Project {
    const envs = dto.environments.map(DtoParser.toEnvironment);
    const p = new Project(dto.id, dto.name, envs);
    return p;
  }

  static toEnvironment(dto: EnvironmentDto): Environment {
    const group = DtoParser.toOptionGroup(dto.optionGroup);
    const e = new Environment(dto.id, dto.projectId, dto.name, group);
    return e;
  }

  static toOptionGroup(dto: OptionGroupDto): OptionGroup {
    const options = dto.options.map(DtoParser.toOption);
    const nested = dto.nestedGroups.map(DtoParser.toOptionGroup);
    const group = new OptionGroup(dto.id, dto.name, dto.description, options, nested, dto.root);
    return group;
  }

  static toOption(dto: OptionDto): Option {
    const o = new Option(dto.id, dto.name, dto.description, dto.value, dto.type);
    return o;
  }
}
