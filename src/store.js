import Vue from 'vue';
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

const store = new Vuex.Store({
    tate: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

export default store
