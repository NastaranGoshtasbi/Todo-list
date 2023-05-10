<template>
  <v-select :items="priority" label="Proirity" v-model="selectedPriority"></v-select>
  <v-text-field
      xs="12"
      lg="6"
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
  <v-spacer></v-spacer>
  <div v-if="todoFilter.length != 0  || selectedPriority!==''" >
    <v-data-table
    :headers="headers"
    :items="todoFilter"
    :search="search"
    :sort-by="[{ key: 'created', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>TODO DETAILS LIST</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props"> New Item </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.priority" label="Priority"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.dueDate" label="Due date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>

  </v-data-table>
  </div>
  <div v-else>
    <v-data-table
    :headers="headers"
    :items="todoContents"
    :search="search"
    :sort-by="[{ key: 'created', order: 'asc' }]"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>TODO DETAILS LIST</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" dark class="mb-2" v-bind="props"> New Item </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.priority" label="Priority"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.dueDate" label="Due date"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4"> </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Cancel </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template v-slot:item.actions="{ item }">
      <v-icon size="small" class="me-2" @click="editItem(item.raw)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
    </template>
    <!-- <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template> -->
  </v-data-table>
  </div>

</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
import {
  getTodoListItems,
  addTodoItem,
  editTodoItem,
  deleteTodoItem
} from '../services/todoItemService.js'
export default {
  data: () => ({
    src: '',
    priority: ['HIGH', 'MEDIUM', 'LOW'],
    search: '',
    selectedPriority: '',
    dialog: false,
    dialogDelete: false,
    todoListId: '',
    headers: [
      {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id'
      },
      {
        title: 'Todo title',
        sortable: false,
        key: 'title'
      },
      {
        title: 'Description',
        key: 'description',
        sortable: false
      },
      {
        title: 'Due date',
        key: 'dueDate'
      },
      {
        title: 'Priority',
        key: 'priority'
      },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    todoContents: [],
    todoFilter: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      description: '',
      priority: '',
      dueDate: 0
    },
    defaultItem: {
      title: '',
      description: '',
      priority: '',
      dueDate: 0
    }
  }),

  components: {
    VDataTable
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    selectedPriority: function (newValue) {
      this.updatePriority(newValue)
    }
  },
  async mounted() {
    const newURL = window.location.pathname
    let id = newURL.lastIndexOf('/')
    this.todoListId = newURL.substring(id + 1)
    this.todoContents = await getTodoListItems(this.todoListId)
    console.log(this.todoContents)
    console.log(this.todoFilter.length)
  },
  methods: {
    updatePriority (priorityVal) {
      this.todoFilter = this.todoContents
      console.log(priorityVal)
      console.log(this.todoFilter)
      this.todoFilter = this.todoFilter.filter((item) => {
        return item.priority.includes(priorityVal)
      })
      console.log(this.todoFilter)
    },

    editItem(item) {
      this.editedIndex = this.todoContents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem(item) {
      this.editedIndex = this.todoContents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      if (this.editedItem) await deleteTodoItem(this.todoListId, this.editedItem.id)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.todoContents.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.todoContents[this.editedIndex], this.editedItem)
        await editTodoItem(this.todoListId, this.editedItem)
      } else {
        const addedList = await addTodoItem(this.todoListId, this.editedItem)
        this.todoContents.push(addedList)
      }
      this.close()
    }
  }
}
</script>
