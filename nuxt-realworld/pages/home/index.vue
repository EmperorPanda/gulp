<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="this.user">
                <nuxt-link exact class="nav-link disabled" :class="{active: tab === 'fel'}" :to="{
                  name: 'home',
                  query: {
                    tab: 'fel',
                    page,
                  }
                }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link exact class="nav-link" :class="{active: !tab}" :to="{
                  name: 'home',
                  query: {
                    tab: '',
                    page,
                  }
                }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link exact class="nav-link " :class="{active: tab === 'tag'}"
                  :to="{
                    name: 'home',
                    query: {
                      tab: 'tag',
                      tag: tag
                    }
                }">#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div v-for="act in articles" :key="act.slug" class="article-preview">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  query: act.author.username,
                }"
              >
                <img :src="act.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                  class="author"
                  :to="{
                    name: 'profile',
                    query: act.author.username,
                  }"
                >
                  {{ act.author.username }}
                </nuxt-link>
                <span class="date">{{ act.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: act.favorited }"
                @click="onChangeP(act)"
              >
                <i class="ion-heart"></i> {{ act.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: { slug: act.slug }
              }"
            >
              <h1>{{ act.title }}</h1>
              <p>{{ act.body }}</p>
              <nuxt-link
                class="preview-link"
                :to="{
                  name: 'article',
                  slug: act.slug,
                }"
                >Read more...
              </nuxt-link>
            </nuxt-link>
          </div>
          <nav>
            <ul class="pagination ng-isolate-scope">
              <li class="page-item" :class="{ active: item == page}" v-for="item in getnumber" :key="item">
                <nuxt-link
                  class="page-link"
                  :to="{
                    name:'home',
                    query: {
                      page: item
                    }
                  }"
                >{{item}}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link
                v-for="tag in tags"
                :key="tag"
                class="tag-pill tag-default"
                :to="{
                  name: 'home',
                  query: {
                    tag,
                    tab: 'tag',
                  }
                }"
                >{{ tag }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, getTags, deleteFavorite, getArticlesFeed, favorite } from "@/api/home";
import { mapState } from 'vuex'
export default {
  watchQuery: ["page", 'tag'],
  data: () => {
    return {
      tag: '',
    }
  },
  async asyncData({ query }) {
    const page = Number.parseInt(query.page || 1);
    const { tab = '', tag } = query
    const limit = 10;
    let func = tab === 'fel'? getArticlesFeed : getList
    const [
      {
        data: { articles, articlesCount },
      },
      {
        data: { tags },
      },
    ] = await Promise.all([
      func({
        page,
        offset: Math.ceil(page - 1) * limit,
        tag,
      }),
      getTags(),
    ]);
    return {
      articles,
      articlesCount,
      page,
      limit,
      tags,
      tag,
      tab
    };
  },
  methods: {
    async onChangeP(item) {
      if (item.favorited) {
        deleteFavorite(item.slug);
        item.favorited = false;
        item.favoritesCount += -1;
      } else {
        favorite(item.slug);
        item.favorited = true;
        item.favoritesCount += 1;
      }
    },
  },
  computed: {
    ...mapState(['user']),
    getnumber () {
      return Math.ceil(this.articlesCount/this.limit)
    },
  }
};
</script>

<style lang="scss" scoped>
</style>