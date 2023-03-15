<template>
  <v-dialog width="700px" v-model="dialog">
    <v-card class="rounded-xl">
      <v-card-title class="text-h5 lighten-2">
        Node Details
        <v-spacer></v-spacer>
        <v-btn @click="sampleDialogModelSeter(false)" icon>
          <v-icon color="black">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-expansion-panels flat>
          <v-expansion-panel readonly>
            <v-expansion-panel-header
              >Joined at <v-spacer></v-spacer>{{ nodeInfo.startTime }}
              <template v-slot:actions>
                <v-icon color="primary"> </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-divider></v-divider>
          </v-expansion-panel>
          <v-expansion-panel v-if="nodeInfo.endTime" readonly>
            <v-expansion-panel-header
              >Exited at <v-spacer></v-spacer>{{ nodeInfo.endTime }}
              <template v-slot:actions>
                <v-icon color="primary"> </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-divider></v-divider>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header
              >Down times <v-spacer></v-spacer>
              {{ nodeInfo.downNodeTimes.length }} time(s)
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <ul>
                <li v-for="(item, i) in nodeInfo.downNodeTimes" :key="i">
                  {{ item }}
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    sampleDialogModel: Boolean,
    sampleDialogModelSeter: { type: Function },
    nodeInfo: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    sampleDialogModel(newValue, oldValue) {
      this.dialog = newValue;
    },
    dialog(newV, oldV) {
      this.sampleDialogModelSeter(newV);
    },
  },
};
</script>
