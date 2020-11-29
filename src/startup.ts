import { addSingletone } from 'di-corate';
import { DefaultConfigsApi } from './core/implementations/default-configs-api';
import { DefaultHttpClient } from './core/implementations/default-http-client';
import { DefaultProjectsApi } from './core/implementations/default-projects-api';
import { DefaultToastr } from './core/implementations/default-toastr';

addSingletone('HttpClient', DefaultHttpClient);
addSingletone('ProjectsApi', DefaultProjectsApi);
addSingletone('ConfigsApi', DefaultConfigsApi);
addSingletone('Toastr', DefaultToastr);