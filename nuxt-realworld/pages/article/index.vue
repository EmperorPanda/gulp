<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>How to build webapps that scale</h1>
        <UserCard :article="article" />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>
      <hr />
      <div class="article-actions">
        <UserCard :article="article" />
      </div>

      <Commit :article="article" />
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { getArticle } from "@/api/article"
import UserCard from "./usercard"
import Commit from "./commit"
export default {
  middleware: 'authenticated',
  async asyncData({ params }) {
    const { data: { article={ author: {}} } } = await getArticle(params.slug);
    let md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  components: {
    UserCard,
    Commit,
  },
  head() {
    return {
      title: `${this.article.title} - realworld`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
