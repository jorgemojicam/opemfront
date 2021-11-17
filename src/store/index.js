import Vue from 'vue';
import Vuex from 'vuex';

// -- Main store modules
import layout from './layout';
import auth from './auth';

// -- Components Store State
import cursos from './logic/cursos'
import certificaciones from './logic/certificaciones'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    auth,
    cursos,
    certificaciones
  },
});
