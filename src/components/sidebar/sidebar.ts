import { Component, Vue } from 'vue-property-decorator';
import NewItem from '@/components/new-item.vue';
import { ProjectDto } from '@/types/dto';
import { Inject } from 'di-corate';
import { ProjectsApi } from './projects-api';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BusyOverlay } from '@/core/busy-overlay';
import { Toastr } from '@/core/toastr';
import { Modals } from '@/core/modals';
import { Project, Environment } from '@/domain';
import { EnvironmentsApi } from './environments-api';
import { DtoParser } from './dto-parser';

@Component({
  components: { NewItem }
})
export class Sidebar extends Vue {
  private unsubscribe = new Subject();

  @Inject(BusyOverlay) private readonly busy!: BusyOverlay;
  @Inject(ProjectsApi) private readonly projectsApi!: ProjectsApi;
  @Inject(EnvironmentsApi) private readonly environmentsApi!: EnvironmentsApi;
  @Inject(Toastr) private readonly toastr!: Toastr;

  projects = new Array<Project>();
  private selectedProject: Project | null = null;

  selectProject(p: Project) {
    this.selectedProject = p;
  }

  createProject(name: string) {
    if (this.projects.find(f => f.name === name)) {
      this.toastr.warn(`Project '${name}' already exists`);
      return;
    }

    this.busy.showBusy();
    this.projectsApi.create(name);
  }

  deleteProject(p: ProjectDto) { 
    Modals.showConfirm('Delete project confirmation', `Are you sure you want to delete project '${p.name}'?`)
      .subscribe(conf => {
        if (!conf) {
          return;
        }
    
        this.busy.showBusy();
        this.projectsApi.deleteProject(p.name);
      });
  }

  addEnv(p: Project, envName: string) { 
    const env = p.environments.filter(f => f.name === envName);
    if (env) {
      this.toastr.warn(`The '${envName}' environment already exists in the '${p.name}' project`);
      return;
    }

    this.busy.showBusy();
    this.environmentsApi.create(envName, p.id);
  }

  removeEnv(env: Environment) { 
    const p = this.projects.filter(f => f.id === env.projectId)[0];
    Modals.showConfirm('Are you sure?', `This will permanently delete the '${env.name}' environment from the '${p.name}' project.`)
      .subscribe(conf => {
        if (!conf) {
          return;
        }
    
        this.busy.showBusy();
        this.environmentsApi.delete(env.id, p.id);
      });
  }

  created() {
    this.projectsApi.projectsRetrieved
      .pipe(map(projs => projs.map(DtoParser.toProject)))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(projs => {
        this.projects = projs;
        this.busy.hideBusy();
      });


    this.projectsApi.created
      .pipe(switchMap(p => {
        return Modals.showNotif(`Use this api key to access the '${p.name}' project configuration`, p.apiKey).pipe(map(() => p))
      }))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(p => {
        this.toastr.success(`Project '${p.name}' was successfully created`);
        this.busy.hideBusy();
      });


    this.projectsApi.deleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(p => {
        if (this.selectedProject?.id === p.id) {
          this.selectedProject = null;
        }
        const proj = this.projects.find(f => f.id === p.id);
        this.projects = this.projects.filter(f => f !== proj);

        this.toastr.success(`The '${proj?.name}' project was successfully deleted`);
        this.busy.hideBusy();
      });


    this.environmentsApi.created
      .pipe(map(DtoParser.toEnvironment))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(e => {
        const project = this.projects.find(f => f.id === e.projectId);
        if (!project) {
          this.projectsApi.retrieveProjects();
          return;
        }

        project.addEnvironment(e);
        this.toastr.success(`Configuration '${e.name}' was successfully added`);
        this.busy.hideBusy();
      });


    this.environmentsApi.deleted
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(e => {
        const project = this.projects.find(f => f.id === e.id);
        if (!project) {
          this.projectsApi.retrieveProjects();
          return;
        }

        const env = project.environments.find(f => f.id === e.id);
        if (!env) {
          this.projectsApi.retrieveProjects();
          return;
        }

        project.removeEnvironment(env);
        this.toastr.success(`The '${env.name}' environment was successfully removed`);
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

