<template>
  <div class="view-warehouse-items">
    <v-card>
      <v-card-title>
        Items
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
import API from "../api";

export default {
  name: "ViewWarehouseItems",

  data() {
    return {
      search: "",
      headers: [
        {
          text: "Icon",
          sortable: false,
          value: "icon",
        },
        { text: "Name", value: "name" },
        { text: "Count", value: "count" },
        { text: "Owner", value: "owner" },
        { text: "Condition", value: "condition" },
        { text: "Purchase Price", value: "purchase_price" },
      ],
      items: [],
    };
  },
  created() {},

  methods: {
    warehouseId() {
      return this.$route.params.warehouseId;
    },
  },
  loadData() {
    API.get("me").then(
      (response) => {
        this.items = response.body.warehouses;
      },
      () => {}
    );
  },
};
</script>

<style scoped></style>
