<template>
  <section class="notifications navbar-notifications">
    <header class="cardHeader card-header">
      <div class="text-center mb-sm">
        <strong>You have 0 notifications</strong>
      </div>
      <b-button-group id="notification-b-buttons">
        <b-button variant="default" @click="changeNotificationsTab(1)"
          >Notifications</b-button
        >
        <b-button variant="default" @click="changeNotificationsTab(2)"
          >Messages</b-button
        >
        <b-button variant="default" @click="changeNotificationsTab(3)"
          >Progress</b-button
        >
      </b-button-group>
    </header>
    <NewNotifictionsList v-if="newNotifications && show" />
    <NotifictionsList v-else-if="notificationsTabSelected === 1 && show" />
    <Messages v-else-if="notificationsTabSelected === 2 && show" />
    <Progress v-else-if="notificationsTabSelected === 3 && show" />
    <!-- <NotifictionsList v-else /> -->
    <footer class="cardFooter text-sm card-footer">
      <span class="fs-mini">Synced at: 21 Apr 2014 18:36</span>
      <b-button
        variant="link"
        @click="loadNotifications"
        :class="{
          disabled: isLoad,
          'btnNotificationsReload btn-xs float-right py-0': true,
        }"
      >
        <span v-if="isLoad"
          ><i class="la la-refresh la-spin" /> Loading...</span
        >
        <i v-else class="la la-refresh" />
      </b-button>
    </footer>
  </section>
</template>

<script>
import Vue from "vue";

import NotifictionsList from "./NotificationsDemo/NotificationsList";
import NewNotifictionsList from "./NotificationsDemo/NewNotificationsList";
import Messages from "./NotificationsDemo/Messages";
import Progress from "./NotificationsDemo/Progress";

export default {
  name: "Notification",
  components: {
    NotifictionsList,
    NewNotifictionsList,
    Messages,
    Progress,
  },
  data() {
    return {
      notificationsTabSelected: 1,
      newNotifications: null,
      isLoad: false,
      show:false,
    };
  },
  methods: {
    changeNotificationsTab(tab) {
      Vue.set(this, "notificationsTabSelected", tab);
      Vue.set(this, "newNotifications", null);
    },
    loadNotifications() {
      Vue.set(this, "isLoad", true);

      setTimeout(() => {
        Vue.set(this, "newNotifications", "new notifications component");
        Vue.set(this, "isLoad", false);
        this.changeNotificationsTab(1);
      }, 1500);
    },
  },
};
</script>

<style src="./Notifications.scss" lang="scss" />
