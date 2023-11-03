 <template>
  <div class="text-center">
    <v-pagination
        v-model="currentPage"
        :length="lastPage"
        :total-visible="15"
    >

    </v-pagination>
  </div>
</template>

<script>

export default {
  props: ['collection'],
  watch: {
    currentPage(newVal ){
      this.paginatePage( newVal)
    }
  },

    computed: {
      currentPage: {
       get() {

        return this.$store.state[this.store][this.collection].current_page;
      },
      set(value) {
        this.$store.commit( 'setCurrentPage', value );
      }
    },
      lastPage: {
      get() {
        return this.$store.state[this.store][this.collection].last_page;
      }
    }
  },
  mutations: {},
  actions: {},
  methods: {
    paginatePage( pageNumber) {
      this.$store.dispatch('get_'+[this.collection]+'_list', pageNumber)
    }
  },


}
</script>

<style scoped>

</style>
