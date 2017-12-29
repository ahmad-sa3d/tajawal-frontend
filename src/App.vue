<template>
  <v-app>
    <v-navigation-drawer
      fixed
      v-model="drawer"
      float
      app
      disable-resize-watcher
      temporary
    >
      <v-container>
        <v-layout column align-center justify-center>
          <v-flex>
            <h2 class="info--text">Tajawal Hotels</h2>
          </v-flex>
          <v-flex
            <v-avatar size="80px" tile>
              <img src="/static/tajawal.svg" alt="">
            </v-avatar>
          </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-list expand>
        <template
          v-for="item in items"
        >
            <v-list-tile :to="item.to" @click="" :key="item.title" :exact="item.exact" ripple>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

        </template>
        </v-list>
    </v-navigation-drawer>

      
    <v-toolbar fixed app dark class="info">
      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>

      <v-toolbar-title>
        <v-avatar
          size="32px"
          tile
        >
            <img src="/static/tajawal.svg" alt="">
        </v-avatar>
          {{ title }} - {{ config.version }}
      </v-toolbar-title>
      <v-avatar>
        <v-progress-circular
        indeterminate
        color="white"
        v-if="loading"
        ></v-progress-circular>
      </v-avatar>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in items" :key="item.title" :to="item.to" :exact="item.exact" flat>
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
        <notifications
          animation-type="velocity"
          position="bottom right"
          :duration="-1000"
          group="axios"
        />
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
    </v-content>
    
    <v-footer style="border-top: 1px solid #dcdcdc;">
        <v-layout>
          <v-flex xs12 class="ml-2 mr-2">
            <v-avatar size="20px" tile>
              <img src="/static/tajawal.svg" alt="">
            </v-avatar>
            <span>&copy; 2017</span>
          </v-flex>
        </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import { config } from './config'
  export default {
    data () {
      return {
        config: config,
        drawer: false,
        items: [
          {
            icon: 'home',
            title: 'Home',
            to: {name: 'home'},
            exact: true
          },
          {
            icon: 'hotel',
            title: 'Hotels',
            to: {name: 'hotels'},
            exact: false
          },
        ],
        title: 'Tajawal Hotels'
      }
    },

    computed: {
      loading () {
        return this.$store.getters['appStatus/isLoading'];
      }
    },

    created () {
      // this.$store.commit('setLoading', true);
    },

    mounted () {
      
    }
  }
</script>
