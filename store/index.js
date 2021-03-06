import Vuex from "vuex";
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },

    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        const url = 'https://nuxt-udemy-be152-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
        return axios.get(url)
        .then(response => {
          const postsArray = []
          for (const key in response.data) {
            postsArray.push({ ...response.data[key], id: key })
          }
          vuexContext.commit('setPosts', postsArray)
        })
        .catch(error => context.error(error))
         
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
    },
    
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      },
    },
  });
};

export default createStore;
