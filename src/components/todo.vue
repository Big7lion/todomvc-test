<template>
  <div>
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        @click="toggle_item"
        v-model="isToggle"
      >
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <!-- user code -->
        <li
          v-for="(item, index) in todo_items"
          :key="index"
          :class="{completed: item.isComplete, editing: item.isEditing}"
          v-show="item_filter(item.isComplete)"
        >
          <div class="view">
            <input class="toggle" type="checkbox" v-model="item.isComplete">
            <label @dblclick="edit_item(index)">{{item.payload}}</label>
            <button class="destroy" @click="remove_item(index)"></button>
          </div>
          <input
            autofocus="autofocus"
            class="edit"
            v-model="editing_storage"
            @keyup.enter="update_item(index)"
            @keyup.esc="item.isEditing=0"
            @blur="item.isEditing=0"
          >
        </li>
      </ul>
    </section>
    <footer class="footer">
      <span class="todo-count">
        <strong>{{todo_items_length}}</strong> item left
      </span>
      <ul class="filters">
        <li>
          <a :class="{selected: !filter_flag}" href="#/" @click="set_filter(0)">All</a>
        </li>
        <li>
          <a
            :class="{selected: filter_flag && filter_active}"
            href="#/active"
            @click="set_filter(1,1)"
          >Active</a>
        </li>
        <li>
          <a
            href="#/completed"
            :class="{selected: filter_flag && (!filter_active)}"
            @click="set_filter(1,0)"
          >Completed</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
      <button class="clear-completed" @click="clear_item">Clear completed</button>
    </footer>
  </div>
</template>

<script>
import Eventbus from "../utils/eventbus.js";
export default {
  name: "TodoMain",
  data() {
    return {
      storage_way: "none",
      isToggle: 0,
      filter_flag: 0,
      editing_storage: "",
      filter_active: 0,
      todo_items: []
    };
  },
  methods: {
    add_item(msg) {
      let _payload = { isComplete: 0, isEditing: 0, payload: msg };
      this.todo_items.push(_payload);
    },
    remove_item(del_index) {
      this.todo_items.splice(del_index, 1);
    },
    toggle_item() {
      let _flag = Number(!this.isToggle);
      for (let i in this.todo_items) {
        this.todo_items[i].isComplete = _flag;
      }
    },
    clear_item() {
      this.todo_items = [];
    },
    edit_item(index) {
      this.todo_items[index].isEditing = 1;
      this.editing_storage = this.todo_items[index].payload;
    },
    update_item(index) {
      this.todo_items[index].payload = this.editing_storage;
      this.todo_items[index].isEditing = 0;
    },
    set_filter(n1, n2) {
      this.filter_flag = n1;
      this.filter_active = n2;
    },
    item_filter(flg) {
      if (!this.filter_flag) return 1;
      else return flg ^ this.filter_active && this.filter_flag;
    },
    before_destroy_handler(e) {
      if (this.storage_way == "local") {
        window.localStorage.removeItem("local_items");
        console.log(JSON.stringify(this.todo_items));
        window.localStorage.setItem(
          "local_items",
          JSON.stringify(this.todo_items)
        );
        console.log("nice");
      }
    }
  },
  computed: {
    todo_items_length: function() {
      let num = 0;
      for (let i in this.todo_items) {
        if (this.todo_items[i].isComplete) num++;
      }
      return this.todo_items.length - num;
    }
  },
  created() {
    let that = this;
    Eventbus.$on("add_item_to_list", function(msg) {
      that.add_item(msg);
    });
    Eventbus.$on("get_local_storage", function(msg) {
      var _local = JSON.parse(msg);
      if (that.todo_items.length != 0) {
        for (var i in _local) {
          for (var e in that.todo_items) {
            if (_local[i].payload == that.todo_items[e].payload) {
              _local.splice(i, 1);
            }
          }
        }
      }
      that.todo_items.push.apply(that.todo_items, _local);
    });
    Eventbus.$on("set_storage", function(msg) {
      console.log(msg);
      that.storage_way = msg;
      console.log(that.storage_way);
    });
    window.addEventListener("beforeunload", e => that.before_destroy_handler(e));
  },
  beforeDestroy() {}
};
</script>
