<template>
    <v-data-table
      :headers="headers"
      :items="todos"
      :sort-by="[{ key: 'created', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>My TODO LISTS</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">NEW ITEM</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="6"
                    >
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      xs="12"
                      lg="6"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- eslint-disable-next-line vue/valid-v-slot -->
      <template v-slot:item.actions="{ item }">
        <v-btn size="small" @click="detail(item)">Details</v-btn>
      </template>
    </v-data-table>
  </template>

<script>

import { VDataTable } from 'vuetify/labs/VDataTable'
import { getTodoList, addTodoList } from "../services/todoListService"
 
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
      {
            title: 'ID',
            align: 'start',
            sortable: false,
            key: 'id',
        },
        {
            title: 'Todo title',
            sortable: false,
            key: 'title',
        },
        { 
            title: 'Description',
            key: 'description' ,
            sortable: false,
        },
        { 
            title: 'Created date',
            key: 'creationDate' ,
        },
        { title: 'Details', sortable: false, key: 'actions' }
      ],
      todos: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        description: '',
        created: ''
      },
      defaultItem: {
        title: '',
        description: '',
        created: ''
      },
    }),
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    async mounted () {
      this.todos = await getTodoList()
    },
    components: {
    VDataTable,
 },
    methods: {
        detail(item) {
            this.$router.push({name: 'todolist', params: { id: item.columns.id}});
        },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async save () {
        if (this.editedIndex > -1) {
          Object.assign(this.todos[this.editedIndex], this.editedItem)
        } else {
          this.todos.push(await addTodoList(this.editedItem))
        }
        this.close()
      },
    },
  }
</script>

<style>
</style>