<template>
  <div class="mt-4">
    <h2 class="text-center">Список Заявок</h2> <!-- Изменим заголовок h2 и добавим центрирование -->
    <div class="d-flex justify-center  ">
      <v-layout  class="col-xs-12 col-sm-12 col-md-12 ">
        <v-flex >
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr >
                <th class="text-left" v-for="(head,index) in headers" :key="index">
                  {{ head.text }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="(item,index) in tableList"
                  :key="index"
              >

                <td>{{ item.id }}</td>
                <td>{{ item.first_name }}</td>
                <td>{{ item.last_name }}</td>
                <td>{{ item.phone_number }}</td>
                <td>{{ item.application_text }}</td>
                <td>
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                  <v-icon
                      small
                      @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </td>

              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-flex>

      </v-layout>
    </div>
<!--    <div>
      <paginates collection="tableList"/>
    </div>-->
    <div>
      <router-link to="/"> <!-- Добавляем кнопку "Назад" с использованием Vue Router -->
        <v-btn color="primary">
          Назад
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tableList: [],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        id: '',
      },
      headers: [
        {text: '#',align: 'start',sortable: true,value: 'id'},
        {text: 'Имя',sortable: true,value: 'first_name'},
        { text: 'Фамилия', value: 'last_name' },
        { text: 'Телефон', value: 'phone_number' },
        { text: 'Текст заявки', value: 'application_text' },
        { text: 'Действие', value: 'action' },
      ],

    };
  },
  components: {
  },
  mounted() {
    // Получение списка таблиц из сервера через API
    axios.get('/api/tables')
        .then(response => {
          console.log(response.data)
          this.tableList = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.tableList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      console.log(this.editedItem )

      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.tableList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
      console.log(this.editedItem )
    },
  }
};
</script>
