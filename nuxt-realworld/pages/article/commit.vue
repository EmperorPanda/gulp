<template>
  <div>
    <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write nuxt-link comment..."
                rows="3"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                src="http://i.imgur.com/Qr71crq.jpg"
                class="comment-author-img"
              />
              <button class="btn btn-sm btn-primary">Post Comment</button>
            </div>
          </form>

          <div class="card" v-for="commit in comments" :key="commit.id">
            <div class="card-block">
              <p class="card-text">
                {{commit.body}}
              </p>
            </div>
            <div class="card-footer">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: commit.author.username
                }
              }" class="comment-author">
                <img
                  :src="commit.author.image"
                  class="comment-author-img"
                />
              </nuxt-link>
              &nbsp;
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: commit.author.username
                }
              }" class="comment-author">{{ commit.author.username }}</nuxt-link>
              <span class="date-posted">{{ commit.updatedAt | date('MMM DD,YYYY')}}</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getComments } from "@/api/article"
export default {
 props: {
    article: {
      type: Object,
      required: true,
    }
  },
  data () {
    return {
      comments: [],
    }
  },
  async mounted() {
    const { data: { comments } } = await getComments(this.article.slug);
   console.log(comments,89)
    this.comments = comments
  },
};
</script>

<style lang="scss" scoped>
</style>