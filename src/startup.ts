import { addSingletone } from 'di-corate';
import { register } from 'di-corate/lib/registry';
import { OptionGroupsApi } from './components/config-editor/option-group-view/option-group-api';
import { ProjectsApi } from './components/sidebar/projects-api';
import { BusyOverlay } from './core/busy-overlay';
import { HttpClient } from './core/http-client';
import { Toastr } from './core/toastr';

register(HttpClient);
register(ProjectsApi);
register(OptionGroupsApi);
addSingletone('Toastr', Toastr);
addSingletone('BusyOverlay', BusyOverlay);