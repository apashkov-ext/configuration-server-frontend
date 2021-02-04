import { addSingletone } from 'di-corate';
import { register } from 'di-corate/lib/registry';
import { ProjectsApi } from './components/sidebar/projects-api';
import { BusyOverlay } from './core/busy-overlay';
import { HttpClient } from './core/http-client';
import { Toastr } from './core/toastr';

register(HttpClient);
register(ProjectsApi);
addSingletone('Toastr', Toastr);
addSingletone('BusyOverlay', BusyOverlay);