<template>
  <div class="home">
    <div class="input-new">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="todos"
                :rules="[() => todos.length > 0 || 'Required field']"
                label="What need to be done?"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-text-field v-model="desc" label="Description"></v-text-field>
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="assign"
                :items="users"
                :rules="[v => !!v || 'Item is required']"
                label="Assign to"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                v-model="priorities"
                :items="priority"
                :rules="[v => !!v || 'Item is required']"
                label="Priority"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="2">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Due Date"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" :show-current="showCurrent" @input="menu2 = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>

    <template>
      <errorMessage v-show="errorMessage" msg="Error, all form must be filled."></errorMessage>
    </template>

    <div class="item-todo">
      <draggable class="medium-area">
        <transition-group name="list-complete">
          <div
            v-for="(item, idx) in list"
            :key="idx"
            class="drag-item flex flex-justify-betweeen"
            @dragend="log('a')"
          >
            <div class="todos">{{ item.task }}</div>
            <div class="desc">{{ item.desc }}</div>
            <div class="priority">
              <div v-if="item.priority == 'hight'" class="content hight">{{ item.priority }}</div>
              <div v-else-if="item.priority == 'medium'" class="content medium">{{ item.priority }}</div>
              <div v-else-if="item.priority == 'low'" class="content low">{{ item.priority }}</div>
            </div>
            <div class="date">{{ item.date }}</div>
            <div class="assign">
              <img v-if="item.assign" src="../assets/user.png" alt />
              <div v-if="item.assign" class="text">{{ item.assign }}</div>
            </div>
            <div class="status">
              <div v-if="item.status == 'todo'" class="content todo">{{ item.status }}</div>
              <div
                v-else-if="item.status == 'in-progress'"
                class="content in-progress"
              >{{ item.status }}</div>
              <div v-else-if="item.status == 'done'" class="content done">{{ item.status }}</div>
            </div>
            <div class="edit" v-on:click="openModalDetail(idx)">
              <v-icon>edit</v-icon>
            </div>
            <div class="delete" v-on:click="deleteItemStore(idx)">
              <v-icon>delete</v-icon>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>

    <!-- modal detail -->
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Detail</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Task"
                    v-model="newtodos"
                    :rules="[() => newtodos.length > 0 || 'Required field']"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-text-field label="Description" v-model="newdesc" hint="Describe task in here"></v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-select
                    v-model="newassign"
                    :items="users"
                    :rules="[v => !!v || 'Item is required']"
                    label="Assign to"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-select
                    v-model="newpriorities"
                    :items="priority"
                    :rules="[v => !!v || 'Item is required']"
                    label="Priority"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-select
                    v-model="newstatus"
                    :items="['todo', 'in-progress', 'done']"
                    :rules="[v => !!v || 'Item is required']"
                    label="Status"
                    required
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <v-menu
                    v-model="newmenu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="newdate"
                        label="Due Date"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="newdate" @input="newmenu2 = false"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text v-on:click="updateList(indexList)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!--  -->
    <v-btn absolute dark fab bottom right color="pink" v-on:click="addItemStore" v-show="todos">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import draggable from "vuedraggable";
import errorMessage from "../components/ErrorMessege";

export default {
  name: "todolist",

  data() {
    return {
      todos: "",
      desc: "",
      assign: "",
      priorities: "",
      date: "",
      menu2: "",
      status: "",
      errorMessage: false,
      dialog: false,
      indexList: 0,
      newtodos: "",
      newdesc: "",
      newassign: "",
      newpriorities: "",
      newdate: "",
      newmenu2: "",
      newstatus: ""
    };
  },
  components: {
    draggable,
    errorMessage
  },

  computed: {
    ...mapState({
      list: state => state.item,
      priority: state => state.priority,
      users: state => state.user
    })
  },

  methods: {
    ...mapMutations({
      addItemsList: "ADD_ITEM",
      removeItemList: "REMOVE_ITEM",
      updateItelList: "UPDATE_ITEM"
    }),
    addItemStore: function() {
      const newList = {
        task: this.todos,
        desc: this.desc,
        priority: this.priorities,
        assign: this.assign,
        date: this.date,
        status: "todos"
      };
      console.log(newList.length);
      if (newList.task.length > 10) {
        this.errorMessage = false;
        this.addItemsList(newList);
        this.todos = "";
        this.desc = "";
        this.priorities = "";
        this.date = "";
        this.status = "";
      } else {
        this.errorMessage = true;
      }
    },
    deleteItemStore: function(id) {
      this.removeItemList(id);
    },
    openModalDetail: function(index) {
      console.log(index);
      this.dialog = true;
      this.indexList = index;
      this.newtodos = this.list[index].task;
      this.newdesc = this.list[index].desc;
      this.newpriorities = this.list[index].priority;
      this.newassign = this.list[index].assign;
      this.newdate = this.list[index].date;
      this.newstatus = this.list[index].status;
    },
    updateList: function(index) {
      const newUpdateList = {
        task: this.newtodos,
        desc: this.newdesc,
        priority: this.newpriorities,
        assign: this.newassign,
        date: this.newdate,
        status: this.newstatus,
        indexItem: index
      };
      this.updateItelList(newUpdateList);
      this.dialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.v-btn {
  bottom: 30px !important;
}

.bigger-area > span {
  min-height: 90vh;
  display: block;
}
.drag-item {
  color: white;
  padding: 15px 10px;
  background-color: #1e1e1e;
  border-bottom: 2px solid #363636;
  min-width: 30vw;
  max-width: 90vw;
  margin: 0 auto 10px;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  cursor: grab;
  transition: transform 0.25s cubic-bezier(0.02, 1.01, 0.94, 1.01);
  will-change: transform;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-transform: capitalize;
  .todos {
    width: 35%;
  }
  .desc {
    width: 20%;
  }
  .assign,
  .priority,
  .date,
  .status {
    width: 10%;
  }
  .assign {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .priority {
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      font-size: 10px;
      text-align: center;
      padding: 6px 12px;
      &.hight {
        background: #f44336;
      }
      &.medium {
        background: #ff9800;
      }
      &.low {
        background: #4caf50;
      }
    }
  }
  .status {
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      font-size: 10px;
      text-align: center;
      padding: 6px 12px;
      &.todo {
        background: #ff9800;
      }
      &.in-progress {
        background: #3f51b5;
      }
      &.done {
        background: #4caf50;
      }
    }
  }
  .edit,
  .delete {
    width: 5%;
    display: flex;
    justify-content: center;
    align-item: center;
    cursor: pointer;
  }
  .edit {
    i {
      color: #4caf50;
    }
  }
  .delete {
    i {
      color: #d50000;
    }
  }
}
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
