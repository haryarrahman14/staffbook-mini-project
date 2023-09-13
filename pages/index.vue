<template>
  <div>
    <h1>Coin Market Datas</h1>
    <v-data-table :headers="tableHeaders" :items="tradingData">
      <template v-slot:item="{ item }">
        <tr :style="getHighlightedRow(item?.isChanged || false)">
          <td>{{ item.name }} {{ item?.isChanged ? "(new update)" : "" }}</td>
          <td style="text-align: right">{{ item.current_price }} USD</td>
          <td style="text-align: right">{{ item.market_cap }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",
  layout: "authenticated",
  data() {
    return {
      tableHeaders: [
        { text: "Name", value: "name" },
        { text: "Current Price", value: "current_price", align: "right" },
        { text: "Market Capital", value: "market_cap", align: "right" },
      ],
      tradingData: [],
    };
  },
  mounted() {
    this.createSSEConnection();
  },
  beforeDestroy() {
    this.closeSSEConnection();
  },
  methods: {
    createSSEConnection() {
      const eventSource = new EventSource("http://localhost:3001/sse");

      eventSource.addEventListener("message", (event) => {
        const newTradingData = JSON.parse(event.data);

        newTradingData.forEach((newItem) => {
          const oldItem = this.tradingData.find(
            (item) => item.id === newItem.id
          );

          if (
            oldItem?.current_price !== newItem?.current_price ||
            oldItem?.market_cap !== newItem?.market_cap
          ) {
            newItem.isChanged = true;
          } else {
            newItem.isChanged = false;
          }
        });

        this.tradingData = newTradingData;
      });
    },
    closeSSEConnection() {
      if (this.eventSource) {
        this.eventSource.close();
      }
    },
    getHighlightedRow(condition) {
      return condition ? { backgroundColor: "lightblue" } : {};
    },
  },
};
</script>
