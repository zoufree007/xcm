export default function(data) {
  this.$store.Meta.commit('knock_knock', data.data);
  return Promise.all([
    this.$storage.user.set('knock_knock', data.data),
  ])
}