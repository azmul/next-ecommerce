declare module "redux-multilanguage";
declare module 'uuid/v4';

declare global {
    interface Window { MyNamespace: any; }
  }
  
window.MyNamespace = window.MyNamespace || {};

