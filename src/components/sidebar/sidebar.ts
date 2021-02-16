import { Component, Vue } from 'vue-property-decorator';
import NewItem from '@/components/new-item.vue';
import { ProjectDto } from '@/types/dto/project-dto';
import { Inject } from 'di-corate';
import { ProjectsApi } from './projects-api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BusyOverlay } from '@/core/busy-overlay';
import { EnvironmentDto } from '@/types/dto/environment-dto';

@Component({
  components: { NewItem }
})
export class Sidebar extends Vue {
  private unsubscribe = new Subject();

  @Inject(BusyOverlay) private readonly busy!: BusyOverlay;
  @Inject(ProjectsApi) private readonly projectsApi!: ProjectsApi;

  projects = new Array<ProjectDto>();

  createProject(name: string) {}

  deleteProject(p: ProjectDto) {}

  selectEnv(env: EnvironmentDto) {
    this.$emit('selectEnv', { env });
  }

  addEnv(p: ProjectDto, envName: string) {}

  removeEnv(env: EnvironmentDto) {}

  created() {
    this.projectsApi.projectsRetrieved
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(p => {
        this.projects = p;
        this.busy.hideBusy();
      });
  }

  beforeDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  mounted() {
    this.projectsApi.retrieveProjects();
  }
}
