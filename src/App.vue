<template>
  <v-app>
    <v-toolbar
        app
        color="blue"
        dark
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
        <span>抽奖系统</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat
               v-for="item in items"
               :key="item.title"
               @click="go(item.link)">{{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              抽奖系统
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense class="pt-0">
        <v-list-tile
            v-for="item in items"
            :key="item.title"
            @click="go(item.link)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import NavItem from '@/interfaces/NavItem';

  @Component({
    name: 'App',
    components: {},
  })
  export default class App extends Vue {
    private drawer: boolean = false;
    private items: NavItem[] = [
      {title: '主页', icon: 'dashboard', link: '/'},
      {title: '记录', icon: 'list', link: '/result'},
      {title: '设置', icon: 'settings', link: '/settings'},
      {title: '关于', icon: 'question_answer', link: '/about'},
    ];

    private go(link: string) {
      this.$router.push(link);
    }
  }
</script>
