<template>
  <v-app >
    <v-container class="fill-height">
      <v-layout align-center justify-center>
        <v-flex md4  class="d-flex justify-center">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Форма для заявки</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form
                  v-model="valid" ref="form" validation
              >
                <v-text-field
                    name="first_name"
                    label="Имя"
                    type="text"
                    v-model="formData.first_name"
                    :rules="nameRules"

                ></v-text-field>
                <v-text-field
                    name="last_name"
                    label="Фамилия"
                    type="text"
                    v-model="formData.last_name"
                    :rules="nameRules"

                ></v-text-field>
                <v-text-field
                    name="phone_number"
                    label="Телефон"
                    type="text"
                    v-model="formData.phone_number"
                    :rules="phoneRules"
                ></v-text-field>
                <v-textarea
                    outlined
                    name="application_text"
                    label="Текст заявки"
                    v-model="formData.application_text"
                    :rules="textRules"

                ></v-textarea>

              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  @click.prevent="goToTableList"
              >Список
              </v-btn>
              <v-btn
                  color="primary"
                  @click.prevent="submitForm"
                  :disabled="!valid"
              >Отправить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    <v-snackbar
        v-model="snackbar"
        color="red accent-2"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import axios from 'axios'

export default {

  data () {
    return {
      valid: false,
      snackbar: false,
      text: `Hello, I'm a snackbar`,
      formData: {
        first_name: '',
        last_name: '',
        phone_number: '',
        application_text: '',
      },
    }
  },
  methods: {
    submitForm() {
      // Отправка данных на сервер через API
      axios.post('/api/applications', this.formData)
          .then(response => {
            // Обработка успешного ответа
            console.log(response.data.message)
          })
          .catch(error => {
            // Обработка ошибки
            if (error.response.status === 400 && error.response.data.errors) {
              const errorMessages = error.response.data.errors;
              let errorMessage = '';

              for (const field in errorMessages) {
                // eslint-disable-next-line no-prototype-builtins
                if (errorMessages.hasOwnProperty(field)) {
                  errorMessage += `Поле ${field}: ${errorMessages[field].join(', ')}\n`;
                }
              }

              this.text = errorMessage;
              this.snackbar =true

            } else {
              this.text = 'Не удалось отправить форму. Пожалуйста, попробуйте позже.';
              this.snackbar = true

            }
          });
    },
    goToTableList() {
      this.$router.push('/table-list'); // Переход на страницу '/table-list'
    },
  },
  computed: {
    nameRules () {
      return [
        (v) => !!v || 'Поле обязательно для заполнения',
      ];
    },
    phoneRules () {
      return [
        (v) => !!v || 'Поле обязательно для заполнения',
        (v) => /^\d+$/.test(v) || 'Введите корректный номер телефона',
      ];
    },
    textRules () {
      return [
        (v) => !!v || 'Поле обязательно для заполнения',
      ];
    },
  }
}
</script>
