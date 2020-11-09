// import { DefaultHttpClient } from './services/http-client';

// function bind<T extends any>(serviceFactory: () => Promise<T>, type: new (...args: any[]) => Object) {
//     return {
//         ...Object.keys(type).reduce((prev, method) => {
//             const resolveableMethod = async (...args: any[]) => {
//                 const service = await serviceFactory();
//                 return service[method](...args);
//             };

//             return { ...prev, [method]: resolveableMethod };
//         }, {}),
//     };
// }

// export default {
//     get httpClient() {
//         const userRepositoryPromise = import('@/core/services/http-client');
//         var f = () => userRepositoryPromise;
//         return bind(() => userRepositoryPromise, DefaultHttpClient);
//     }
// };