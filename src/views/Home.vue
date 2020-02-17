<template>
  <div class="home">
    <div class="input-new">
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="todos"
                label="What need to be done?"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" md="4">
              <v-text-field
                v-model="desc"
                label="Description"
                required
              ></v-text-field>
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
                :close-on-content-click="true"
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
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </div>
    <!-- <div class="result">
      {{ todos }}
      {{ desc }}
      {{ priorities }}
      {{ date }}
      {{ status }}
    </div> -->
    <div class="item-todo">
      <draggable v-model="list" class="medium-area">
        <transition-group name="list-complete">
          <div
            v-for="(item, idx) in list"
            :key="idx"
            class="drag-item flex flex-justify-betweeen"
            @dragend="log('a')"
          >
            <div class="todos">{{ item.task }}</div>
            <div class="desc">{{ item.desc }}</div>
            <div class="priority">{{ item.priority }}</div>
            <div class="date">{{ item.date }}</div>
            <div class="status">{{ item.status }}</div>
            <div class="edit">
              <v-icon>edit</v-icon>
            </div>
            <div class="delete">
              <v-icon>delete</v-icon>
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <v-btn absolute dark fab bottom right color="pink" v-on:click="greet">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

// export default {
//   name: "Home",
//   components: {
//     HelloWorld
//   }
// };

import { mapState, mapMutations } from "vuex";
import draggable from "vuedraggable";

export default {
  name: "todolist",

  data() {
    return {
      todos: "",
      desc: "",
      priorities: "",
      date: "",
      menu2: "",
      status: "todo"
    };
  },
  components: {
    draggable
  },

  computed: {
    ...mapState({
      list: state => state.item,
      priority: state => state.priority
    })
  },

  methods: {
    ...mapMutations({
      addItemsList: "ADD_ITEM"
    }),
    greet: function() {
      // `this` inside methods points to the Vue instance
      // alert("Hello !");
      const newList = {
        task: this.todos,
        desc: this.desc,
        priority: this.priorities,
        date: this.date,
        status: this.status
      };
      console.log(newList);
      this.addItemsList(newList);
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
  .todos {
    width: 40%;
  }
  .desc {
    width: 20%;
  }
  .priority,
  .date,
  .status {
    width: 10%;
  }
  .edit,
  .delete {
    width: 5%;
    display: flex;
    justify-content: center;
    align-item: center;
  }
  .edit {
    i {
      color: green;
    }
  }
  .delete {
    i {
      color: red;
    }
  }
}
.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
