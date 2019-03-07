<template>
  <div>
    <v-dialog/>
    <modal name="login-modal">
      <div class="box">
        <div class="box-part" id="bp-left">
          <div class="partition" id="partition-register">
            <div class="partition-title">CREATE ACCOUNT</div>
            <div class="partition-form">
              <form autocomplete="false">
                <input id="n-username" type="text" placeholder="Username">
                <input id="n-password2" type="password" placeholder="Password">
              </form>
              <div class="button-set">
                <button id="goto-signin-btn">Sign In</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <header class="header">
      <h1 @click="show_dialog" style="cursor: pointer;">{{h1_title}}</h1>
      <input
        class="new-todo"
        @keyup.enter="add_todo_item"
        placeholder="What needs to be done?"
        autofocus
        v-model="todo_editing_item"
      >
    </header>
  </div>
</template>

<script>
import Eventbus from "../utils/eventbus.js";
export default {
  name: "TodoHeader",
  data() {
    return {
      todo_editing_item: "",
      h1_title: "Click Me!"
    };
  },
  methods: {
    add_todo_item() {
      if (this.todo_editing_item == "") return;
      Eventbus.$emit("add_item_to_list", this.todo_editing_item);
      this.todo_editing_item = "";
    },
    show_modal() {
      this.$modal.show("login-modal");
    },
    hide_modal() {
      this.$modal.hide("login-modal");
    },
    show_dialog() {
      this.$modal.show("dialog", {
        title: "Options",
        text: "Please choose a way to use this todolist",
        buttons: [
          {
            title: "REGISTER",
            handler: () => {
              this.$modal.hide("dialog");
            }
          },
          {
            title: "SIGN IN",
            default: true,
            handler: () => {
              this.$modal.hide("dialog");
              this.$modal.show("login-modal");
            }
          },
          {
            title: "LOCAL",
            handler: () => {
              this.$modal.hide("dialog");
              this.h1_title = "Local Todo"
              if (window.localStorage) {
                Eventbus.$emit("set_storage", "local");
                Eventbus.$emit(
                  "get_local_storage",
                  window.localStorage.getItem("local_items")
                );
              } else {
                alert(
                  "Sorry. This local storage function cannot be used in this device!"
                );
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
$background_color: #404142;
$github_color: #dba226;
$facebook_color: #3880ff;
.box {
  background: white;
  overflow: hidden;
  width: 656px;
  height: 600px;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0 0 40px black;
  color: #8b8c8d;
  font-size: 0;
  .box-part {
    display: inline-block;
    position: relative;
    vertical-align: top;
    box-sizing: border-box;
    height: 100%;
    width: 80%;
  }
  .box-messages {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
  .box-error-message {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 0;
    line-height: 32px;
    padding: 0 12px;
    text-align: center;
    width: 100%;
    font-size: 11px;
    color: white;
    background: #f38181;
  }
  .partition {
    width: 100%;
    height: 100%;
    .partition-title {
      box-sizing: border-box;
      padding: 30px;
      width: 100%;
      text-align: center;
      letter-spacing: 1px;
      font-size: 20px;
      font-weight: 300;
    }
    .partition-form {
      padding: 0 20px;
      box-sizing: border-box;
    }
  }
  input[type="password"],
  input[type="text"] {
    display: block;
    box-sizing: border-box;
    margin-bottom: 4px;
    width: 100%;
    font-size: 12px;
    line-height: 2;
    border: 0;
    border-bottom: 1px solid #dddedf;
    padding: 4px 8px;
    font-family: inherit;
    transition: 0.5s all;
    outline: none;
  }
  button {
    background: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 10px;
    letter-spacing: 1px;
    font-family: "Open Sans", sans-serif;
    font-weight: 400;
    min-width: 140px;
    margin-top: 8px;
    color: #8b8c8d;
    cursor: pointer;
    border: 1px solid #dddedf;
    text-transform: uppercase;
    transition: 0.1s all;
    font-size: 10px;
    outline: none;
    &:hover {
      border-color: mix(#dddedf, black, 90%);
      color: mix(#8b8c8d, black, 80%);
    }
  }
  .button-set {
    margin-bottom: 8px;
  }
  .autocomplete-fix {
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
}
.pop-out-enter-active,
.pop-out-leave-active {
  transition: all 0.5s;
}
.pop-out-enter,
.pop-out-leave-active {
  opacity: 0;
  transform: translateY(24px);
}
</style>